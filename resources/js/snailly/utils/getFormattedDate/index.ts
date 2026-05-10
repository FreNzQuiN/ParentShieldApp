import moment from 'moment'

const getFormattedDate = (date: string, format?: string): string => {
    if (format) {
        return moment(date).format(format)
    }

    return moment(date).format('DD MMMM YYYY')
}

export default getFormattedDate
