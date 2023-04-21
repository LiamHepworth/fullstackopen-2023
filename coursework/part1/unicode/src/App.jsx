import { useState } from 'react'

const Button = ({handleClick, type}) => {
  return ( 
    <button onClick={() => handleClick(type)}>{type}</button>
   );
}

const DisplayFeedback = ({type, value}) => {
  return ( 
    <span>{type} {value}</span>
   );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleButtonClick(type){
    if(type === "good"){
      setGood(good + 1)
    } else if (type === "neutral"){
      setNeutral(neutral + 1)
    } else if (type === "bad"){
      setBad(bad + 1)
    }
  }

  return (
    <>
    <h1>Give Feedback</h1>
    <Button type={"good"} handleClick={handleButtonClick}></Button>
    <Button type={"neutral"} handleClick={handleButtonClick}></Button>
    <Button type={"bad"} handleClick={handleButtonClick}></Button>

    <h1>statistics</h1>
    <DisplayFeedback type={"good"} value={good}></DisplayFeedback>
    <br />
    <DisplayFeedback type={"neutral"} value={neutral}></DisplayFeedback>
    <br />
    <DisplayFeedback type={"bad"} value={bad}></DisplayFeedback>
    </>
  )
}

export default App