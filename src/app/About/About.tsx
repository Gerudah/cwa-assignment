import React from 'react'
import style from './About.module.css'

const About = () => {
  return (
    <div
      className={style.card}
    >
      <p className='m-[-1.5rem] text-left self-start bg-transparent'>#22430735</p>
      <h1 className="text-3xl font-bold text-center flex-none drop-shadow-none">Roshan Jayasekera: #22430735</h1>
      <p className="text-center flex-none drop-shadow-none">
        Here is a short tutorial on how to use the tabs web app and a quick run through of the code!
      </p>
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="How to use Tabs"
        className="flex basis-[45rem] grow"
      />
    </div>
  )
}

export default About