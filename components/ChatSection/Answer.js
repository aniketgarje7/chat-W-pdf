import React from 'react'
import {SiAnswer} from 'react-icons/si'
const Answer = ({answer,pageNumber}) => {
  return (
    <div className='answer_main mx-md-4 py-2'>
    <span className='answer_icon_span'><SiAnswer/></span>
        <span className='answer_span'>{answer}{pageNumber && <span className='mx-md-2 page_number'>page no. :{pageNumber}</span>}</span>
        
    </div>
  )
}

export default Answer