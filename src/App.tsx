import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom"
import { Layout } from "./layouts/Layout/Layout"
import { CreateEmployeePage } from "./pages/CreateEmployeePage/CreateEmployeePage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<CreateEmployeePage />}></Route>
    </Route>,
  ),
)

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
