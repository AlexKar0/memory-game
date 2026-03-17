import { useState } from 'react'
import './App.css'

function App() {

  const [selectedTheme, setSelectedTheme] = useState(null)
  const [selectedGrid, setSelectedGrid] = useState(null)

  return (
    <div className='Main-page'>
      <div className='page-text'>memory</div>
      <div className='main-menu'>
        <div className='theme'>
          <p className='theme-text'>Select Theme</p>
          <button
            className={`theme-btn1 ${selectedTheme === 'numbers' ? 'active' : ''}`}
            onClick={() => setSelectedTheme('numbers')}
          >
            <p>Numbers</p>
          </button>

          <button
            className={`theme-btn ${selectedTheme === 'icons' ? 'active' : ''}`}
            onClick={() => setSelectedTheme('icons')}
          >
            <p>Icons</p>
          </button>
          <div className='grid-slct'>
            <p className='grid-txt'>Grid Size</p>
            <button className={`grid-btn ${selectedGrid === '4x4' ? 'activated' : ''}`}
            onClick={() => setSelectedGrid('4x4')}>
            <p>4x4</p>
          </button>
          <button className={`grid-btn1 ${selectedGrid === '6x6' ? 'activated' : ''}`}
            onClick={() => setSelectedGrid('6x6')}>
            <p>6x6</p>
            </button>
            <div className='start-menu'>
              <button className='start-btn'><p>Start</p></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App