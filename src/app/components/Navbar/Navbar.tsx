'use client'

import React from 'react'
import Styles from './Navbar.module.css'
import About from '@/app/About/About'

const Navbar = ({menuOpen}: {menuOpen: boolean}) => {
  
  return (
    <div className={Styles.Navbar}>
      <p className={menuOpen? Styles.Collapsed : Styles.Title}>CWA Assignment 1</p>
    <ul className={menuOpen? Styles.List : Styles.Collapsed}>
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
    </div>
  )
}

export default Navbar