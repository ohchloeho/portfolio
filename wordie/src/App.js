import { useEffect, useState } from "react";
import Definition from "./components/Definition";
import Synonym from "./components/Synonym";
import Rhyme from "./components/Rhyme";
import "./global.css";

function App() {
  //input functions
  const [wordSearched, setWordSearched] = useState("");
  const onWordSearch = (event) => {
    setWordSearched(event.target.value);
  };

  //data fetching function - dynamic... kind of?
  const [definitionData, setDefinitionData] = useState();
  const [synonymData, setSynonymData] = useState();
  const [rhymeData, setRhymeData] = useState();
  async function fetchAPI(url, value, dataType) {
    const response = await fetch(url + value);
    let data = await response.json();
    console.log(data);
    switch (dataType) {
      case "definition":
        setDefinitionData(data);
        break;
      case "synonyms":
        setSynonymData(data);
        break;
      case "rhymes":
        setRhymeData(data);
        break;
    }
  }

  //API data request for //*definitions
  const fetchDefinition = (e) => {
    e.preventDefault();
    if (wordSearched.length > 0) {
      fetchAPI(
        "https://api.dictionaryapi.dev/api/v2/entries/en/",
        wordSearched,
        "definition"
      );
    }
  };
  //API data request for //*synonyms
  const fetchSynonym = (e) => {
    e.preventDefault();
    if (wordSearched.length > 0) {
      fetchAPI(
        "https://api.dictionaryapi.dev/api/v2/entries/en/",
        wordSearched,
        "synonyms"
      );
    }
  };
  //API data request for //*rhymes
  const fetchRhyme = (e) => {
    e.preventDefault();
    if (wordSearched.length > 0) {
      fetchAPI(
        "https://rhymebrain.com/talk?function=getRhymes&word=",
        wordSearched,
        "rhymes"
      );
    }
  };

  //reset field and clears outputs
  const clearFields = (e) => {
    e.preventDefault();
    setWordSearched("");
    setDefinitionData("");
    setRhymeData("");
    setSynonymData("");
  };

  return (
    <div className="App">
      <div className="input">
        <h1>hi I am a word thing</h1>
        <form onSubmit={clearFields}>
          <input
            placeholder="search..."
            value={wordSearched}
            onChange={onWordSearch}
          />
          <button onClick={fetchDefinition}>definition</button>
          <button onClick={fetchSynonym}>synonyms</button>
          <button onClick={fetchRhyme}>rhymes</button>
          <button type="submit">clear</button>
        </form>
      </div>
      <div className="output">
        {definitionData && <Definition data={definitionData} />}
        {synonymData && <Synonym data={synonymData} />}
        {rhymeData && <Rhyme data={rhymeData} />}
      </div>
    </div>
  );
}

export default App;
