import React from 'react';
import {BsPersonFill} from 'react-icons/bs';

const Question = ({question}) => {
  return (
    <div className='mx-md-4 text-end py-2'>
        <div className='question_main'>
            <span className='question_span'>{question}</span>
            <span className='question_icon_span'><BsPersonFill/></span>
        </div>
    </div>
  )
}

export default Question