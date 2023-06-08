import React from 'react'
import './MessageContainer.css'

function MessageContainer({ messages, filter, setInfo }) {
  const onClickHandler = (index) => {
    const findMessage = messages.filter((message) =>
      message.toLowerCase().includes(index)
    )
    setInfo(JSON.parse(findMessage[0]))
  }

  return (
    <div className='message-container'>
      {messages
        .filter((message) =>
          message.toLowerCase().includes(filter.toLowerCase())
        )
        .map((message) => {
          const parsedMessage = JSON.parse(message)

          return (
            <div
              key={parsedMessage.myId}
              onClick={() => onClickHandler(parsedMessage.myId)}
              className='message-bubble'
            >
              {parsedMessage.event}
            </div>
          )
        })}
    </div>
  )
}

export default MessageContainer
