import { UserChild, UserParent } from '@/models'

export interface State {
    user: UserParent | undefined
    childrenList: UserChild[]
    isBannerOpen: boolean
    isAuthenticating: boolean
    selectedChildId: string
    fcmToken: string

    setUser: (value?: UserParent) => void
    setIsBannerOpen: (value: boolean) => void
    setChildrenList: (value: UserChild[]) => void
    setIsAuthenticating: (value: boolean) => void
    setSelectedChildId: (value: string) => void
    setFcmToken: (value: string) => void
}
