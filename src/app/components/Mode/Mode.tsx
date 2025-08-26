'use client'
import React from 'react'
import Image from 'next/image'
import Daisy from '/home/gerudah/repos/cwa-assignment/public/daisy.png'
import Dahlia from '/home/gerudah/repos/cwa-assignment/public/dahlia.png'

const Mode = () => {
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
        if (dark) {
          root.classList.add('dark')
      } else {
          root.classList.remove('dark')
        }
      }
    },  [dark])
  return (
    <div onClick={() => setDark(!dark)} style={{cursor: 'pointer'}}>
      {dark ? <Image src={Daisy} width={50} height = {50} alt='Daisy'/> : <Image src={Dahlia} width={50} height={50} alt='Dahlia'/>}
    </div>
  )
}

export default Mode