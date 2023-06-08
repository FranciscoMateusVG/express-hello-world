import './App.css'
import { useEffect, useState } from 'react'
import InfoBox from './components/InfoBox'

function App() {
  const [messages, setMessages] = useState([])
  const [filter, setFilter] = useState('')
  const [info, setInfo] = useState({})

  useEffect(() => {
    // const ws = new WebSocket('ws://localhost:3001')
    const ws = new WebSocket('wss://segment-qa.onrender.com')
    ws.onmessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data])
    }

    // Clean up the effect by closing the WebSocket connection when the component unmounts
    return () => ws.close()
  }, [])

  const onClickHandler = (index) => {
    const findMessage = messages.filter((message) =>
      message.toLowerCase().includes(index)
    )
    setInfo(JSON.parse(findMessage[0]))
  }

  return (
    <div className='app'>
      <InfoBox info={info} />
      <input
        type='text'
        className='message-filter'
        placeholder='Filter messages'
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
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
    </div>
  )
}

export default App
