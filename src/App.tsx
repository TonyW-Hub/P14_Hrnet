import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom"
import { Layout } from "./layouts/Layout/Layout"
import { CreateEmployeePage } from "./pages/CreateEmployeePage/CreateEmployeePage"
import { EmployeesListPage } from "./pages/EmployeesListPage/EmployeesListPage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<CreateEmployeePage />}></Route>
      <Route path="/employee-list" element={<EmployeesListPage />}></Route>
    </Route>,
  ),
)

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
