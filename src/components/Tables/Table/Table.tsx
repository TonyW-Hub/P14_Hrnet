import React, { PropsWithChildren } from "react"
import Styles from "./Table.module.scss"

export type ColumnType<T> = {
  key: string
  title: string
  dataIndex?: string | undefined
  render?: (text: string, record: T) => React.ReactNode
}

type TableProps = {
  dataSource: readonly any[]
  columns: ColumnType<any>[]
}

export const Table = ({
  dataSource,
  columns,
}: PropsWithChildren<TableProps>) => {
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
        {dataSource.map((record, index) => (
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
