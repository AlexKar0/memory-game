import "./Mainmenu.css";

function Mainmenu({
  setGameStarted,
  ActiveButtonsTheme,
  setActiveButtonsTheme,
  GridSizeBtns,
  setGridSizeBtns,
}) {
  return (
    <div className="Main-page">
      <div className="page-text">memory</div>
      <div className="main-menu">
        <div className="theme">
          <p className="theme-text">Select Theme</p>

          <button
            className={`theme-btn1 ${ActiveButtonsTheme.includes("Numbers") ? "active" : ""}`}
            onClick={() => setActiveButtonsTheme(["Numbers"])}
          >
            <p>Numbers</p>
          </button>

          <button
            className={`theme-btn ${ActiveButtonsTheme.includes("Icons") ? "active" : ""}`}
            onClick={() => setActiveButtonsTheme(["Icons"])}
          >
            <p>Icons</p>
          </button>

          <div className="grid-slct">
            <p className="grid-txt">Grid Size</p>

            <button
              className={`grid-btn ${GridSizeBtns.includes("4x4") ? "activated" : ""}`}
              onClick={() => setGridSizeBtns(["4x4"])}
            >
              <p>4x4</p>
            </button>

            <button
              className={`grid-btn1 ${GridSizeBtns.includes("6x6") ? "activated" : ""}`}
              onClick={() => setGridSizeBtns(["6x6"])}
            >
              <p>6x6</p>
            </button>

            <div className="start-menu">
              <button
                className="start-btn"
                onClick={() => setGameStarted(true)}
              >
                <p>Start</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainmenu;
