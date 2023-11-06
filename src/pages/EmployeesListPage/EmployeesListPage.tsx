import React, { PropsWithChildren } from "react"
import Styles from "./EmployeesListPage.module.scss"
import { ColumnType, Table } from "../../components/Tables/Table/Table"
import { Employee } from "../../types"

type EmployeesListPageProps = {}

const columns: ColumnType<Employee>[] = [
  {
    key: "firstName",
    title: "First Name",
    dataIndex: "firstName",
  },
  {
    key: "lastName",
    title: "Last Name",
    dataIndex: "lastName",
  },
  {
    key: "startDate",
    title: "Start Name",
    dataIndex: "startDate",
  },
  {
    key: "department",
    title: "Department",
    dataIndex: "department",
  },
  {
    key: "dateOfBirth",
    title: "Date Of Birth",
    dataIndex: "dateOfBirth",
  },
  {
    key: "street",
    title: "Street",
    dataIndex: "street",
  },
  {
    key: "city",
    title: "City",
    dataIndex: "city",
  },
  {
    key: "state",
    title: "State",
    dataIndex: "state",
  },
  {
    key: "zipCode",
    title: "Zip Code",
    dataIndex: "zipCode",
  },
]

const data: Employee[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Doe",
    startDate: "10/17/2023",
    department: "Marketing",
    dateOfBirth: "10/20/2010",
    street: "main street",
    city: "main city",
    state: "AL",
    zipCode: "132",
  },
]

export const EmployeesListPage = (
  props: PropsWithChildren<EmployeesListPageProps>,
) => {
  return (
    <div className={Styles.EmployeesListPage}>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}
