import './App.css'
import { useEffect, useState } from 'react'
import InfoBox from './components/infoBox/InfoBox'
import MessageContainer from './components/MessageContainer/MessageContainer'

function App() {
  const [messages, setMessages] = useState([])
  const [filter, setFilter] = useState('')
  const [info, setInfo] = useState({})

  useEffect(() => {
    // const ws = new WebSocket('ws://localhost:3001')
    const ws = new WebSocket('wss://segment-qa.onrender.com')
    console.log('ws', ws)
    console.log('connected!')
    ws.onmessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data])
    }

    // Clean up the effect by closing the WebSocket connection when the component unmounts
    return () => {
      console.log('disconnected!')
      ws.close()
    }
  }, [])

  return (
    <div className='app'>
      <input
        type='text'
        className='input-filter'
        placeholder='Filter messages'
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <div style={{ display: 'flex', gap: '40px' }}>
        <MessageContainer
          messages={messages}
          filter={filter}
          setInfo={setInfo}
        />
        <InfoBox info={info} />
      </div>
    </div>
  )
}

export default App
