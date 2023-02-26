/* eslint-disable max-len */
import React, { useState } from 'react';

const useRecord = (init) => {
  const [current, setCurrent] = useState([init]);
  const [index, setIndex] = useState(0);
 

  const record = (value) => {
    setCurrent(prevState => [...prevState.slice(0, index + 1), value, ...prevState.slice(index + 1)]);
    setIndex(prevState => prevState + 1);
  };

  const undo = () => {
    setIndex(prevState => prevState - 1);
    
    
  };
  const redo = () => {
    setIndex(prevState => prevState + 1);
    
  };
  console.log(current);
  return { current, undo, redo, record, index };
};
function App() {
  const { current, undo, redo, record, index } = useRecord('#FF0000');
  return (
    <>
      <button onClick={undo} disabled={index === 0}>undo</button>
      <button onClick={redo} disabled={index === current.length - 1}>redo</button>
      
      <input id="color-input"type="color" value={current[index]} onChange={({ target }) => record(target.value)} role="color" aria-label="color-input"/>

      <div data-testid="display" style={{ backgroundColor: current[index], width: '10rem', height: '10rem' }}></div>
    </>
  );
}

export default App;
