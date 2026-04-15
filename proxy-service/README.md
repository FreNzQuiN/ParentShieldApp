# ParentShield Proxy Service

Service ini menjalankan proxy MITM terpisah dari aplikasi web untuk mengirim aktivitas browsing ke REST API Laravel.

## Setup

1. Install dependency Python:

```bash
pip install -r requirements.txt
```

2. Salin file env:

```bash
copy .env.example .env
```

3. Isi `.env`:

- `API_BASE_URL` contoh: `http://localhost:8000/api`
- `PARENT_TOKEN` token dari endpoint login
- `CHILD_ID` id child yang aktif

## Run

```bash
python snaily_proxy_service.py
```

Proxy berjalan di `LISTEN_HOST:LISTEN_PORT` (default `localhost:8080`).

## Notes

- Endpoint API yang dipakai:
    - `GET /classified-url/dangerous-website/{userId}`
    - `POST /log`
- Header auth selalu memakai bearer token parent.
- Saat URL berbahaya terdeteksi, request dialihkan ke `BLOCK_REDIRECT_URL`.
