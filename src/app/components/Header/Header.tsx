import React from 'react'
import Styles from './Header.module.css'
import Hamburger from '../Hamburger/Hamburger'
import Mode from '../Mode/Mode'
import Navbar from '../Navbar/Navbar'

const Header = () => {
  return (
    <div className={Styles.Header}><Hamburger/><Navbar/><Mode/></div>
  )
}

export default Header