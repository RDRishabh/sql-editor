import React, { useState } from 'react';
import { exportToCSV, exportToJSON } from '../utils/sqlUtils';
import '../styles/ResultsTable.css';

const ResultsTable = ({ results, error, isLoading }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const sortedResults = React.useMemo(() => {
    if (!results) return [];

    if (sortColumn) {
      return [...results].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortDirection === 'asc' 
            ? valueA.localeCompare(valueB) 
            : valueB.localeCompare(valueA);
        } else {
          return sortDirection === 'asc' 
            ? (valueA > valueB ? 1 : -1) 
            : (valueA < valueB ? 1 : -1);
        }
      });
    }

    return results;
  }, [results, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const totalPages = results ? Math.ceil(results.length / rowsPerPage) : 0;
  const paginatedResults = sortedResults.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = results && results.length > 0 ? Object.keys(results[0]) : [];

  const handleExportCSV = () => {
    if (results) exportToCSV(results);
  };

  const handleExportJSON = () => {
    if (results) exportToJSON(results);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3 className="error-title">Error</h3>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="no-results">
        <p>No results to display. Run a query to see results here.</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h2 className="results-title">Results ({results.length} rows)</h2>
        <div className="export-buttons">
          <button className="export-btn" onClick={handleExportCSV}>
            Export CSV
          </button>
          <button className="export-btn" onClick={handleExportJSON}>
            Export JSON
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column} onClick={() => handleSort(column)} className="sortable-header">
                  <div className="header-content">
                    {column}
                    {sortColumn === column && <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedResults.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map(column => (
                  <td key={column}>
                    {row[column] !== null && row[column] !== undefined ? String(row[column]) : 'NULL'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, results.length)} of {results.length} rows
          </div>
          <div className="pagination-controls">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(page => Math.max(1, page - 1))}>
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5) {
                if (currentPage > 3 && currentPage < totalPages - 1) {
                  pageNum = i + currentPage - 2;
                } else if (currentPage >= totalPages - 1) {
                  pageNum = totalPages - 4 + i;
                }
              }

              return (
                <button key={pageNum} className={currentPage === pageNum ? 'active-page' : ''} onClick={() => setCurrentPage(pageNum)}>
                  {pageNum}
                </button>
              );
            })}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
