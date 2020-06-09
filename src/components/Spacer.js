import React from "react";

const Spacer = (props) => {

  return (
    <div style={{height: props.height * 10}}>
      {props.children || ''}
    </div>
  )
}

export default Spacer;