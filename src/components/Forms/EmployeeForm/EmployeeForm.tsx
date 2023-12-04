import { useEffect, useReducer, useState } from "react"
import Styles from "./EmployeeForm.module.scss"
import { Button, DatePicker, Form, Input, Modal, Select, Switch } from "antd"
import { useIcons } from "../../../hooks/useIcons"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import locale from "antd/es/date-picker/locale/fr_FR"

import "dayjs/locale/fr"
import {
  selectDepartements,
  selectStates,
  setSelectDepartment,
  setSelectStates,
} from "../../../features/selects/selectSlice"
import { Employee } from "../../../types"
import {
  addNewEmployee,
  setNewEmployees,
} from "../../../features/employees/employeesSlice"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = () => {
  const states = useAppSelector(selectStates)
  const departments = useAppSelector(selectDepartements)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { icon: userIcon } = useIcons({ variantIcon: "user" })
  const { icon: cityIcon } = useIcons({ variantIcon: "city" })
  const { icon: houseIcon } = useIcons({ variantIcon: "house" })
  const { icon: mapIcon } = useIcons({ variantIcon: "map" })

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [redirectToggle, setRedirectToggle] = useState(true)

  const reducer = (prev: Employee, next: Partial<Employee>) => ({
    ...prev,
    ...next,
  })

  const [fields, updateField] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    startDate: "",
    department: "",
    dateOfBirth: "",
    street: "",
    city: "",
    state: "",
    zipCode: "1",
  } as Employee)

  const showModal = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const onChangeToggle = (checked: boolean) => {
    setRedirectToggle(checked)
  }

  const handleSubmit = () => {
    setLoading(true)

    setTimeout(() => {
      dispatch(setNewEmployees(fields))
      dispatch(addNewEmployee(fields))

      if (redirectToggle) {
        setLoading(false)
        handleCancel()
        navigate("/employee-list")
      } else {
        setLoading(false)
        handleCancel()
      }
    }, 1000)
  }

  useEffect(() => {
    dispatch(setSelectStates())
    dispatch(setSelectDepartment())
  }, [dispatch])

  return (
    <Form
      layout="vertical"
      onFinish={showModal}
      onFinishFailed={() => alert("field missing")}
      className={Styles.EmployeeForm}
    >
      <Form.Item
        label="First Name"
        name="fistName"
        tooltip="Enter the employee first name"
        rules={[
          {
            required: true,
            message: "Please input correct first name",
            whitespace: true,
            pattern: RegExp("^[A-Za-z-' À-ÖØ-öø-ÿ]+$"),
          },
        ]}
      >
        <Input
          placeholder="First Name"
          prefix={userIcon ? userIcon : <span />}
          onChange={(e) => {
            updateField({ firstName: e.currentTarget.value })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        tooltip="Enter the employee last name"
        rules={[
          {
            required: true,
            message: "Please input correct last name",
            whitespace: true,
            pattern: RegExp("^[A-Za-z-' À-ÖØ-öø-ÿ]+$"),
          },
        ]}
      >
        <Input
          placeholder="Last Name"
          prefix={userIcon ? userIcon : <span />}
          onChange={(e) => {
            updateField({ lastName: e.currentTarget.value })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        tooltip="Enter the employee date of birth"
        rules={[{ required: true, message: "Please input the date of birth" }]}
      >
        <DatePicker
          size="large"
          locale={locale}
          onChange={(e) => {
            updateField({ dateOfBirth: e?.format("YYYY-MM-DD") })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Start Date"
        name="startDate"
        tooltip="Enter the start date the employee joined the company"
        rules={[{ required: true, message: "Please input the start date" }]}
      >
        <DatePicker
          size="large"
          locale={locale}
          onChange={(e) => {
            updateField({ startDate: e?.format("YYYY-MM-DD") })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Street"
        name="street"
        tooltip="Enter employee street"
        rules={[
          {
            required: true,
            message: "Please input correct street",
            whitespace: true,
            pattern: RegExp("^[A-Za-z0-9,' À-ÖØ-öø-ÿ]+$"),
          },
        ]}
      >
        <Input
          placeholder="Street"
          prefix={houseIcon ? houseIcon : <span />}
          onChange={(e) => {
            updateField({ street: e.currentTarget.value })
          }}
        />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        tooltip="Enter employee city"
        rules={[
          {
            required: true,
            message: "Please input correct city",
            whitespace: true,
            pattern: RegExp("^[A-Za-z-' À-ÖØ-öø-ÿ]+$"),
          },
        ]}
      >
        <Input
          placeholder="City"
          prefix={cityIcon ? cityIcon : <span />}
          onChange={(e) => {
            updateField({ city: e.currentTarget.value })
          }}
        />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        tooltip="Select employee state"
        rules={[{ required: true, message: "Please select a state" }]}
      >
        <Select
          options={states}
          placeholder="Select state"
          onChange={(e) => {
            updateField({ state: e })
          }}
        ></Select>
      </Form.Item>
      <Form.Item
        label="Zip code"
        name="zipCode"
        tooltip="Enter the employee zip code"
        rules={[
          {
            required: true,
            message: "Please input a correct zip code",
            pattern: RegExp("^[0-9s ]+$"),
          },
        ]}
      >
        <Input
          prefix={mapIcon ? mapIcon : <span />}
          onChange={(e) => {
            updateField({ zipCode: e.currentTarget.value })
          }}
          placeholder="1"
        />
      </Form.Item>
      <Form.Item
        label="Department"
        name="department"
        tooltip="Select a departement"
        rules={[
          {
            required: true,
            message: "Select a departement",
          },
        ]}
      >
        <Select
          options={departments}
          placeholder="Select department"
          onChange={(e) => {
            updateField({ department: e })
          }}
        ></Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Save</Button>
        <Modal
          open={open}
          onCancel={handleCancel}
          onOk={handleSubmit}
          title="Confirmation"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleSubmit}
            >
              Submit
            </Button>,
          ]}
        >
          <p>You confirm the creation of the new employee ?</p>
          <div className={Styles.toggle}>
            <span>Would you like to be redirected to the employee list?</span>
            <Switch defaultChecked onChange={onChangeToggle} />
          </div>
        </Modal>
      </Form.Item>
    </Form>
  )
}
