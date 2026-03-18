import { useEffect, useState, useRef } from "react";
import Mainmenu from "./components/Mainmenu";
import "./App.css";
import MemoryButton from "./components/Memorybuttons";

function App() {
  const [GameStarted, setGameStarted] = useState(false);
  const [Array, setArray] = useState([]);
  const [flippedi, setFlippedi] = useState([]);
  const [flippedel, setFlippedel] = useState([]);
  const [matched, setMatched] = useState([]);
  const [ActiveButtonsTheme, setActiveButtonsTheme] = useState(["Numbers"]);
  const [GridSizeBtns, setGridSizeBtns] = useState(["4x4"]);
  const [ComponentSize, setComponentSize] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [showVictoryWindow, setShowVictoryWindow] = useState(false);
  const timeoutRef = useRef(null);
  const gameTimerRef = useRef(null);
  const gameStartTimeRef = useRef(null);

  const RefreshVariables = () => {
    setFlippedi([]); // Reset the flipped indices
    setFlippedel([]); // Reset the flipped elements
    setMatched([]); // Reset the matched elements
    setMoveCount(0); // Reset the move count
    setGameTime(0); 
    setShowVictoryWindow(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any pending timeouts
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current); // Clear the game timer interval
    }
    if (isMenuOpen) {
      toggleMenu(); 
    }
  };

  const initializeGame = () => {
    RefreshVariables();

    if (GridSizeBtns[0] == "4x4") {
      const initialArray = [1, 2, 3, 4, 5, 6, 7, 8];
      setComponentSize("40px");
      if (ActiveButtonsTheme[0] == "Numbers") {
        setArray(shuffle([...initialArray, ...initialArray]));
      } else if (ActiveButtonsTheme[0] == "Icons") {
        const iconsArray = initialArray.map((el) => `${el}.png`);
        setArray(shuffle([...iconsArray, ...iconsArray]));
      }
    } else if (GridSizeBtns[0] == "6x6") {
      const initialArray = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
      ];
      setComponentSize("24px");
      if (ActiveButtonsTheme[0] == "Numbers") {
        setArray(shuffle([...initialArray, ...initialArray])); // duplicates the array so each number appears twice, making pairs for the memory game
      } else if (ActiveButtonsTheme[0] == "Icons") {
        const iconsArray = initialArray.map((el) => `${el}.png`); // creates an array of strings representing the file names of the icons, assuming they are named "1.png", "2.png", etc.
        setArray(shuffle([...iconsArray, ...iconsArray]));
      }
    }

    gameStartTimeRef.current = Date.now();
    gameTimerRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor(
        (Date.now() - gameStartTimeRef.current) / 1000, // calculates the elapsed time in seconds by finding the difference between the current time and the game start time, then dividing by 1000 to convert from milliseconds to seconds
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
      console.log("Stated");
    }
  }, [GameStarted]);

  useEffect(() => {
    console.log(Array);
  }, [Array]);

  useEffect(() => {
    if (flippedel.length === 2 && flippedel[0] === flippedel[1]) {
      const newMatchedel = [...matched, flippedel[0], flippedel[1]];
      setMatched(newMatchedel);

      if (newMatchedel.length === Array.length) {
        setTimeout(() => {
          if (gameTimerRef.current) {
            clearInterval(gameTimerRef.current);
          }
          setShowVictoryWindow(true);
        }, 1.4 * 1000);
      }
    }

    if (flippedel.length > 2) {
      setFlippedel(flippedel.slice(2));
    }
  }, [flippedel]);

  useEffect(() => {
    if (flippedi.length == 2) {
      timeoutRef.current = setTimeout(() => {
        setFlippedi(flippedi.slice(2));
        setFlippedel(flippedel.slice(2));
      }, 1000);
    } else if (flippedi.length > 2) {
      setFlippedi(flippedi.slice(2));
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [flippedi]);

  const shuffle = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
      let random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
  };

  const handleClick = (index, el) => {
    if (flippedi.includes(index)) return;

    const newFlippedi = [...flippedi, index];
    const newFlippedel = [...flippedel, el];

    setFlippedel(newFlippedel);
    setFlippedi(newFlippedi);

    if (flippedi.length % 2 === 0) {
      setMoveCount(moveCount + 1);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    console.log(ActiveButtonsTheme);
  }, [ActiveButtonsTheme]);

  const toggleActiveTheme = (e, Array, setArray) => {
    if (Array.length == 0) {
      setArray([e.target.id]);
    } else if (Array.length > 0) {
      setArray(Array.slice(1));
      setArray([e.target.id]);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <main
      style={{ background: !GameStarted ? "var(--black)" : "var(--White)" }}
    >
      {!GameStarted ? (
        <Mainmenu
          setGameStarted={setGameStarted}
          ActiveButtonsTheme={ActiveButtonsTheme}
          setActiveButtonsTheme={setActiveButtonsTheme}
          GridSizeBtns={GridSizeBtns}
          setGridSizeBtns={setGridSizeBtns}
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
          {isMenuOpen && (
            <div className="menu-positioner">
              <div className="menu-container">
                <button
                  className="Restart w-full bg-yellow-500 text-white py-3 rounded-[26px]"
                  onClick={initializeGame}
                >
                  Restart
                </button>
                <button
                  className="NewGame w-full bg-gray-200 text-gray-800 py-3 rounded-[26px]"
                  onClick={newGame}
                >
                  New Game
                </button>
                <button
                  onClick={toggleMenu}
                  className="NewGame w-full bg-gray-200 text-gray-800 py-3 rounded-[26px]"
                >
                  Resume Game
                </button>
              </div>
            </div>
          )}

          {showVictoryWindow && (
            <div className="menu-positioner fixed inset-0 flex items-center justify-center z-50">
              <div className="menu-container bg-white flex flex-col items-center">
                <div className="textBox">
                  <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    You did it!
                  </h2>
                  <p>Game over! Here's how you got on...</p>
                </div>

                <div className="StatsContainer">
                  <div>
                    <p>Time Elapsed</p>
                    <span>{formatTime(gameTime)}</span>
                  </div>

                  <div>
                    <p>Moves Taken</p>
                    <span>{moveCount} Moves</span>
                  </div>
                </div>

                <div className="EndBtnBox flex w-full gap-4">
                  <button
                    className="Restart flex-1 bg-orange-500 text-white py-3 rounded-[26px] font-bold"
                    onClick={initializeGame}
                  >
                    Restart
                  </button>
                  <button
                    className="NewGame flex-1 bg-gray-200 text-gray-800 py-3 rounded-[26px] font-bold"
                    onClick={newGame}
                  >
                    Setup New Game
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default App;
