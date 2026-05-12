import { FormEvent } from 'react'

import { LogActivity, Summary, StatisticMonth } from '@/models'
import { MomentInput } from 'moment'

export interface DashboardViewsProps {
    isLoading: boolean
    date: MomentInput
    logId: string
    url: string
    grantAccess: boolean
    listOfSummary: Summary
    listStatisticMonth: StatisticMonth[]
    logActivity: LogActivity | null
    isEditModalOpen: boolean
    linkOpenHandler: (url: string) => void
    dateChangeHandler: (date: any) => void
    setLogId: (logId: string) => void
    setGrantAccess: (grantAccess: boolean) => void
    updateGrantAccess: (event: FormEvent<HTMLFormElement>) => void
    openEditModalHandler: (logId: string, grant_access: boolean, url: string) => void
    closeEditModalHandler: () => void
}
