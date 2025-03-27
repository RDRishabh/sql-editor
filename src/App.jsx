import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import * as Tooltip from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import QueryEditor from "./components/QueryEditor";
import ResultsTable from "./components/ResultsTable";
import PresetQueries from "./components/PresetQueries";
import { initializeDatabase, executeQuery } from "./utils/sqlUtils";
import "./App.css";

const queryClient = new QueryClient();

const Index = () => {
  const [query, setQuery] = useState("SELECT * FROM products");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const handleRunQuery = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        const result = executeQuery(query);
        if (result.success) {
          setResults(result.data);
          setError(null);
        } else {
          setResults(null);
          setError(result.error);
        }
      } catch (err) {
        setResults(null);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleSelectPresetQuery = (presetQuery) => {
    setQuery(presetQuery);
    setTimeout(handleRunQuery, 100);
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <div className="sidebar">
          <PresetQueries onSelectQuery={handleSelectPresetQuery} />
        </div>
        <div className="editor-container">
          <section className="query-editor">
            <h2>SQL Query Editor</h2>
            <QueryEditor query={query} onQueryChange={handleQueryChange} onRunQuery={handleRunQuery} />
            <button className="run-query-button" onClick={handleRunQuery}>Run Query</button>
          </section>
          <section className="results-table">
            <ResultsTable results={results} error={error} isLoading={isLoading} />
          </section>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>SQL Query Interface App © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;
