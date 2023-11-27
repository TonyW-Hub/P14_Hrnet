import React, { PropsWithChildren, useRef, useState } from "react"
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
  search?: boolean
}

export const Table = ({
  dataSource,
  columns,
  search = false,
}: PropsWithChildren<TableProps>) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)

  const [searchContent, setSearchContent] = useState<string>("")

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStartX

    if (containerRef.current) {
      containerRef.current.scrollLeft -= deltaX
    }

    setDragStartX(e.clientX)
  }

  const calcMinWidthTable = () => {
    let width = columns.length * 100

    return width + "px"
  }

  const filterBySearch = (record: any) => {
    const filter = Object.values(record).filter((key: any) =>
      key?.toLowerCase()?.includes(searchContent.toLowerCase()),
    )

    if (filter.length) {
      if (filter) {
        return (
          <tr>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render && record
                  ? column.render(record[column?.dataIndex || 0], record)
                  : record[column.dataIndex || 0]}
              </td>
            ))}
          </tr>
        )
      }
    }
    // else {
    //   return (
    //     <tr>
    //       <td colSpan={columns.length}>Employee not found</td>
    //     </tr>
    //   )
    // }
  }

  return (
    <>
      {search && (
        <div className={Styles.searchContainer}>
          <span className={Styles.iconSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="search"
            className={Styles.inputSearch}
            placeholder="Search employee..."
            onChange={(e) => {
              setSearchContent(e.currentTarget.value)
            }}
          />
        </div>
      )}
      <div
        className={Styles.containerTable}
        ref={containerRef}
        onMouseDown={(e: any) => {
          handleMouseDown(e)
        }}
        onMouseUp={handleMouseUp}
        onMouseMove={(e: any) => {
          handleMouseMove(e)
        }}
      >
        <table
          className={Styles.Table}
          style={{ minWidth: `${calcMinWidthTable()}` }}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((record, index) => (
              <React.Fragment key={"table" + index}>
                {search && filterBySearch(record)}
                {!searchContent && (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td key={column.key}>
                        {column.render && record
                          ? column.render(
                              record[column?.dataIndex || 0],
                              record,
                            )
                          : record[column.dataIndex || 0]}
                      </td>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
