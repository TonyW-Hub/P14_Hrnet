import React, { PropsWithChildren } from "react"
import Styles from "./Table.module.scss"
import { ColumnType } from "../../../types/index"

type TableProps = {
  dataSource: readonly any[]
  columns: ColumnType<any>[]
  search: string
}

const Table = ({
  dataSource,
  columns,
  search,
}: PropsWithChildren<TableProps>) => {
  const localDataSource = dataSource.filter((data) => {
    if (search) {
      // boucler et chercher dans toutes les colonnes qui correspondent à une ligne
      if (data.includes(search)) {
        return true
      }
      return false
    }
    return true
  })
  return (
    <table className={Styles.Table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {localDataSource.map((record, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render && record
                  ? column.render(record[column?.dataIndex || 0], record)
                  : record[column.dataIndex || 0]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
