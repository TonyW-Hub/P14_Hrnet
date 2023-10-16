import React, { PropsWithChildren } from "react"
import Styles from "./NavBar.module.scss"
import { Link } from "react-router-dom"

type NavBarProps = {}

export const NavBar = (props: PropsWithChildren<NavBarProps>) => {
  return (
    <nav className={Styles.NavBar}>
      <Link to="/">Hrnet</Link>
    </nav>
  )
}
