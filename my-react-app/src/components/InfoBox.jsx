import React from 'react'
import './InfoBox.css'

function InfoBox({ info }) {
  return (
    <div className='info-box'>
      {Object.keys(info)
        .filter((key) => key !== 'myId') // exclude 'myId'
        .map((key) => (
          <div key={key}>
            <strong>{key}:</strong> {info[key]}
          </div>
        ))}
    </div>
  )
}

export default InfoBox
