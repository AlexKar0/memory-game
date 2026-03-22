import { useEffect, useState, useRef } from "react";
import Mainmenu from "./components/Mainmenu";
import "./App.css";
import MemoryButton from "./components/MemoryButtons";

import icon1 from "./components/images/1.png";
import icon2 from "./components/images/2.png";
import icon3 from "./components/images/3.png";
import icon4 from "./components/images/4.png";
import icon5 from "./components/images/5.png";
import icon6 from "./components/images/6.png";
import icon7 from "./components/images/7.png";
import icon8 from "./components/images/8.png";
import icon9 from "./components/images/9.png";
import icon10 from "./components/images/10.png";

const icons = [
  icon1, icon2, icon3, icon4, icon5,
  icon6, icon7, icon8, icon9, icon10
];

function App() {
  const [Array, setArray] = useState([]);
  const [GameStarted, setGameStarted] = useState(false);
  const [ActiveButtonsTheme, setActiveButtonsTheme] = useState(["Numbers"]);
  const [flippedi, setFlippedi] = useState([]);
  const [flippedel, setFlippedel] = useState([]);
  const [matched, setMatched] = useState([]);
  const [GridSizeBtns, setGridSizeBtns] = useState(["4x4"]);
  const [ComponentSize, setComponentSize] = useState(null);
  const [gameTime, setGameTime] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [showVictoryWindow, setShowVictoryWindow] = useState(false);

  const timeoutRef = useRef(null);
  const gameTimerRef = useRef(null);
  const gameStartTimeRef = useRef(null);

  const RefreshVariables = () => {
    setFlippedi([]);
    setFlippedel([]);
    setMatched([]);
    setMoveCount(0);
    setGameTime(0);
    setShowVictoryWindow(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);

    if (isMenuOpen) toggleMenu();
  };

  const initializeGame = () => {
    RefreshVariables();

    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }

    let initialArray = [];

    if (GridSizeBtns[0] === "4x4") {
      initialArray = [1, 2, 3, 4, 5, 6, 7, 8];
      setComponentSize("40px");
    } else {
      initialArray = [
        1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18
      ];
      setComponentSize("24px");
    }


    if (ActiveButtonsTheme[0] === "Numbers") {
      setArray(shuffle([...initialArray, ...initialArray]));
    }


    if (ActiveButtonsTheme[0] === "Icons") {
      const shuffledIcons = shuffle([...icons]);
      const selectedIcons = shuffledIcons.slice(0, initialArray.length);
      setArray(shuffle([...selectedIcons, ...selectedIcons]));
    }

    // ⏱️ TIMER
    gameStartTimeRef.current = Date.now();

    gameTimerRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor(
        (Date.now() - gameStartTimeRef.current) / 1000
      );
      setGameTime(elapsedSeconds);
    }, 1000);
  };

  const newGame = () => {
    setGameStarted(false);
    RefreshVariables();
  };

  useEffect(() => {
    if (GameStarted) {
      initializeGame();
    }
  }, [GameStarted]);

  useEffect(() => {
    if (flippedel.length === 2 && flippedel[0] === flippedel[1]) {
      const newMatched = [...matched, flippedel[0], flippedel[1]];
      setMatched(newMatched);

      if (newMatched.length === Array.length) {
        setTimeout(() => {
          if (gameTimerRef.current) clearInterval(gameTimerRef.current);
          setShowVictoryWindow(true);
        }, 1400);
      }
    }

    if (flippedel.length > 2) {
      setFlippedel(flippedel.slice(2));
    }
  }, [flippedel]);

  useEffect(() => {
    if (flippedi.length === 2) {
      timeoutRef.current = setTimeout(() => {
        setFlippedi(flippedi.slice(2));
        setFlippedel(flippedel.slice(2));
      }, 1000);
    }
  }, [flippedi]);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
  };

  const handleClick = (index, el) => {

  if (flippedi.length === 2) return;


  if (flippedi.includes(index)) return;

  const newFlippedi = [...flippedi, index];
  const newFlippedel = [...flippedel, el];

  setFlippedel(newFlippedel);
  setFlippedi(newFlippedi);

  if (newFlippedi.length === 2) {
    setMoveCount(prev => prev + 1);
  }
}

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <main>
      {!GameStarted ? (
        <Mainmenu
          setGameStarted={setGameStarted}
          ActiveButtonsTheme={ActiveButtonsTheme}
          GridSizeBtns={GridSizeBtns}
          setGridSizeBtns={setGridSizeBtns}
          setActiveButtonsTheme={setActiveButtonsTheme}
        />
      ) : (
        <>
          <div className="header">
            <h1 className="headname">memory</h1>
            <div className="ButtonBox">
              <button className="Restart" onClick={initializeGame}>
                Restart
              </button>
              <button className="NewGame" onClick={newGame}>
                New Game
              </button>
            </div>
            <button className="menu" onClick={toggleMenu}>
              Menu
            </button>
          </div>

          <div
            className="game"
            style={{
              gridTemplateColumns: `repeat(${GridSizeBtns[0].charAt(0)}, 1fr)`,
              gridTemplateRows: `repeat(${GridSizeBtns[0].charAt(0)}, 1fr)`,
            }}
          >
            {Array.map((el, i) => (
              <MemoryButton
                key={i}
                value={el}
                ComponentSize={ComponentSize}
                isActive={flippedi.includes(i)}
                isMatched={matched.includes(el)}
                onClick={() => handleClick(i, el)}
              />
            ))}
          </div>

          <div className="InfoBox">
            <div className="Time">
              <h1>Time</h1>
              <span>{formatTime(gameTime)}</span>
            </div>
            <div className="MoveCount">
              <h1>Move Count</h1>
              <span>{moveCount}</span>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default App;