import React, { PropsWithChildren, useEffect, useReducer } from "react"
import Styles from "./EmployeeForm.module.scss"
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd"
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
import { addNewEmployee } from "../../../features/forms/formSlice"
import { Employee } from "../../../types"
import { LOCAL_STORAGE_KEYS } from "../../../utils/localStorageKeys"

type EmployeeFormProps = {}

export const EmployeeForm = (props: PropsWithChildren<EmployeeFormProps>) => {
  const states = useAppSelector(selectStates)
  const departments = useAppSelector(selectDepartements)
  const dispatch = useAppDispatch()

  const { icon: userIcon } = useIcons({ variantIcon: "user" })
  const { icon: cityIcon } = useIcons({ variantIcon: "city" })
  const { icon: houseIcon } = useIcons({ variantIcon: "house" })

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
    zipCode: "",
  } as Employee)

  const handleSubmit = () => {
    const idx = Object.values(fields).findIndex((el) => el === "")
    if (idx !== -1) {
      alert(`field missing`)
      return
    }

    dispatch(addNewEmployee(fields))
  }

  useEffect(() => {
    dispatch(setSelectStates())
    dispatch(setSelectDepartment())
  }, [dispatch])

  return (
    <Form layout="vertical" className={Styles.EmployeeForm}>
      <Form.Item label="First Name">
        <Input
          placeholder="First Name"
          prefix={userIcon}
          onChange={(e) => {
            updateField({ firstName: e.currentTarget.value })
          }}
        />
      </Form.Item>
      <Form.Item label="Last Name">
        <Input
          placeholder="Last Name"
          prefix={userIcon}
          onChange={(e) => {
            updateField({ lastName: e.currentTarget.value })
          }}
        />
      </Form.Item>
      <Form.Item label="Date of Birth">
        <DatePicker
          size="large"
          locale={locale}
          onChange={(e) => {
            updateField({ dateOfBirth: e?.format("YYYY-MM-DD") })
          }}
        />
      </Form.Item>
      <Form.Item label="Start Date">
        <DatePicker
          size="large"
          locale={locale}
          onChange={(e) => {
            updateField({ startDate: e?.format("YYYY-MM-DD") })
          }}
        />
      </Form.Item>
      <Form.Item label="Street">
        <Input
          placeholder="Street"
          prefix={houseIcon}
          onChange={(e) => {
            updateField({ street: e.currentTarget.value })
          }}
        />
      </Form.Item>
      <Form.Item label="City">
        <Input
          placeholder="City"
          prefix={cityIcon}
          onChange={(e) => {
            updateField({ city: e.currentTarget.value })
          }}
        />
      </Form.Item>
      <Form.Item label="State">
        <Select
          options={states}
          placeholder="Select state"
          onChange={(e) => {
            updateField({ state: e })
          }}
        ></Select>
      </Form.Item>
      <Form.Item label="Zip code">
        <InputNumber
          min={1}
          max={10}
          defaultValue={1}
          onChange={(e) => {
            updateField({ zipCode: e?.toString() })
          }}
        />
      </Form.Item>
      <Form.Item label="Department">
        <Select
          options={departments}
          placeholder="Select department"
          onChange={(e) => {
            updateField({ department: e })
          }}
        ></Select>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          onClick={() => {
            handleSubmit()
          }}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
