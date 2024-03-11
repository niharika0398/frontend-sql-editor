import React, { useState, useEffect, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import useSQLQueryData from "../../hooks/useSQLQueryData";
import "./style.css";
import Spinner from "../Loader";
import Pagination from "../Pagination";
import Tabs from "../Tabs";
import ColumnTable from "./ColumnTable";
import { lazy } from 'react';
import Button from "../Button";

const ResultTableCompoent = lazy(() => import('./ResultTable'));


const myTheme = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff",
    foreground: "#000",
    caret: "red",
    selection: "#8a91991a",
    selectionMatch: "red",
    lineHighlight: "#8a91991a",
    gutterBackground: "#fff",
    gutterForeground: "#D9DEEB",
  },
  styles: [{ tag: t.comment, color: "#919EAD" }],
});
const extensions = [javascript({ jsx: true })];

export default function UserInputQuery({ selectedTable ,isFocus }) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isLoading, error, refetch } = useSQLQueryData(selectedTable);

  useEffect(() => {
    if(isFocus){
      setQuery('');
    }else{
      setQuery(`select * from ${selectedTable}`);
    }
    
  }, [selectedTable,isFocus]);

  const onChange = (value) => {
    setQuery(value);
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
      <Button title="Run Query" handleClick={handleRunQuery}/>
      <CodeMirror
        className="codeMirrorSty"
        height="200px"
        width="100%"
        theme={myTheme}
        extensions={extensions}
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
