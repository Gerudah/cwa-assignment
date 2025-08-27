'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Daisy from '../../../../public/daisy.png'
import Dahlia from '../../../../public/dahlia.png'
import style from './Mode.module.css'

const Mode = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
      const root = window.document.documentElement
        if (dark) {
          root.classList.add('dark')
      } else {
          root.classList.remove('dark')
        }
      
    },  [dark])
  return (
    <div className={style.spin} onClick={() => setDark(!dark)} style={{cursor: 'pointer'}}>
      {dark ? <Image src={Daisy} width={50} height = {50} alt='Daisy'/> : <Image src={Dahlia} width={50} height={50} alt='Dahlia'/>}
    </div>
  )
}

export default Mode