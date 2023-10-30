import React, { PropsWithChildren } from "react"
import Styles from "./EmployeesListPage.module.scss"
import { Table } from "../../components/Tables/Table/Table"

type EmployeesListPageProps = {}

export const EmployeesListPage = (
  props: PropsWithChildren<EmployeesListPageProps>,
) => {
  return (
    <div className={Styles.EmployeesListPage}>
      <Table rows={[]} columns={[{ title: "test" }]} />
    </div>
  )
}
