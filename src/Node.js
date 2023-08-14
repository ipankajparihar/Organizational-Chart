import React, { useState } from "react";
const Node = ({ data, zoomLevel }) => {
  const [showBranch, setShowBranch] = useState([]);

  const handleBranch = (node) => {
    setShowBranch((prevState) => ({
      ...prevState,
      [node]: !prevState[node],
    }));
  };

  const isNode = (node) => {
    return showBranch[node];
  };

  const toggleBtn = (node) => {
    return isNode(node) ? "+" : "-";
  };

  const zoomStyle = {
    transform: `scale(${zoomLevel})`,
    transformOrigin: "top",
  };

  //count elmployee in a branch
  const handleCount = (data) => {
    let count = 0;
    if (data.children) {
      count += data.children?.length;
      data.children.forEach((child) => {
        count += handleCount(child);
      });
    }
    return count;
  };
  return (
    <ul className="Tree" style={zoomStyle}>
      {data.map((item) => (
        <React.Fragment key={item.name}>
          <li key={item.name} className="node">
            <div>
              <h3>{item.name}</h3>
              <p>{item.designation}</p>
              <p>emp:{handleCount(item)}</p>
              {item.children?.length > 0 && (
                <button className="btn" onClick={() => handleBranch(item.name)}>
                  {toggleBtn(item.name)}
                </button>
              )}
            </div>

            {item.children?.length && !isNode(item.name) && (
              <Node data={item.children} zoomLevel={zoomLevel} />
            )}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Node;
