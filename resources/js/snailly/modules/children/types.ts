import { FormEvent } from 'react'

import { UserChild, User } from '@/models'

export interface FormData {
    name: string
}

export interface ChildrenViewsProps {
    formData: FormData
    isLoading: boolean
    isAddModalOpen: boolean
    isEditModalOpen: boolean
    isDeleteModalOpen: boolean
    isFormLoading: boolean
    listOfChildren: UserChild[]
    openAddModalHandler: () => void
    closeAddModalHandler: () => void
    openEditModalHandler: (id: User["id"], name: User["name"]) => void
    closeEditModalHandler: () => void
    openDeleteModalHandler: (id: User["id"], name: User["name"]) => void
    closeDeleteModalHandler: () => void
    formAddOnSubmitHandler: (event: FormEvent<HTMLFormElement>) => void
    formEditOnSubmitHandler: (event: FormEvent<HTMLFormElement>) => void
    formDeleteOnSubmitHandler: (event: FormEvent<HTMLFormElement>) => void
    inputAddOnChangeHandler: (event: FormEvent<HTMLInputElement>) => void
    inputEditOnChangeHandler: (event: FormEvent<HTMLInputElement>) => void
    inputDeleteOnChangeHandler: (event: FormEvent<HTMLInputElement>) => void
}
