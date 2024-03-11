import React, { useEffect, useState } from "react";
import ResultTable from "./components/Tables";
import Tabs from "./components/Tabs";
import UserInputQuery from "./components/UserInputQuery";
import { FILE_NAMES } from "./constants";
import "./App.css";

const App = () => {
  const [selectedTable, setSelectedTable] = useState({
    file: FILE_NAMES[0],
    active: 0,
  });

  const handleSelectFile = (name, index) => {
    setSelectedTable({ file: name, active: index });
  };

  const tabs = [
    { title: "London", content: <p>London is the capital city of England.</p> },
    { title: "Paris", content: <p>Paris is the capital of France.</p> },
    { title: "Tokyo", content: <p>Tokyo is the capital of Japan.</p> },
  ];
  return (
    <>
      <header>
        <a
          id="nav-home"
          href="https://atlan.com/?ref=/"
          aria-label="Atlan Logo"
        >
          <img
            width="80"
            height="24"
            alt="Atlan Logo"
            src="https://website-assets.atlan.com/img/atlan-blue.svg"
          />
        </a>
      </header>
      <div className="mainContainer">
        <div className="sidebar">
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
          <UserInputQuery selectedTable={selectedTable.file} />
        </div>
      </div>
      <footer></footer>
    </>
  );
};

export default App;
