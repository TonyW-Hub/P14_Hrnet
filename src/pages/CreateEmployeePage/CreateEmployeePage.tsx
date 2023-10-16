import { EmployeeForm } from "../../components/Forms/EmployeeForm/EmployeeForm"
import Styles from "./CreateEmployeePage.module.scss"

export const CreateEmployeePage = () => {
  return (
    <main className={Styles.CreateEmployeePage}>
      <EmployeeForm />
    </main>
  )
}
