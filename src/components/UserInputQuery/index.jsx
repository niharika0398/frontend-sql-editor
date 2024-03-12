import React, { useState, useEffect, useMemo } from "react";
import { lazy } from "react";
import useSQLQueryData from "../../hooks/useSQLQueryData";
import Spinner from "../Loader";
import Pagination from "../Pagination";
import Tabs from "../Tabs";
import ColumnTable from "./ColumnTable";
import Button from "../Button";
import "./style.css";

const ResultTableCompoent = lazy(() => import("./ResultTable"));

export default function UserInputQuery({ selectedTable, isFocus }) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isLoading, error, refetch } = useSQLQueryData(selectedTable);

  useEffect(() => {
    if (isFocus) {
      setQuery("");
    } else {
      setQuery(`select * from ${selectedTable}`);
    }
  }, [selectedTable, isFocus]);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRunQuery = () => {
    refetch(query);
  };

  const columnsData = useMemo(() => {
    const keys = data.length > 0 ? Object.keys(data[0]) : [];
    const result = keys.map((key) => ({
      column: key,
      type: typeof data[0][key],
    }));
    return result;
  }, [data]);

  return (
    <>
      <Button title="Run Query" handleClick={handleRunQuery} />
      <textarea
        maxLength={50}
        className="textArea"
        onChange={onChange}
        value={query}
      />

      <Tabs
        tabs={[
          {
            title: `${selectedTable} Result`,
            content: isLoading ? (
              <Spinner />
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <ResultTableCompoent
                  tableName={selectedTable}
                  data={data}
                  currentPage={currentPage}
                  itemsPerPage={perPage}
                />
                {data.length > 0 && (
                  <Pagination
                    totalPages={Math.ceil(data.length / perPage)}
                    onPageChange={setCurrentPage}
                    currentPage={currentPage}
                    setPerPage={setPerPage}
                  />
                )}
              </>
            ),
          },
          { title: "Columns", content: <ColumnTable data={columnsData} /> },
        ]}
      />
    </>
  );
}
