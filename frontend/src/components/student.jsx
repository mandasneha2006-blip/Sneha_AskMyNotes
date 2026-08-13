import { useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const [marks, setMarks] = useState('')
  const [resultData, setResultData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await fetch('http://127.0.0.1:8000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        marks: parseInt(marks),
      }),
    })

    const data = await response.json()
    setResultData(data)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Grade Calculator</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Student Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <br /><br />
        <input 
          type="number" 
          placeholder="Marks" 
          value={marks} 
          onChange={(e) => setMarks(e.target.value)} 
        />
        <br /><br />
        <button type="submit">Calculate</button>
      </form>

      {resultData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Results:</h3>
          <p>Name: {resultData.name}</p>
          <p>Grade: {resultData.grade}</p>
          <p>Status: {resultData.result}</p>
        </div>
      )}
    </div>
  )
}

export default App