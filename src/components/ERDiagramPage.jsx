import React from "react";
import ReactFlow, { Controls } from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  { id: "1", position: { x: 100, y: 50 }, data: { label: "Employees" } },
  { id: "2", position: { x: 300, y: 50 }, data: { label: "Customers" } },
  { id: "3", position: { x: 300, y: 150 }, data: { label: "Orders" } },
  { id: "4", position: { x: 500, y: 150 }, data: { label: "Order Details" } },
  { id: "5", position: { x: 100, y: 250 }, data: { label: "Products" } },
  { id: "6", position: { x: 300, y: 250 }, data: { label: "Territories" } },
  { id: "7", position: { x: 500, y: 250 }, data: { label: "Regions" } },
];

const edges = [
  { id: "e1-2", source: "1", target: "6", label: "Has Territories" },
  { id: "e2-3", source: "2", target: "3", label: "Has Orders" },
  { id: "e3-4", source: "3", target: "4", label: "Has Order Details" },
  { id: "e4-5", source: "4", target: "5", label: "Has ProductID" },
  { id: "e6-7", source: "6", target: "7", label: "Has RegionID" },
];

const ERDiagramPage = () => {
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <h2>Entity-Relationship Diagram</h2>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ERDiagramPage;
