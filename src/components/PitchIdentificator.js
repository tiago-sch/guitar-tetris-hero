import React, { Fragment, useState } from 'react';
import { findPitch } from 'pitchy';
import { getOctaveNote } from 'utils/getNote';

const PitchIdentificator = () => {
  const [pitch, setPitch] = useState(null);
  const [clarity, setClarity] = useState(null);
  const [note, setNote] = useState(null);
  const [started, setStarted] = useState(false);

  const startPitchy = () => {
    setStarted(true);
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let analyserNode = audioContext.createAnalyser();

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      let sourceNode = audioContext.createMediaStreamSource(stream);
      sourceNode.connect(analyserNode);
      updatePitch(analyserNode, audioContext.sampleRate);
    });
  }

  const updatePitch = (analyserNode, sampleRate) => {
    let data = new Float32Array(analyserNode.fftSize);
    analyserNode.getFloatTimeDomainData(data);
    let [pitch, clarity] = findPitch(data, sampleRate);

    if (clarity > 0.97 && clarity < 1.0) {
      setPitch(String(pitch));
      setClarity(String(clarity));
      setNote(getOctaveNote(pitch));
    }
    window.requestAnimationFrame(() => updatePitch(analyserNode, sampleRate));
  };

  return (
    <Fragment>
      <ul>
        <li>Pitch Hz: <span>{ pitch }</span></li>
        <li>Clarity: <span>{ clarity }</span></li>
        <li>Note: <span>{ note }</span></li>
      </ul>
      { !started && <button onClick={startPitchy}>START</button> }
    </Fragment>
  )
};

export default PitchIdentificator;