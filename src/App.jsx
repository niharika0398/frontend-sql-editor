import React, { useState } from "react";
import UserInputQuery from "./components/UserInputQuery";
import { FILE_NAMES } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button";
import "./App.css";


const App = () => {
  const [selectedTable, setSelectedTable] = useState({
    file: FILE_NAMES[0],
    active: 0,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserFocus,setUserFocus] = useState(false);

  const handleSelectFile = (name, index) => {
    setSelectedTable({ file: name, active: index });
    setUserFocus(false);
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewQuery = () => {
    setUserFocus(!isUserFocus);
  }

  return (
    <>
      <header>
        <div className="navbar">
          <div className="navbar-menu-icon" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <FontAwesomeIcon icon={faXmark} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </div>
          <div className="navbar-logo">
            <a href="#" aria-label="Atlan Logo">
              <img
                width="80"
                height="24"
                alt="Atlan Logo"
                src="https://website-assets.atlan.com/img/atlan-blue.svg"
              />
            </a>
          </div>
          <div className="new-query-btn">
          <Button title="New Query" handleClick={handleNewQuery}/>
          </div>
        </div>
      </header>
      <div className="mainContainer">
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <h3>Available Tables</h3>
          <ul>
            {FILE_NAMES.map((fileName, index) => (
              <li
                key={`${fileName}_${index}`}
                className={`fileName ${
                  index === selectedTable.active ? "active" : ""
                }`}
                onClick={() => handleSelectFile(fileName, index)}
              >
                {fileName}
              </li>
            ))}
          </ul>
        </div>

        <div className="queryContent">
          <UserInputQuery selectedTable={selectedTable.file} isFocus={isUserFocus}/>
        </div>
      </div>
      <footer></footer>
    </>
  );
};

export default App;
