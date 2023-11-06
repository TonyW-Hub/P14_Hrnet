import React from "react"
import { render, screen } from "@testing-library/react"
import { Table, ColumnType } from "./Table"

const columns: ColumnType<any>[] = [
  { key: "column1", title: "Column 1" },
  { key: "column2", title: "Column 2" },
]
const dataSource = [
  { column1: "Row 1, Column 1", column2: "Row 1, Column 2" },
  { column1: "Row 2, Column 1", column2: "Row 2, Column 2" },
]

describe("Table Component", () => {
  it("renders the table headers correctly", () => {
    render(<Table dataSource={dataSource} columns={columns} />)

    columns.forEach((column) => {
      const headerElement = screen.getByText(column.title)
      expect(headerElement).toBeInTheDocument()
    })
  })
})
