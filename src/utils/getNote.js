import notes from '../constants/notes';
import { findKey, inRange } from 'lodash';

const getNote = ( pitchHz ) => {
  const noteLimit = .7;
  const filter = (note) => { return inRange(pitchHz, note - noteLimit, note + noteLimit) };
  return findKey(notes, filter) || '-';
}

export default getNote;