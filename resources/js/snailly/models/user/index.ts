export interface User {
    id?: string
    name: string
    createdAt?: string
    updatedAt?: string
}

export interface UserChild extends User {
    parentsId?: number
}

export interface UserParent extends User {
    email: string
    accessToken: string
    password?: string
    iat?: number
}
