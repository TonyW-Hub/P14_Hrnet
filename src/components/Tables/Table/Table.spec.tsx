import { render, screen } from "@testing-library/react"
import { Table, ColumnType } from "./Table"

const columns: ColumnType<any>[] = [
  { key: "firstName", title: "First Name", dataIndex: "firstName" },
  { key: "lastName", title: "Last Name", dataIndex: "lastName" },
]

const dataSource = [
  { key: "1", firstName: "John", lastName: "Doe" },
  { key: "2", firstName: "Jack", lastName: "Doe" },
]

describe("Table Component", () => {
  it("renders the table headers correctly", () => {
    render(<Table dataSource={dataSource} columns={columns} />)

    columns.forEach((column) => {
      const headerElement = screen.getByText(column.title)
      expect(headerElement).toBeInTheDocument()
    })
  })

  // it("renders the data rows correctly", () => {
  //   render(<Table dataSource={dataSource} columns={columns} />)

  //   dataSource.forEach((record) => {
  //     columns.forEach((column) => {
  //       const cellText = record[column.key]
  //       const cellElement = screen.getByText(cellText)
  //       expect(cellElement).toBeInTheDocument()
  //     })
  //   })
  // })

  it("renders table data correctly", () => {
    render(<Table dataSource={dataSource} columns={columns} />)

    expect(screen.getByText("John")).toBeTruthy()
    expect(screen.getByText("Jack")).toBeTruthy()
  })

  it("renders data with custom render function", () => {
    const customColumns = [
      {
        key: "firstName",
        title: "First Name",
        render: () => <p>John</p>,
        dataIndex: "firstName",
      },
    ]

    render(<Table dataSource={dataSource} columns={customColumns} />)

    expect(screen.getByText("John")).toBeTruthy()
  })
})
