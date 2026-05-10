import { LogActivityItem } from "../logActivityItem";

export interface LogActivity {
    items: LogActivityItem[],
    total: number
    page: number
    limit: number
    totalPage: number
}
