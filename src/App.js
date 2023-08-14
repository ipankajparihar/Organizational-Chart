import React, { useState, useEffect } from "react";
import "./App.css";
import Node from "./Node";
import data from "./data.json";

function App() {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel < 1.2 ? zoomLevel + 0.01 : zoomLevel);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel > 0.8 ? zoomLevel - 0.01 : zoomLevel);
  };
  const handleMouseScroll = (e) => {
    if (e.deltaY > 0) {
      handleZoomOut();
    } else {
      handleZoomIn();
    }
  };

  useEffect(() => {
    document.addEventListener("wheel", handleMouseScroll);
    return () => {
      document.removeEventListener("wheel", handleMouseScroll);
    };
  }, [zoomLevel]);

  return (
    <div className="App">
      <div className="Tree">
        <h2>Organizational Chart</h2>
        <Node data={data} zoomLevel={zoomLevel} />
      </div>
    </div>
  );
}

export default App;
