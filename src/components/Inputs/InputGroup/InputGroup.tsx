import React, { PropsWithChildren } from "react"
import Styles from "./InputGroup.module.scss"
import { Input, DatePicker } from "antd"
import { useIcons } from "../../../hooks/useIcons"
import { Icons } from "../../../types"

type InputGroupProps = {
  label?: string
  labelName?: string
  inputSizing?: "large" | "middle" | "small"
  variantIcon?: Icons
  inputType?: "text" | "datePicker"
}

export const InputGroup = ({
  label,
  labelName,
  inputSizing = "large",
  variantIcon = "user",
  inputType = "text",
}: PropsWithChildren<InputGroupProps>) => {
  const { icon } = useIcons({ variantIcon })

  const setInput = () => {
    switch (inputType) {
      case "text":
        return (
          <Input
            id={labelName}
            name={labelName}
            size={inputSizing}
            placeholder={label}
            prefix={icon ? icon : null}
          />
        )
      case "datePicker":
        return <DatePicker size={inputSizing} />

      default:
        return null
    }
  }

  return (
    <div className={Styles.InputGroup}>
      {label && <label htmlFor={labelName}>{label}</label>}
      {setInput()}
    </div>
  )
}
