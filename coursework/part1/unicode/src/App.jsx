import { useState } from 'react'

const Button = ({handleClick, type}) => {
  return ( 
    <button onClick={() => handleClick(type)}>{type}</button>
   );
}

const StatisticLine = ({statName, value}) => {
  if(value !== 0){
    return ( 
      <>
        <br />
        <span><strong>{statName}</strong>: {value}</span>
      </>
    );
  } else {
    return (
    <>
      <br />
      <span><strong>{statName}</strong>: No data</span>
    </>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  function getAverage(good, bad){
    setAverage(good + -bad / 2)
  }

  function getPercentPositive(good, neutral, bad){
    const totalValue = good + neutral + bad;
    setPositive(parseInt((100 * good) / totalValue));
  }

  function handleButtonClick(type){
    if(type === "good"){
      const updatedGood = good + 1;  //ensures state is fully up to date
      setGood(updatedGood);
      getAverage(updatedGood, bad);
      getPercentPositive(updatedGood, neutral, bad);
    } else if (type === "neutral"){
      const updatedNeutral = neutral + 1;
      setNeutral(updatedNeutral);
      getPercentPositive(good, updatedNeutral, bad);
    } else if (type === "bad"){
      const updatedBad = bad + 1;  
      setBad(updatedBad);
      getAverage(good, updatedBad);
      getPercentPositive(good, neutral, updatedBad);
    }
  }

  return (
    <>
    <h1>Give Feedback</h1>
    <Button type={"good"} handleClick={handleButtonClick}></Button>
    <Button type={"neutral"} handleClick={handleButtonClick}></Button>
    <Button type={"bad"} handleClick={handleButtonClick}></Button>

    <br />
    <StatisticLine statName={"good"} value={good}/>
    <StatisticLine statName={"neutral"} value={neutral}/>
    <StatisticLine statName={"bad"} value={bad}/>
    <br />
    <StatisticLine statName={"average"} value={average}/>
    <StatisticLine statName={"positive"} value={positive}/>
    </>
  )
}

export default App