import React, { useState, useEffect } from 'react';
import { exportToCSV, exportToJSON } from '../utils/sqlUtils';
import '../styles/ResultsTable.css';

const ResultsTable = ({ results, error, isLoading }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null); // Now allows null to remove sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Dynamic rows per page

  // Reset pagination when results or rowsPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [results, rowsPerPage]);

  // Filter out rows where all columns are null or undefined
  const filteredResults = results?.filter(row => 
    Object.values(row).some(value => value !== null && value !== undefined && value !== '')
  ) || [];
  
  const sortedResults = React.useMemo(() => {
    if (!filteredResults.length) return [];

    if (sortColumn && sortDirection) {
      return [...filteredResults].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
    
        // Handle empty or null values by treating them as greater than other values
        if (valueA === null || valueA === undefined || valueA === '') return 1;
        if (valueB === null || valueB === undefined || valueB === '') return -1;
    
        // Perform comparison for non-empty values
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

    return filteredResults;
  }, [filteredResults, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null); // Remove sorting on the third click
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const totalPages = Math.ceil(sortedResults.length / rowsPerPage);
  const paginatedResults = sortedResults.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = filteredResults.length > 0 ? Object.keys(filteredResults[0]) : [];

  const handleExportCSV = () => {
    if (filteredResults) exportToCSV(filteredResults);
  };

  const handleExportJSON = () => {
    if (filteredResults) exportToJSON(filteredResults);
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

  if (!filteredResults.length) {
    return (
      <div className="no-results">
        <p>No results to display. Run a query to see results here.</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h2 className="results-title">Results ({filteredResults.length} rows)</h2>
        <div className="header-controls">
          <div className="rows-dropdown">
            <label htmlFor="rowsPerPage">Rows per page:</label>
            <select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="export-buttons">
            <button className="export-btn" onClick={handleExportCSV}>
              Export CSV
            </button>
            <button className="export-btn" onClick={handleExportJSON}>
              Export JSON
            </button>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column} onClick={() => handleSort(column)} className="sortable-header">
                  <div className="header-content">
                    <span>{column}</span>
                    <span className="sort-indicator">
                      {sortColumn === column ? 
                        (sortDirection === 'asc' ? '↑' : '↓') : 
                        '\u00A0' /* Non-breaking space to preserve width */}
                    </span>
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
                    {row[column] !== null && row[column] !== undefined ? String(row[column]) : ''}
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
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredResults.length)} of {filteredResults.length} rows
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