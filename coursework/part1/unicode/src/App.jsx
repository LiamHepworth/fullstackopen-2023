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

const DisplayStats = ({average, positive}) => {
  return ( 
    <>
      <span> average: {average} </span> 
      {/* <br />
      <span>positive: {positive} </span> */}
    </>
  );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  function getAverage(good, bad){
    console.log(good, bad)
    setAverage(good + -bad / 2)
  }

  function getPercentPositive(){
    let totalValue = good + neutral + bad;
    setPositive((100 * good) / totalValue);
  }

  function handleButtonClick(type){
    if(type === "good"){
      const updatedGood = good + 1  //ensures state is fully up to date
      setGood(updatedGood)
      getAverage(updatedGood, bad)
    } else if (type === "neutral"){
      setNeutral(neutral + 1)
    } else if (type === "bad"){
      const updatedBad = bad + 1  //ensures state is fully up to date
      setBad(updatedBad)
      getAverage(good, updatedBad)
    }
    getPercentPositive();
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
    <br />
    <DisplayStats average={average} positive={positive}></DisplayStats>
    </>
  )
}

export default App