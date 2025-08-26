import React from 'react'
import Styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <ul className={Styles.Navbar}>
        <li className={Styles.Items}>Tabs</li>
        <li>|</li>
        <li className={Styles.Items}>Pre-Lab Quaestions</li>
        <li>|</li>
        <li className={Styles.Items}>Escape Room</li>
        <li>|</li>
        <li className={Styles.Items}>Coding Races</li>
        <li>|</li>
        <li className={Styles.Items}>About</li>
    </ul>
  )
}

export default Navbar