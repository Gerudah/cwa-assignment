'use client'
import Style from './Hamburger.module.css'
import React from 'react'


const Hamburger = ({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void }) => {

  return ( // each div is a line for the menu when clicked fires the function in header causing the boolean value to to change
    <div className={Style.Hamburger} onClick={toggleMenu}>
      <div className={`${Style.burger_bar} ${isOpen ? Style.clicked : ''}`}></div>
      <div className={`${Style.burger_bar} ${isOpen ? Style.clicked : ''}`}></div>
      <div className={`${Style.burger_bar} ${isOpen ? Style.clicked : ''}`}></div>
    </div>
  )
}

export default Hamburger