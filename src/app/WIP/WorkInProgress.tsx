import React from 'react'
import Image from '../../../public/construction.jpg'
import Style from './WorkInProgress.module.css'

const WorkInProgress = () => {
  return (
    <div className={Style.page}>
      <img src={Image.src} alt= 'Page under construction' className={Style.fill}/>
    </div>
  )
}

export default WorkInProgress