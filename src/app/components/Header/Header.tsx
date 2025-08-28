'use client'

import React from 'react'
import Styles from './Header.module.css'
import Hamburger from '../Hamburger/Hamburger'
import Mode from '../Mode/Mode'
import Navbar from '../Navbar/Navbar'

const Header = ({setSelected}:{setSelected: (key: string) => void}) => { //variables passed down from page
  const[menuOpen, setMenuOpen] = React.useState(false)
  return (//Excluded from dark mode, render header elements
    <div className={`${Styles.Header} no-dark`}> 
      <Hamburger isOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
      <Navbar menuOpen={menuOpen} setSelected={setSelected}/>
      <Mode/>
    </div>
  )
}

export default Header