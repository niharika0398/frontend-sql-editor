/**
 * Parses CSV text into an array of objects, where each object represents a row in the CSV data.
 * @param {string} csvText - The CSV text to parse.
 * @param {string} [rowDelimiter='\n'] - The delimiter used to separate rows in the CSV text.
 * @param {string} [entryDelimiter=','] - The delimiter used to separate entries within each row of the CSV text.
 * @returns {Object[]} An array of objects, where each object represents a row in the CSV data.
 */
export const parseCSV = (
  csvText,
  rowDelimiter = "\n",
  entryDelimiter = ","
) => {
  const lines = csvText.split(rowDelimiter);

  const headers = lines[0].split(entryDelimiter);

  const parsedRows = [];

  for (let i = 1; i < lines.length; i++) {
    const entries = lines[i].split(entryDelimiter);

    const rowObject = {};

    for (let j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = entries[j] || null;
    }

    parsedRows.push(rowObject);
  }

  return parsedRows;
};
