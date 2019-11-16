import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { findPitch } from 'pitchy';
import { createStage, checkCollision } from 'utils/tetrisUtils';
import getNote from 'utils/getNote';
import { StyledTetrisWrapper, StyledTetris } from 'styles/Tetris/StyledTetris';
import { tetrisSong } from 'constants/tetrisConstants';

// Custom Hooks
import { useInterval } from 'hooks/useInterval';
import { usePlayer } from 'hooks/usePlayer';
import { useStage } from 'hooks/useStage';
import { useGameStatus } from 'hooks/useGameStatus';

// Components
import Stage from 'components/TetrisComponents/Stage';
import Display from 'components/TetrisComponents/Display';
import StartButton from 'components/TetrisComponents/StartButton';

const TetrisGame = ({ guitarMode }) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [note, setNote] = useState(null);
  const [prevNote, setPrevNote] = useState({ index: null, note: ''});
  const [nextNote, setNextNote] = useState({ index: null, note: ''});
  const [guitarStarted, setGuitarStarted] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
    if(!guitarStarted) {
      startPitchy();
    }
    setNextNote({index: 0, note: tetrisSong[0]});
    setPrevNote({index: null, note: ''});
  };

  const backOne = () => {
    if (!checkCollision(player, stage, { x: 0, y: -1 })) {
      updatePlayerPos({ x: 0, y: -1, collided: false });
    }
  }

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    if (!guitarMode) {
      drop();
    }
  }, dropTime);

  const move = (e) => {
    e.preventDefault();
    const { keyCode } = e;
    if (!gameOver) {
      if (keyCode === 37) {
        // left
        movePlayer(-1);
      } else if (keyCode === 39) {
        // right
        movePlayer(1);
      } else if (keyCode === 40) {
        // down
        guitarMode ? playerRotate(stage, -1) : dropPlayer();
      } else if (keyCode === 38) {
        // up
        playerRotate(stage, 1);
      }
    }
  };

  // Guitar Mode Functions
  const startPitchy = () => {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let analyserNode = audioContext.createAnalyser();

    setGuitarStarted(true);
    setNextNote({index: 0, note: tetrisSong[0]});
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      let sourceNode = audioContext.createMediaStreamSource(stream);
      sourceNode.connect(analyserNode);
      // updatePitch(analyserNode, audioContext.sampleRate);
      window.requestAnimationFrame(() => updatePitch(analyserNode, audioContext.sampleRate));
    });
  }

  const updatePitch = (analyserNode, sampleRate) => {
    let data = new Float32Array(analyserNode.fftSize);
    analyserNode.getFloatTimeDomainData(data);
    let [pitch, clarity] = findPitch(data, sampleRate);

    if (clarity > 0.96 && clarity < 1.0) {
      const playedNote = getNote(pitch);
      if (playedNote) {
        setNote(playedNote);
      }
    }
    window.requestAnimationFrame(() => updatePitch(analyserNode, sampleRate));
  };


  useEffect(() => {
    if (note === nextNote.note) {
      drop();
      setPrevNote(nextNote);
      const newNextIndex = nextNote.index + 1;
      console.log()
      if (newNextIndex === tetrisSong.length) {
        setNextNote({ index: 0, note: tetrisSong[0] });
      } else {
        setNextNote({ index: newNextIndex, note: tetrisSong[newNextIndex] });
      }
    } else if (![nextNote.note, prevNote.note].includes(note)) {
      backOne();
    }
  // eslint-disable-next-line
  }, [note]);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={guitarMode ? 'GUITAR MODE 🤘' : `Level: ${level}`} />
              {guitarMode &&
                <Fragment>
                  <Display text={`Note: ${note || '-'}`} />
                  <Display text={`Prev Note: ${prevNote.note}\
                    Next Note: ${nextNote.note}`} />
                </Fragment>
              }
            </div>
          )}
          <StartButton callback={startGame}>Start Game</StartButton>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
};

TetrisGame.propTypes = {
  guitarMode: PropTypes.bool
};

export default TetrisGame;