import logo from "./logo.svg";
import "./App.css";
import { LOG_OUT, SUCCESS_LOGOUT } from "./utils/constants";
import { useEffect } from "react";
const { ipcRenderer, shell } = window.require("electron");

function App() {
  useEffect(() => {
    ipcRenderer.on(LOG_OUT, (e, message) => {
      ipcRenderer.send(SUCCESS_LOGOUT, "Success");
    });
  }, []);

  const handleClick = () => {
    shell.openPath("E:");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleClick}>Open</button>
      </header>
    </div>
  );
}

export default App;
