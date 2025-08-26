'use client'
import Style from './Hamburger.module.css'
import React from 'react'

const Hamburger = ({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void }) => {
  return (
    <div className={Style.Hamburger} onClick={toggleMenu}>
      <div className={`${Style.burger_bar} ${isOpen ? Style.clicked : ''}`}></div>
      <div className={`${Style.burger_bar} ${isOpen ? Style.clicked : ''}`}></div>
      <div className={`${Style.burger_bar} ${isOpen ? Style.clicked : ''}`}></div>
    </div>
  )
}

export default Hamburger