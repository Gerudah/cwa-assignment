'use client'

import React from 'react'
import Styles from './Navbar.module.css'

const Navbar = ({menuOpen, navbarClick}: {menuOpen: boolean, navbarClick:(key: string) => void}) => {

  return (
    <div className={Styles.Navbar}>
      <p className={Styles.Title}>CWA Assignment 1</p>
    <ul className={menuOpen? Styles.List : Styles.ListCollapsed}>
        <li className={Styles.Items} onClick={() => navbarClick('tabs')}>Tabs</li>
        <li>|</li>
        <li className={Styles.Items} onClick={() => navbarClick('pre-lab')}>Pre-Lab Questions</li>
        <li>|</li>
        <li className={Styles.Items} onClick={() => navbarClick('escape')}>Escape Room</li>
        <li>|</li>
        <li className={Styles.Items} onClick={() => navbarClick('races')}>Coding Races</li>
        <li>|</li>
        <li className={Styles.Items} onClick={() => navbarClick('about')}>About</li>
    </ul>
    </div>
  )
}

export default Navbar