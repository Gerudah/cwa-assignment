'use client'

import React from 'react'
import Styles from './Header.module.css'
import Hamburger from '../Hamburger/Hamburger'
import Mode from '../Mode/Mode'
import Navbar from '../Navbar/Navbar'

const Header = ({isSelected, setSelected}:{isSelected: string, setSelected: (key: string) => void}) => {
  const[menuOpen, setMenuOpen] = React.useState(false)
  return (
    <div className={Styles.Header}>
      <Hamburger isOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
      <Navbar menuOpen={menuOpen} navbarClick={setSelected}/>
      <Mode/>
    </div>
  )
}

export default Header