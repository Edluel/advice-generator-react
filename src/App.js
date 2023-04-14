import './styles/app.css';
import Search from './componentes/search/Search';
import Advice from './componentes/advice/Advice';
import { useState } from 'react';

function App() {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);

  async function randomAdvice() {

    const response = await fetch('https://api.adviceslip.com/advice');
    const random = await response.json();

    setData(random);

  }



  return (
    <div className="App">
      <Search
        setData={setData}
        setIsPending={setIsPending}
      />
      <Advice
        data={data}
        randomAdvice={randomAdvice}
        isPending={isPending}
        setIsPending={setIsPending}
      />
    </div>
  );
}

export default App;