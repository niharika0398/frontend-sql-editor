import React from "react";
import "./style.css";

const Table = ({ data = [] }) => {
  const tableColumn = Boolean(data.length) ? Object.keys(data?.[0]) : [];

  return (
    <div className="tableWrapper">
      <div className="tableData">
        <table className="tableContent">
          <thead>
            <tr>
              {/* Render table headers */}
              {tableColumn?.map((columnName, index) => {
                return <th key={index}>{columnName}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {/* Render table rows */}
            {data?.map((row, index) => {
              return (
                <tr key={index}>
                  {/* Render table cells */}
                  {tableColumn.map((columnName, columnIndex) => {
                    return <td key={columnIndex}>{row[columnName]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
