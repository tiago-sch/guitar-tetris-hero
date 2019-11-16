import notes from '../constants/notes';
import { findKey, inRange } from 'lodash';

export const getOctaveNote = ( pitchHz ) => {
  const noteLimit = .7;
  const filter = (note) => { return inRange(pitchHz, note - noteLimit, note + noteLimit) };
  return findKey(notes, filter) || null;
}

const getNote = ( pitchHz ) => {
  const octaveNote = getOctaveNote(pitchHz);
  return octaveNote ? octaveNote.substring(0, octaveNote.length - 1) : null;
};

export default getNote;