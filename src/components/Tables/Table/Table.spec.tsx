import React from "react"
import { render, screen } from "@testing-library/react"
import Table from "./Table"
import { ColumnType } from "../../../types"

const columns: ColumnType<any>[] = [
  { key: "column1", title: "Column 1" },
  { key: "column2", title: "Column 2" },
  { key: "test", title: "test" },
]
const dataSource = [
  { column1: "Row 1, Column 1", column2: "Row 1, Column 2", test: "test" },
  { column1: "Row 2, Column 1", column2: "Row 2, Column 2", test: "test" },
]

describe("Table Component", () => {
  it("renders the table headers correctly", () => {
    render(<Table dataSource={dataSource} columns={columns} />)

    columns.forEach((column) => {
      const headerElement = screen.getByText(column.title)
      expect(headerElement).toBeInTheDocument()
    })
  })
  it('should have Table with only one row because i search the string "test"', () => {
    const { container } = render(
      <Table dataSource={dataSource} columns={columns} search={"test"} />,
    )

    // how many tr in Table render ?
    console.log(
      'container.querySelectorAll("tbody tr").length',
      container.querySelectorAll("tbody tr").length,
    )
    expect(container.querySelectorAll("tbody tr").length).toBe(1)

    // expect 1
  })
})
