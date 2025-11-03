import React from "react";
const Child: React.FC<{ onClick: () => void }> =(props) => {
  console.log('child');
  return (
    <button onClick={props.onClick}>Click</button>
  );
}

export default  React.memo(Child);
