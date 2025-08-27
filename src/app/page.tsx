'use client'

import React, {useState} from 'react'
import Header from "./components/Header/Header"
import About from './About/About'
import WorkInProgress from './WIP/WorkInProgress'

export default function Home() {

  const [isSelected, setSelected] = useState<string>('about')
  function renderPage(){
    switch(isSelected){
      case 'tabs':
        return <WorkInProgress/>;
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
      {renderPage()}
    </main>
)}