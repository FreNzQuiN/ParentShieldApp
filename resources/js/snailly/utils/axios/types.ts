import { AxiosRequestConfig } from 'axios'

export interface AxiosProps extends Omit<AxiosRequestConfig, 'url'> {
    token?: string
    withoutBaseURL?: boolean
}
