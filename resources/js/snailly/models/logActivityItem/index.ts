export interface LogActivityItem {
  log_id: string
  childId: string
  url: string
  grant_access: boolean
  createdAt: string
  updatedAt: string
  classified_url: [
      {
          FINAL_label?: string
          title?: string
          description?: string
          title_raw?: string
      }
  ]
  child: {
      name: string
  }
}