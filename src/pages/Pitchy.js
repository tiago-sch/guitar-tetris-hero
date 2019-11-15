import React, { Fragment } from 'react';
import { findPitch } from 'pitchy';
import getNote from '../utils/getNote';

const Pitchy = () => {
  const pitchRef = React.createRef();
  const clarityRef = React.createRef();
  const noteRef = React.createRef();
  const buttonRef = React.createRef();

  const updatePitch = (analyserNode, sampleRate) => {
    let data = new Float32Array(analyserNode.fftSize);
    analyserNode.getFloatTimeDomainData(data);
    let [pitch, clarity] = findPitch(data, sampleRate);

    if (clarity > 0.97) {
      pitchRef.current.textContent = String(pitch);
      clarityRef.current.textContent = String(clarity);
      noteRef.current.textContent = getNote(pitch);
    }
    window.requestAnimationFrame(() => updatePitch(analyserNode, sampleRate));
  };

  const startPitchy = () => {
    const button = buttonRef.current;
    button.parentNode.removeChild(button);
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let analyserNode = audioContext.createAnalyser();

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      let sourceNode = audioContext.createMediaStreamSource(stream);
      sourceNode.connect(analyserNode);
      updatePitch(analyserNode, audioContext.sampleRate);
    });
  }

  return (
    <Fragment>
      <h1>PITCHY</h1>
      <ul>
        <li>Pitch Hz: <span ref={pitchRef} /></li>
        <li>Clarity: <span ref={clarityRef} /></li>
        <li>Note: <span ref={noteRef} /></li>
      </ul>
      <button onClick={startPitchy} ref={buttonRef}>start</button>
    </Fragment>
  );
};
export default Pitchy;