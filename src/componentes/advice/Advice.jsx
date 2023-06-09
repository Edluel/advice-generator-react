import React, { useEffect, useState } from 'react'
import deskDivider from '../../assets/images/pattern-divider-desktop.svg'
import mobileDivider from '../../assets/images/pattern-divider-mobile.svg'
import iconDice from '../../assets/images/icon-dice.svg'
import backIcon from '../../assets/images/left.png'
import nextIcon from '../../assets/images/right.png'

export default function Advice(props) {
  const {data, randomAdvice, isPending, setIsPending} = props;
  const [adviceData, setAdviceData] = useState(null);
  const [index, setIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState();


  useEffect(()=>{
    randomAdvice();
  }, []);

  useEffect(() => {
    if (data) {
      if (data.slip || data.slips){
        setAdviceData(data.slip ? data.slip : data.slips[index]);
        setIndex(0)
      }
      setIsPending(false);
    }

    setWindowWidth(document.documentElement.clientWidth);

    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

  }, [data]);

  const handleClick = () => {
    setIsPending(true);
    randomAdvice();
  }

  const handleBack = () => {
    setIndex(index-1);
    setAdviceData(data.slips[index-1]);
  }

  const handleNext = () => {
    setIndex(index+1);
    setAdviceData(data.slips[index+1]);
  }

  return (
    <div className="advice">
      {isPending && <div>Loading...</div>}

      {!isPending && (data.slip || data.slips) && <div>  
        <div className="advice-header">
          <h1>Advice #{adviceData.id}</h1>
        </div>
        <div className="advice-content">
          <p>{adviceData.advice}</p>
        </div>
        <div className="advice-divider">
          <img src={windowWidth < 768 ? mobileDivider : deskDivider} alt="pattern divider" />
        </div>

        <div className="advice-navigation">        
          {data.slips && index > 0 &&
            <div className='advice-navigation-prev' onClick={handleBack} >                   
              <img src={backIcon} alt='previous-icon' style={{height: '20px'}}/>
            </div>
          }
          <div className="advice-navigation-dice" onClick={handleClick}>
            <img src={iconDice} alt="dice icon" />
          </div>
          {data.slips && index < data.total_results -1 &&
            <div className='advice-navigation-next' onClick={handleNext}>
              <img src={nextIcon} alt="next-icon"  style={{height: '20px'}}/>
            </div>
          }
        </div>
        
      </div>}
      
      {!isPending && data.message && <div className='advice-message'>
        <h2>{data.message.text}</h2>
        <div className="advice-divider">
          <img src={windowWidth < 768 ? mobileDivider : deskDivider} alt="pattern divider" />
        </div>
        <div className="advice-navigation">        
          <div className="advice-navigation-dice" onClick={handleClick}>
            <img src={iconDice} alt="dice icon" />
          </div>
        </div>
      </div>}

    </div>
  )
}
