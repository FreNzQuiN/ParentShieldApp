import asyncio
import os
from urllib.parse import urlparse

import httpx
import jwt
from dotenv import load_dotenv
from mitmproxy import http, options
from mitmproxy.tools import dump

load_dotenv()

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000/api").rstrip("/")
PARENT_TOKEN = os.getenv("PARENT_TOKEN", "")
CHILD_ID = os.getenv("CHILD_ID", "")
LISTEN_HOST = os.getenv("LISTEN_HOST", "localhost")
LISTEN_PORT = int(os.getenv("LISTEN_PORT", "8080"))
BLOCK_REDIRECT_URL = os.getenv(
	"BLOCK_REDIRECT_URL", "https://white-pebble-088ad5110.2.azurestaticapps.net"
)
REQUEST_TIMEOUT_SECONDS = float(os.getenv("REQUEST_TIMEOUT_SECONDS", "10"))


def _normalize_url(value: str) -> str:
	parsed = urlparse(value)
	host = parsed.netloc or parsed.path
	host = host.replace("http://", "").replace("https://", "").replace("www.", "")
	return host.strip("/").lower()


async def fetch_dangerous_websites(client: httpx.AsyncClient, user_id: str) -> set[str]:
	response = await client.get(
		f"{API_BASE_URL}/classified-url/dangerous-website/{user_id}",
		headers={"Authorization": f"Bearer {PARENT_TOKEN}"},
	)
	response.raise_for_status()
	payload = response.json().get("data", [])
	return {_normalize_url(item) for item in payload if isinstance(item, str)}


class ProxyAddon:
	def __init__(self, queue: asyncio.Queue, dangerous_websites: set[str], parent_id: str):
		self.queue = queue
		self.dangerous_websites = dangerous_websites
		self.parent_id = parent_id

	def request(self, flow: http.HTTPFlow):
		if flow.request.method != "GET":
			return

		accept_header = flow.request.headers.get("accept")
		if accept_header is None or "text/html" not in accept_header:
			return

		request_url = flow.request.url
		normalized = _normalize_url(request_url).split("/")[0]

		if normalized in self.dangerous_websites:
			block_detail = {
				"parent": {"id": self.parent_id},
				"childId": CHILD_ID,
				"web_url": request_url,
				"token": PARENT_TOKEN,
			}
			notif_token = jwt.encode(block_detail, "")
			flow.response = http.Response.make(
				302,
				b"",
				{"Location": f"{BLOCK_REDIRECT_URL}?f={notif_token}"},
			)
			return

		self.queue.put_nowait(request_url)


async def insert_history(queue: asyncio.Queue, client: httpx.AsyncClient, parent_id: str):
	while True:
		data_url = await queue.get()
		if data_url is None:
			break

		payload = {
			"childId": CHILD_ID,
			"parentId": parent_id,
			"url": data_url,
			"web_title": _normalize_url(data_url).split(".")[0],
			"web_description": "",
			"detail_url": "",
		}
		try:
			await client.post(
				f"{API_BASE_URL}/log",
				data=payload,
				headers={"Authorization": f"Bearer {PARENT_TOKEN}"},
			)
		except Exception as err:
			print("log insert error:", err)


async def start_proxy():
	if not PARENT_TOKEN or not CHILD_ID:
		raise ValueError("PARENT_TOKEN and CHILD_ID must be set in .env")

	parent_payload = jwt.decode(PARENT_TOKEN, options={"verify_signature": False})
	parent_id = str(parent_payload.get("id", ""))
	if not parent_id:
		raise ValueError("Unable to read parent id from token")

	timeout = httpx.Timeout(REQUEST_TIMEOUT_SECONDS)
	async with httpx.AsyncClient(timeout=timeout) as client:
		dangerous_websites = await fetch_dangerous_websites(client, parent_id)
		queue = asyncio.Queue()

		opts = options.Options(listen_host=LISTEN_HOST, listen_port=LISTEN_PORT)
		master = dump.DumpMaster(opts)
		master.options.set("block_global=false")
		master.options.set("connection_strategy=lazy")
		master.addons.add(ProxyAddon(queue=queue, dangerous_websites=dangerous_websites, parent_id=parent_id))

		print(f"Proxy running at {LISTEN_HOST}:{LISTEN_PORT}")
		await asyncio.gather(master.run(), insert_history(queue, client, parent_id))


if __name__ == "__main__":
	asyncio.run(start_proxy())
