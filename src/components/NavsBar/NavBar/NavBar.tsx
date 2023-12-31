import React, { PropsWithChildren } from "react"
import Styles from "./NavBar.module.scss"
import { Link, useLocation, useNavigate } from "react-router-dom"

type NavBarProps = {}

export const NavBar = (props: PropsWithChildren<NavBarProps>) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <nav className={Styles.NavBar}>
      <Link to="/" className={Styles.main}>
        Hrnet
      </Link>
      {pathname === "/" && (
        <span
          className={Styles.employees}
          onClick={() => {
            navigate("/employee-list")
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <Link to="/employee-list">Employees</Link>
        </span>
      )}
      {pathname === "/employee-list" && (
        <span
          className={Styles.new}
          onClick={() => {
            navigate("/")
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          <Link to="/">Add Employee</Link>
        </span>
      )}
    </nav>
  )
}
