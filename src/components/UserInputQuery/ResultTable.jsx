import React, { useEffect, useState } from "react";
import Table from "../Tables";
import "./style.css";

const ResultTable = ({ data = [], currentPage, itemsPerPage }) => {
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);

    const currentPageData = data.slice(startIndex, endIndex);
    setCurrentPageData(currentPageData);
  }, [currentPage, itemsPerPage, data]);

  const tableColumn = Boolean(currentPageData.length)
    ? Object.keys(currentPageData?.[0])
    : [];

  return <Table data={currentPageData} />;
};

export default ResultTable;
