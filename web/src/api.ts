import axios from 'axios'

export type UserSession = {
  id: string
  name: string
  email: string
  accessToken: string
}

export type ChildItem = {
  id: string
  name: string
  parentsId: string
}

export type LogItem = {
  log_id: string
  childId: string
  url: string
  grant_access: boolean | null
  createdAt: string
  updatedAt: string
  classified_url: Array<{
    FINAL_label?: string
    title?: string
    description?: string
    title_raw?: string
  }>
  child: {
    name: string
  }
}

export type LogPayload = {
  items: LogItem[]
  total: number
  page: number
  limit: number
  totalPage: number
}

export type SummaryPayload = {
  totalSafeWebsites: number
  totalDangerousWebsites: number
  persentageSafeWebsite: number
  persentageDangerousWebsite: number
}

export type BlockedWebsiteItem = {
  id: string
  url: string
  isGlobal: boolean
  label: string
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
})

export async function login(email: string, password: string): Promise<UserSession> {
  const response = await api.post('/auth/login', { email, password })
  return response.data.data
}

export async function getChildren(token: string): Promise<ChildItem[]> {
  const response = await api.get('/child', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data
}

export async function addChild(token: string, name: string): Promise<ChildItem> {
  const response = await api.post(
    '/child',
    { name },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return response.data.data
}

export async function deleteChild(token: string, id: string): Promise<void> {
  await api.delete(`/child/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function getSummary(token: string, childId = 'ALL'): Promise<SummaryPayload> {
  const response = await api.get(`/log/summary/${childId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data
}

export async function getLogs(token: string, childId = 'ALL'): Promise<LogPayload> {
  const response = await api.get(`/log/${childId}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      page: 1,
      limit: 10,
    },
  })
  return response.data.data
}

export async function updateGrantAccess(token: string, logId: string, grantAccess: boolean): Promise<void> {
  await api.put(
    `/log/grant-access/${logId}`,
    { grantAccess: String(grantAccess) },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
}

export async function getBlockedWebsites(token: string): Promise<BlockedWebsiteItem[]> {
  const response = await api.get('/classified-url', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data
}

export async function addBlockedWebsite(token: string, url: string): Promise<BlockedWebsiteItem> {
  const response = await api.post(
    '/classified-url',
    { url },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return response.data.data
}

export async function updateBlockedWebsite(token: string, id: string, url: string): Promise<BlockedWebsiteItem> {
  const response = await api.put(
    `/classified-url/${id}`,
    { url },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return response.data.data
}

export async function deleteBlockedWebsite(token: string, id: string): Promise<void> {
  await api.delete(`/classified-url/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
