import React, { PropsWithChildren } from "react"
import { useOutlet } from "react-router-dom"
import { NavBar } from "../../components/NavsBar/NavBar/NavBar"

type LayoutProps = {}

export const Layout = (props: PropsWithChildren<LayoutProps>) => {
  const outlet = useOutlet()
  return (
    <>
      <NavBar />
      {outlet}
    </>
  )
}
