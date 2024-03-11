export function extractColumns(query) {
  const parts = query.split("select")[1].split("from");
  
  const columnNames = parts[0].trim();

  const columns = columnNames.split(",");

  const cleanedColumns = columns.map((column) => column.trim()).filter(Boolean);

  return cleanedColumns;
}
