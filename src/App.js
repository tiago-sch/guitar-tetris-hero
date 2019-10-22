import React, { useState, useEffect } from 'react';
import "./styles/app.scss";

//getUserMedia()

const App = () => {
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    if (!loading) return;
    navigator.mediaDevices.enumerateDevices().then(
      data => {
        data.forEach( device => {
          if(device.kind === 'audioinput') {
            setInputs([...inputs, device]);
          }
          if (data.length-1 === data.indexOf(device)) setLoading(false);
        })
      }
    );
  }, [inputs, loading]);

  const renderInputs = () => {
    console.log(inputs)
    return (
      <ul>
        {
          inputs.map(input =>
            <li key={`${input.deviceId}`}>
              { input.deviceId }
            </li>
          )
        }
      </ul>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        { loading ? <p>Carregando...</p> : renderInputs()}
      </header>
    </div>
  );
}

export default App;
