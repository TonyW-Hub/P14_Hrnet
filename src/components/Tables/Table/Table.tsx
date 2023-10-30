import React, { PropsWithChildren } from "react"
import Styles from "./Table.module.scss"

type TableProps = {
  rows: any[]
  columns: any[]
}

export const Table = ({ rows, columns }: PropsWithChildren<TableProps>) => {
  return (
    <table className={Styles.Table}>
      {columns.length > 0 && (
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={"col" + index}>{col?.title}</th>
            ))}
          </tr>
        </thead>
      )}
      {rows.length > 0 && (
        <tbody>
          <tr>
            {rows.map((row, index) => (
              <td key={index}>{row}</td>
            ))}
          </tr>
        </tbody>
      )}
    </table>
  )
}
