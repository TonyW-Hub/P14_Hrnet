import React, { PropsWithChildren, useEffect } from "react"
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

type EmployeeFormProps = {}

export const EmployeeForm = (props: PropsWithChildren<EmployeeFormProps>) => {
  const states = useAppSelector(selectStates)
  const departments = useAppSelector(selectDepartements)
  const dispatch = useAppDispatch()

  const { icon: userIcon } = useIcons({ variantIcon: "user" })
  const { icon: cityIcon } = useIcons({ variantIcon: "city" })
  const { icon: houseIcon } = useIcons({ variantIcon: "house" })

  useEffect(() => {
    dispatch(setSelectStates())
    dispatch(setSelectDepartment())
  }, [dispatch])

  return (
    <Form layout="vertical" className={Styles.EmployeeForm}>
      <Form.Item label="First Name">
        <Input placeholder="First Name" prefix={userIcon} />
      </Form.Item>
      <Form.Item label="Last Name">
        <Input placeholder="Last Name" prefix={userIcon} />
      </Form.Item>
      <Form.Item label="Date of Birth">
        <DatePicker size="large" locale={locale} />
      </Form.Item>
      <Form.Item label="Start Date">
        <DatePicker size="large" locale={locale} />
      </Form.Item>
      <Form.Item label="Street">
        <Input placeholder="Street" prefix={houseIcon} />
      </Form.Item>
      <Form.Item label="City">
        <Input placeholder="City" prefix={cityIcon} />
      </Form.Item>
      <Form.Item>
        <Select options={states} placeholder="Select state"></Select>
      </Form.Item>
      <Form.Item>
        <InputNumber min={1} max={10} defaultValue={1} />
      </Form.Item>
      <Form.Item>
        <Select options={departments} placeholder="Select department"></Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  )
}
