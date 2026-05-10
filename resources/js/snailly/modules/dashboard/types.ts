import { FormEvent } from 'react'

import { UserChild, LogActivity, Summary, StatisticYear, StatisticMonth } from '@/models'
import { MomentInput } from 'moment'

export interface DashboardViewsProps {
    isLoading: boolean
    date: MomentInput
    year: MomentInput 
    logId: string
    url: string
    grantAccess: boolean
    listOfSummary: Summary
    listStatisticYear: StatisticYear[]
    listStatisticMonth: StatisticMonth[]
    logActivity: LogActivity | null
    isEditModalOpen: boolean
    linkOpenHandler: (url: string) => void
    dateChangeHandler: (date: any) => void
    yearChangeHandler: (date: any) => void
    setLogId: (logId: string) => void
    setGrantAccess: (grantAccess: boolean) => void
    updateGrantAccess: (event: FormEvent<HTMLFormElement>) => void
    openEditModalHandler: (logId: string, grant_access: boolean, url: string) => void
    closeEditModalHandler: () => void
}
