import React, { useState } from 'react';
import "./style.css";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className='tabs' role="tablist">
        {tabs.map((tab, index) => (
          <div role="tab"
            key={index}
            className={`tab ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            aria-labelledby={`tab-${index + 1}`}
          >
            {index === activeTab && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
