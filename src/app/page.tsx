'use client'

import React, {useState} from 'react'
import Header from "./components/Header/Header"
import About from './About/About'
import WorkInProgress from './WIP/WorkInProgress'
import Tabs from './Tabs/Tabs'
import Footer from './components/Footer/Footer'

export default function Home() {

  const [isSelected, setSelected] = useState<string>('about')
  function renderPage(){
    switch(isSelected){
      case 'tabs':
        return <Tabs/>;
      case 'pre-lab':
        return <WorkInProgress/>;
      case 'escape':
        return <WorkInProgress/>;
      case 'races':
        return <WorkInProgress/>;
      case 'about':
        return <About/>
      default:
        return <About/>
    }
  }

  return (
    <main>
      <Header isSelected={isSelected} setSelected={setSelected}/>
      <div className='page-container'>
        {renderPage()}
      </div>
      <Footer/>
    </main>
)}