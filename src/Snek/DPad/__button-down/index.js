import React from 'react'
import './index.css'

export default function ButtonDown (props) {
  return (
    <div id = 'down' className = {'d-pad__button-down button'+ (props.button === 'down'? ' button_pressed' : '')}></div>
  );
}