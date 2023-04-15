import React, { useEffect, useState } from 'react'
import deskDivider from '../../assets/images/pattern-divider-desktop.svg'
import iconDice from '../../assets/images/icon-dice.svg'

export default function Advice(props) {
  const {data, randomAdvice, isPending, setIsPending} = props;
  const [adviceData, setAdviceData] = useState();
  

  useEffect(()=>{
    randomAdvice();
  }, []);

  useEffect(() => {
    if (data) {
      setIsPending(false);
    }
    

  }, [data]);

  const handleClick = () => {
    setIsPending(true);
    randomAdvice();
  }

  return (
    <div className="advice">
      {isPending && <div>Loading...</div>}
      {!isPending && data.slip && <div>
        <div className="advice-header">
          <h1>Advice #{data.slip.id}</h1>
        </div>
        <div className="advice-content">
          <p>{data.slip.advice}</p>
        </div>
        <div className="advice-divider">
          <img src={deskDivider} alt="pattern divider" />
        </div>
        <div className="advice-dice" onClick={handleClick}>
          <img src={iconDice} alt="dice icon" />
        </div>
            
      </div>}
      {!isPending && data.message && <div>
        <h2>{data.message.text}</h2>  
      </div>}
    </div>
  )
}
