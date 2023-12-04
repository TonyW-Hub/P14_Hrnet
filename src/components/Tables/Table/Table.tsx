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
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10)

  const totalPages = Math.ceil(dataSource.length / entriesPerPage)

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

  const filterBySearch = () => {
    const filter = dataSource.filter((record) => {
      const find = Object.values(record).find((el: any) =>
        el?.toLowerCase()?.includes(searchContent.toLowerCase()),
      )
      return find
    })

    if (filter.length > 0) {
      return filter.map((record, index) => (
        <tr key={"record" + index}>
          {columns.map((column) => (
            <td key={column.key}>
              {column.render && record
                ? column.render(record[column?.dataIndex || 0], record)
                : record[column.dataIndex || 0]}
            </td>
          ))}
        </tr>
      ))
    } else {
      return (
        <tr>
          <td colSpan={columns.length}>Employee not found</td>
        </tr>
      )
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleEntriesChange = (value: number) => {
    setEntriesPerPage(value)
    setCurrentPage(1) // Reset to first page when changing entries per page
  }

  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = dataSource.slice(indexOfFirstEntry, indexOfLastEntry)

  return (
    <>
      <div className={Styles.controlers}>
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
        <div className={Styles.entries}>
          <span>Show</span>
          <select
            name="showEntries"
            id="showEntries"
            onChange={(e) => {
              handleEntriesChange(parseInt(e.currentTarget.value))
            }}
            className={Styles.selectEntries}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>
      </div>

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
            {search && searchContent !== "" && filterBySearch()}
            {searchContent === "" &&
              currentEntries.map((record, index) => (
                <React.Fragment key={"table" + index}>
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
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <span>
          Showing{" "}
          {dataSource.length > entriesPerPage
            ? entriesPerPage
            : dataSource.length}{" "}
          to {Math.min(indexOfLastEntry, dataSource.length)} of{" "}
          {dataSource.length} entries
        </span>

        <div className={Styles.paginationControls}>
          <button
            onClick={() => {
              if (currentPage === 1) return
              handlePageChange(Math.max(1, currentPage - 1))
            }}
            disabled={currentPage === 1}
            className={`${Styles.btnControl} ${
              currentPage === 1 ? Styles.disabled : ""
            }`}
          >
            Previous
          </button>
          {Array.from(Array(totalPages).keys()).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page + 1)}
              disabled={currentPage === page + 1}
              className={`${Styles.btnNumber}`}
              role="pageNumber"
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => {
              if (currentPage === totalPages) return
              handlePageChange(currentPage + 1)
            }}
            disabled={currentPage === totalPages}
            className={`${Styles.btnControl} ${
              currentPage === totalPages ? Styles.disabled : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}
