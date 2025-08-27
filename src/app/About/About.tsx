import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col items-center p-[2rem] justify-between gap-12'>
      <p className='m-[-1.5rem] text-left self-start'>#22430735</p>
      <h1 className="text-3xl font-bold text-center flex-auto">Roshan Jayasekera: #22430735</h1>
      <p className="text-center flex-auto">
        Here is a short tutorial on how to use the tabs web app and a quick run through of the code!
      </p>
      <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="How to use Tabs" className='flex-auto h-[50rem] w-[70rem]'/>
    </div>
  )
}

export default About