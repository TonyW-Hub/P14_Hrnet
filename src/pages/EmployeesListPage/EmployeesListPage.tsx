import React, { PropsWithChildren } from "react"
import Styles from "./EmployeesListPage.module.scss"
// import { ColumnType, Table } from "../../components/Tables/Table/Table"
import { Employee } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { selectEmployees } from "../../features/employees/employeesSlice"
import { Table, ColumnType } from "fluid-table-react"

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

export const EmployeesListPage = (
  props: PropsWithChildren<EmployeesListPageProps>,
) => {
  const employees = useAppSelector(selectEmployees)

  return (
    <div className={Styles.EmployeesListPage}>
      <Table dataSource={employees} columns={columns} search />
    </div>
  )
}
