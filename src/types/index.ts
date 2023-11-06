export type Icons = "user" | "house" | "city" | "cake"

export interface Employee {
  key: string
  firstName: string
  lastName: string
  startDate: string
  department: string
  dateOfBirth: string
  street: string
  city: string
  state: string
  zipCode: string
}

export type ColumnType<T> = {
  key: string
  title: string
  dataIndex?: string | undefined
  render?: (text: string, record: T) => React.ReactNode
}
