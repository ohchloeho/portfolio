import { React, useEffect, useState } from "react";

export default function Rhyme(props) {
  let rhymeData = props.data;
  //*function to filter syllables
  const [oneSy, setOneSy] = useState();
  const [twoSy, setTwoSy] = useState();
  const [threeSy, setThreeSy] = useState();

  //dynamic sorting function
  function dynamicSort(property) {
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result;
    };
  }

  //set syllable conts for render
  const syllablesFilters = () => {
    setOneSy(
      rhymeData
        .filter((rhyme) => {
          return rhyme.syllables === "1";
        })
        .sort(dynamicSort("word"))
    );
    setTwoSy(
      rhymeData
        .filter((rhyme) => {
          return rhyme.syllables === "2";
        })
        .sort(dynamicSort("word"))
    );
    setThreeSy(
      rhymeData
        .filter((rhyme) => {
          return rhyme.syllables === "3";
        })
        .sort(dynamicSort("word"))
    );
  };

  useEffect(() => {
    syllablesFilters();
  }, [rhymeData]);

  return (
    <div>
      <h3>these are rhymes</h3>
      <h2>one syllable</h2>
      {oneSy &&
        oneSy.map((rhyme, id) => {
          return <span key={id}>{rhyme.word}, </span>;
        })}
      <h2>two syllables</h2>
      {twoSy &&
        twoSy.map((rhyme, id) => {
          return <span key={id}>{rhyme.word}, </span>;
        })}
      <h2>three syllables</h2>
      {threeSy &&
        threeSy.map((rhyme, id) => {
          return <span key={id}>{rhyme.word}, </span>;
        })}
    </div>
  );
}
