'use client'

import React, {useState} from 'react'
import Header from "./components/Header/Header"
import About from './About/About'
import WorkInProgress from './WIP/WorkInProgress'
import Tabs from './Tabs/Tabs'
import EscapeRoom from './Escape/EscapeRooom'
import Footer from './components/Footer/Footer'


export default function Home() {

  const [isSelected, setSelected] = useState<string>('about') // set/store name of page to be rendered
  function renderPage(){
    switch(isSelected){
      case 'tabs':
        return <Tabs/>;
      case 'pre-lab':
        return <WorkInProgress/>;
      case 'escape':
        return <EscapeRoom/>;
      case 'races':
        return <WorkInProgress/>;
      case 'about':
        return <About/>
      default:
        return <About/> //default load the about page
    }
  }

  return ( //Pass Page selection down to Navbar through Header, render to client
    <main> 
      <Header setSelected={setSelected}/>  
      <div className='page-container'>
        {renderPage()}
      </div>
      <Footer/>
    </main>
)}