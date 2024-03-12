import React, { useState, useEffect, useCallback } from "react";
import { FILE_NAMES } from "../constants";
import { extractColumns } from "../helpers/extractColumnNames";
import { parseCSV } from "../helpers/parseCSV";

const useSQLQueryData = (fileName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeOfRequest, setTimeOfRequest] = useState(0);

  const apiUrl = `https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${fileName}.csv?ref=master`;

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      const parsedData = parseCSV(atob(responseData.content));
      return parsedData;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      if (FILE_NAMES.includes(fileName)) {
        setIsLoading(true);
        const startTime = new Date().getTime();
        try {
          const newData = await fetchData(apiUrl);
          setData(newData);
          setTimeOfRequest(new Date().getTime() - startTime);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
          setError("");
        }
      } else {
        setIsLoading(false);
        setError(`${fileName} name not found`);
      }
    };

    fetchDataIfNeeded();
  }, [fileName]);

  const handleRefetch = useCallback(async (query = "") => {
    setIsLoading(true);
    setError("");
    try {
      const newData = await fetchData(apiUrl);
      if(query.includes('*')){
        setData(newData);
      }
      else if (query !== "") {
        const filteredColumnNames = extractColumns(query);
        const columns = Object.keys(newData[0]);
        for (let i = 0; i < filteredColumnNames.length; i++) {
          const col = filteredColumnNames[i];
          if (!columns.includes(col)) {
            setError(`Error: No such column exists: ${col}`);
            setIsLoading(false);
            return;
          }
        }
        const filteredData = newData.map((item) => {
          const filteredItem = {};
          Object.keys(item).forEach((key) => {
            if (filteredColumnNames.includes(key)) {
              filteredItem[key] = item[key];
            }
          });
          return filteredItem;
        });
        setData(filteredData);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  return { error, isLoading, data, timeOfRequest, refetch: handleRefetch };
};

export default useSQLQueryData;
