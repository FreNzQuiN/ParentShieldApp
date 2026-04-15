import { useEffect, useMemo, useState } from 'react'
import {
  addBlockedWebsite,
  addChild,
  deleteBlockedWebsite,
  deleteChild,
  getBlockedWebsites,
  getChildren,
  getLogs,
  getSummary,
  login,
  updateBlockedWebsite,
  updateGrantAccess,
} from './api'
import type { FormEvent } from 'react'
import type { BlockedWebsiteItem, ChildItem, LogItem, SummaryPayload } from './api'
import { useSession } from './session'

function LoginPanel() {
  const { setUser } = useSession()
  const [email, setEmail] = useState('devhackfest@gmail.com')
  const [password, setPassword] = useState('password')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const user = await login(email, password)
      setUser(user)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">ParentShield Web Console</p>
        <h1>Parent Login</h1>
        <p className="muted">Masuk dengan akun parent untuk memantau aktivitas anak dari web.</p>

        <form className="auth-form" onSubmit={submit}>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
            />
          </label>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </section>
    </main>
  )
}

function DashboardPanel() {
  const { user, clearUser } = useSession()
  const [children, setChildren] = useState<ChildItem[]>([])
  const [logs, setLogs] = useState<LogItem[]>([])
  const [summary, setSummary] = useState<SummaryPayload>({
    totalSafeWebsites: 0,
    totalDangerousWebsites: 0,
    persentageSafeWebsite: 0,
    persentageDangerousWebsite: 0,
  })
  const [newChildName, setNewChildName] = useState('')
  const [newBlockedUrl, setNewBlockedUrl] = useState('')
  const [editingBlockedId, setEditingBlockedId] = useState<string | null>(null)
  const [editingBlockedUrl, setEditingBlockedUrl] = useState('')
  const [blockedFilter, setBlockedFilter] = useState<'ALL' | 'GLOBAL' | 'PERSONAL'>('ALL')
  const [selectedChildId, setSelectedChildId] = useState('ALL')
  const [blockedWebsites, setBlockedWebsites] = useState<BlockedWebsiteItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const token = user?.accessToken || ''

  const normalizeWebsite = (value: string) => {
    const trimmed = value.trim().toLowerCase()
    if (!trimmed) return ''

    try {
      const normalized = trimmed.includes('://') ? trimmed : `https://${trimmed}`
      const hostname = new URL(normalized).hostname.replace(/^www\./, '')
      return hostname
    } catch {
      return trimmed.replace(/^www\./, '')
    }
  }

  const refresh = async () => {
    if (!token) return
    setError(null)
    setIsLoading(true)
    try {
      const [childrenData, summaryData, logsData, blockedData] = await Promise.all([
        getChildren(token),
        getSummary(token, selectedChildId),
        getLogs(token, selectedChildId),
        getBlockedWebsites(token),
      ])

      setChildren(childrenData)
      setSummary(summaryData)
      setLogs(logsData.items)
      setBlockedWebsites(blockedData)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [selectedChildId])

  const addChildHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newChildName.trim()) return
    await addChild(token, newChildName.trim())
    setNewChildName('')
    await refresh()
  }

  const deleteChildHandler = async (id: string) => {
    await deleteChild(token, id)
    if (selectedChildId === id) setSelectedChildId('ALL')
    await refresh()
  }

  const toggleGrantAccess = async (item: LogItem) => {
    const nextValue = item.grant_access !== true
    await updateGrantAccess(token, item.log_id, nextValue)
    await refresh()
  }

  const addBlockedUrlHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newBlockedUrl.trim()) return

    try {
      await addBlockedWebsite(token, newBlockedUrl.trim())
      setNewBlockedUrl('')
      await refresh()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to add blocked website')
    }
  }

  const deleteBlockedUrlHandler = async (id: string) => {
    try {
      await deleteBlockedWebsite(token, id)
      if (editingBlockedId === id) {
        setEditingBlockedId(null)
        setEditingBlockedUrl('')
      }
      await refresh()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete blocked website')
    }
  }

  const startEditBlockedUrl = (item: BlockedWebsiteItem) => {
    if (item.isGlobal) return
    setEditingBlockedId(item.id)
    setEditingBlockedUrl(item.url)
  }

  const cancelEditBlockedUrl = () => {
    setEditingBlockedId(null)
    setEditingBlockedUrl('')
  }

  const saveEditBlockedUrl = async (id: string) => {
    if (!editingBlockedUrl.trim()) return

    try {
      await updateBlockedWebsite(token, id, editingBlockedUrl.trim())
      setEditingBlockedId(null)
      setEditingBlockedUrl('')
      await refresh()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to update blocked website')
    }
  }

  const quickBlockFromLog = async (url: string) => {
    try {
      await addBlockedWebsite(token, url)
      await refresh()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to block website from activity')
    }
  }

  const totalContent = useMemo(
    () => summary.totalSafeWebsites + summary.totalDangerousWebsites,
    [summary.totalSafeWebsites, summary.totalDangerousWebsites],
  )

  const blockedLookup = useMemo(() => {
    return new Set(blockedWebsites.map((item) => normalizeWebsite(item.url)))
  }, [blockedWebsites])

  const filteredBlockedWebsites = useMemo(() => {
    if (blockedFilter === 'GLOBAL') {
      return blockedWebsites.filter((item) => item.isGlobal)
    }

    if (blockedFilter === 'PERSONAL') {
      return blockedWebsites.filter((item) => !item.isGlobal)
    }

    return blockedWebsites
  }, [blockedWebsites, blockedFilter])

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">ParentShield Parent Workspace</p>
          <h1>{user?.name}</h1>
          <p className="muted">Monitoring internet activity from Laravel REST API</p>
        </div>

        <div className="topbar-actions">
          <button className="ghost" onClick={() => void refresh()}>
            Refresh
          </button>
          <button className="ghost" onClick={clearUser}>
            Logout
          </button>
        </div>
      </header>

      <section className="stats-grid">
        <article>
          <p>Total Accessed</p>
          <strong>{totalContent}</strong>
        </article>
        <article>
          <p>Positive</p>
          <strong>{summary.totalSafeWebsites}</strong>
        </article>
        <article>
          <p>Negative</p>
          <strong>{summary.totalDangerousWebsites}</strong>
        </article>
      </section>

      <section className="panel-row">
        <div className="panel-stack">
          <article className="panel">
            <h2>Children</h2>
            <form className="inline-form" onSubmit={addChildHandler}>
              <input
                placeholder="New child name"
                value={newChildName}
                onChange={(event) => setNewChildName(event.target.value)}
              />
              <button type="submit">Add</button>
            </form>

            <div className="chips">
              <button
                className={selectedChildId === 'ALL' ? 'chip active' : 'chip'}
                onClick={() => setSelectedChildId('ALL')}
              >
                ALL
              </button>
              {children.map((child) => (
                <div key={child.id} className="chip-wrap">
                  <button
                    className={selectedChildId === child.id ? 'chip active' : 'chip'}
                    onClick={() => setSelectedChildId(child.id)}
                  >
                    {child.name}
                  </button>
                  <button className="chip-delete" onClick={() => void deleteChildHandler(child.id)}>
                    x
                  </button>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <h2>Blocked Websites</h2>
            <form className="inline-form" onSubmit={addBlockedUrlHandler}>
              <input
                placeholder="example.com"
                value={newBlockedUrl}
                onChange={(event) => setNewBlockedUrl(event.target.value)}
              />
              <button type="submit">Block</button>
            </form>

            <div className="chips chips-tight">
              <button
                type="button"
                className={blockedFilter === 'ALL' ? 'chip active' : 'chip'}
                onClick={() => setBlockedFilter('ALL')}
              >
                All
              </button>
              <button
                type="button"
                className={blockedFilter === 'GLOBAL' ? 'chip active' : 'chip'}
                onClick={() => setBlockedFilter('GLOBAL')}
              >
                Global
              </button>
              <button
                type="button"
                className={blockedFilter === 'PERSONAL' ? 'chip active' : 'chip'}
                onClick={() => setBlockedFilter('PERSONAL')}
              >
                Personal
              </button>
            </div>

            <div className="blocked-list">
              {filteredBlockedWebsites.length === 0 && <p className="muted">No blocked website yet</p>}
              {filteredBlockedWebsites.map((item) => (
                <div key={item.id} className="blocked-row">
                  {editingBlockedId === item.id ? (
                    <input
                      value={editingBlockedUrl}
                      onChange={(event) => setEditingBlockedUrl(event.target.value)}
                      placeholder="example.com"
                    />
                  ) : (
                    <span>{item.url}</span>
                  )}
                  {item.isGlobal ? (
                    <span className="badge unknown">global</span>
                  ) : (
                    <div className="blocked-actions">
                      {editingBlockedId === item.id ? (
                        <>
                          <button type="button" onClick={() => void saveEditBlockedUrl(item.id)}>
                            save
                          </button>
                          <button type="button" className="ghost" onClick={cancelEditBlockedUrl}>
                            cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" className="ghost" onClick={() => startEditBlockedUrl(item)}>
                            edit
                          </button>
                          <button type="button" className="chip-delete" onClick={() => void deleteBlockedUrlHandler(item.id)}>
                            remove
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="panel">
          <h2>Last Activity</h2>
          {isLoading && <p className="muted">Loading logs...</p>}
          {!isLoading && logs.length === 0 && <p className="muted">No log available</p>}
          {!isLoading && logs.length > 0 && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Child</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((item) => {
                    const label = item.classified_url[0]?.FINAL_label || 'unknown'
                    const status = item.grant_access === true ? 'allowed' : label === 'bahaya' ? 'danger' : 'unknown'
                    const isBlocked = blockedLookup.has(normalizeWebsite(item.url))

                    return (
                      <tr key={item.log_id}>
                        <td>
                          <a href={item.url} target="_blank" rel="noreferrer">
                            {item.url}
                          </a>
                        </td>
                        <td>{item.child?.name || '-'}</td>
                        <td>
                          <span className={`badge ${status}`}>{status}</span>
                        </td>
                        <td>
                          <div className="action-group">
                            <button onClick={() => void toggleGrantAccess(item)}>
                              {item.grant_access === true ? 'Lock' : 'Grant'}
                            </button>
                            <button type="button" disabled={isBlocked} onClick={() => void quickBlockFromLog(item.url)}>
                              {isBlocked ? 'Blocked' : 'Block URL'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </section>

      {error && <p className="error-text">{error}</p>}
    </main>
  )
}

function App() {
  const { user } = useSession()

  if (!user) {
    return <LoginPanel />
  }

  return <DashboardPanel />
}

export default App
