import "./ResponsiveTable.css";

export default function ResponsiveTable({
  headers = [],
  data = [],
  striped = true,
  hover = true,
  bordered = true,
  responsive = true,
  className = "",
  onRowClick = null,
}) {
  return (
    <div className={`responsive-table-wrapper ${responsive ? "responsive" : ""}`}>
      <table
        className={`responsive-table 
          ${striped ? "striped" : ""} 
          ${hover ? "hover" : ""} 
          ${bordered ? "bordered" : ""} 
          ${className}`}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={`th-${header.key}`}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? "clickable" : ""}
              >
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className={`td-${header.key}`}
                    data-label={header.label}
                  >
                    {header.render ? header.render(row[header.key], row) : row[header.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="empty-row">
              <td colSpan={headers.length} className="empty-message">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
