import React from 'react'
import './InfoBox.css'

function InfoBox({ info }) {
  const renderObject = (nestedInfo, parentKey = '') => {
    return Object.keys(nestedInfo).map((key) => {
      if (key === 'myId') {
        return null
      }

      const newKey = parentKey ? `${parentKey}.${key}` : key

      if (typeof nestedInfo[key] === 'object' && nestedInfo[key] !== null) {
        return renderObject(nestedInfo[key], newKey)
      }

      return (
        <div key={newKey} style={{ textAlign: 'left' }}>
          <strong>{newKey}:</strong> {nestedInfo[key]}
        </div>
      )
    })
  }

  return <div className='info-box'>{renderObject(info)}</div>
}

export default InfoBox
