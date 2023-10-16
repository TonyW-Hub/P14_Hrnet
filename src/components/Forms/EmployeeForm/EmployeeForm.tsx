import React, { PropsWithChildren } from "react"
import Styles from "./EmployeeForm.module.scss"
import { Button, DatePicker, Dropdown, Form, Input } from "antd"
import { useIcons } from "../../../hooks/useIcons"
import locale from "antd/es/date-picker/locale/fr_FR"

import "dayjs/locale/fr"
import { states } from "../../../data/project/states"

type EmployeeFormProps = {}

export const EmployeeForm = (props: PropsWithChildren<EmployeeFormProps>) => {
  const { icon: userIcon } = useIcons({ variantIcon: "user" })
  const { icon: cityIcon } = useIcons({ variantIcon: "city" })
  const { icon: houseIcon } = useIcons({ variantIcon: "house" })

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
        {/* <Dropdown menu={states}>
          <Button></Button>
        </Dropdown> */}
      </Form.Item>
    </Form>
  )
}
