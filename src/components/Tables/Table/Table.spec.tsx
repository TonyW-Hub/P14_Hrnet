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

    expect(screen.getAllByText("John").length).toBe(2)
  })
  // tester le pager
  it("should render 5 page with 10 items by default", () => {
    const dataSource2 = []
    for (let i = 1; i <= 50; i++) {
      const obj = {
        key: i.toString(),
        firstName: `John ${i}`,
        lastName: `Doe ${i}`,
      }
      dataSource2.push(obj)
    }
    render(<Table dataSource={dataSource2} columns={columns} />)
    expect(screen.getAllByRole("pageNumber").length).toBe(5)
  })
  it("should render the first page with first item", () => {
    const dataSource2 = []
    for (let i = 1; i <= 50; i++) {
      const obj = {
        key: i.toString(),
        firstName: `John ${i}`,
        lastName: `Doe ${i}`,
      }
      dataSource2.push(obj)
    }
    render(<Table dataSource={dataSource2} columns={columns} />)
    expect(screen.getByText("John 1")).toBeTruthy()
  })
  it("should render the first page with nine item", () => {
    const dataSource2 = []
    for (let i = 1; i <= 50; i++) {
      const obj = {
        key: i.toString(),
        firstName: `John ${i}`,
        lastName: `Doe ${i}`,
      }
      dataSource2.push(obj)
    }
    render(<Table dataSource={dataSource2} columns={columns} />)
    expect(screen.getByText("John 9")).toBeTruthy()
  })
  it("should render the first page with only ten item", () => {
    const dataSource2 = []
    for (let i = 1; i <= 50; i++) {
      const obj = {
        key: i.toString(),
        firstName: `John ${i}`,
        lastName: `Doe ${i}`,
      }
      dataSource2.push(obj)
    }
    render(<Table dataSource={dataSource2} columns={columns} />)
    expect(screen.queryByText("John 11")).toBeNull()
  })
  it("should render the second page with  item from 11 to 20", () => {
    const dataSource2 = []
    for (let i = 1; i <= 50; i++) {
      const obj = {
        key: i.toString(),
        firstName: `John ${i}`,
        lastName: `Doe ${i}`,
      }
      dataSource2.push(obj)
    }
    render(<Table dataSource={dataSource2} columns={columns} />)
    // faire un click pour azfficher la seconde page
    // expect(screen.queryByText("John 11")).toBeThruthy()
  })
})
