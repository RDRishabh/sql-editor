import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import '../styles/QueryEditor.css';

const QueryEditor = ({ query, onQueryChange, onRunQuery }) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      editorRef.current = monaco.editor.create(editorContainerRef.current, {
        value: query,
        language: 'sql',
        theme: 'vs',
        minimap: { enabled: false },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        wordWrap: 'on',
        renderLineHighlight: 'all',
        padding: { top: 16, bottom: 16 },
        fontSize: 14,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      });

      editorRef.current.onDidChangeModelContent(() => {
        if (editorRef.current) {
          onQueryChange(editorRef.current.getValue());
        }
      });

      editorRef.current.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        onRunQuery
      );
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== query) {
      editorRef.current.setValue(query);
    }
  }, [query]);

  return (
    <div className="query-editor scale-in" style={{ animationDelay: '0.2s' }}>
      <div className="monaco-editor-container" ref={editorContainerRef}></div>
      
    </div>
  );
};

export default QueryEditor;
