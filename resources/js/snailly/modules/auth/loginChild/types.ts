import { UserChild } from '@/models'

export interface ChildrenViewsProps {
    childrenList: UserChild[]
    childAccountButtonHandler: (data: {child_id: string, token: string}) => void,
    isLoading: Boolean
}