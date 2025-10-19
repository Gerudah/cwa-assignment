'use client'

import React from 'react'
import Styles from './Navbar.module.css'

const Navbar = ({menuOpen, setSelected}: {menuOpen: boolean, setSelected:(key: string) => void}) => { //values passed down from page

  return (
    //Title and Menu Items collated together in a flex box, each item provides its name to setSelected
    <div className={Styles.Navbar}> 
      <p className={Styles.Title}>CWA Assignment 2</p>
    <ul className={menuOpen? Styles.List : Styles.ListCollapsed}>
        <li className={Styles.Items} onClick={() => setSelected('tabs')}>Tabs</li>
        <li className={Styles.bars}>|</li>
        <li className={Styles.Items} onClick={() => setSelected('pre-lab')}>Pre-Lab Questions</li>
        <li className={Styles.bars}>|</li>
        <li className={Styles.Items} onClick={() => setSelected('escape')}>Escape Room</li>
        <li className={Styles.bars}>|</li>
        <li className={Styles.Items} onClick={() => setSelected('races')}>Coding Races</li>
        <li className={Styles.bars}>|</li>
        <li className={Styles.Items} onClick={() => setSelected('about')}>About</li>
    </ul>
    </div>
  )
}

export default Navbar