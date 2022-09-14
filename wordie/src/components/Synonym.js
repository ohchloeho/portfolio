import React from "react";

export default function Synonym(props) {
  //synonyms process
  let synonyms = props.data.map((data) => {
    return data.meanings.map((meaning) => {
      if (meaning.synonyms.length > 0) {
        return meaning.synonyms;
      } else {
        return "";
      }
    });
  });
  let synOutput = [].concat(...synonyms).filter((arr) => {
    return arr.length > 0;
  })[0];

  //antonyms process
  let antonyms = props.data.map((data) => {
    return data.meanings.map((meaning) => {
      if (meaning.antonyms.length > 0) {
        return meaning.antonyms;
      } else {
        return "";
      }
    });
  });
  let antOutput = [].concat(...antonyms).filter((arr) => {
    return arr.length > 0;
  })[0];
  console.log(synonyms, antonyms);

  return (
    <div className="flexrow">
      <div className="synonym-cont">
        <h3>these are the synonyms</h3>
        <ul>
          {synOutput &&
            synOutput.map((syn, id) => {
              return <li key={id}>{syn}</li>;
            })}
        </ul>
      </div>
      <div className="antonym-cont">
        <h3>these are the antonyms</h3>
        <ul>
          {antOutput &&
            antOutput.map((ant, id) => {
              return <li key={id}>{ant}</li>;
            })}
        </ul>
      </div>
    </div>
  );
}
