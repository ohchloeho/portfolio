import React from "react";

export default function Definition(props) {
  let data = props.data[0].meanings.map((meaning) => {
    return meaning.definitions.map((obj) => {
      return obj.definition;
    });
  })
  let output = [].concat(...data);
  return (
    <div className="definition-cont">
      <h3>these are the definitions</h3>
      <ul>
        {output.map((def, id) => {
          return <li key={id}> // {def}</li>;
        })}
      </ul>
    </div>
  );
}
