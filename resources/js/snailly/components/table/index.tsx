import React from 'react'

import { sTable, sTableChild, sTableWrapper } from './styles'
import { TableProps } from './types'
import { useLocation } from 'react-router-dom'

const Table = ({ children }: TableProps) => {
    const { pathname } = useLocation()
    const sTableClassName = pathname === '/children' ? sTableChild : sTable

    return (
        <div className={sTableWrapper}>
            <table className={sTableClassName}>{children}</table>
        </div>
    )
}

export default Table
