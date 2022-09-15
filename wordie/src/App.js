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
   //loader render
   const [loader, setLoader] = useState(false)

  //data fetching function - dynamic... kind of?
  const [definitionData, setDefinitionData] = useState();
  const [synonymData, setSynonymData] = useState();
  const [rhymeData, setRhymeData] = useState();
  async function fetchAPI(url, value, dataType) {
    setLoader(true)
    const response = await fetch(url + value);
    if(response){ //hide loader
      setLoader(false)
    }
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
  //data display (react-router-alt)
  const [defTabDisplay, setDefTabDisplay] = useState(false);
  const [synTabDisplay, setSynTabDisplay] = useState(false);
  const [rhyTabDisplay, setRhyTabDisplay] = useState(false);

  //API data request for //*definitions
  const onClickDefinition = (e) => {
    e.preventDefault();
    if (wordSearched.length > 0) {
      fetchAPI(
        "https://api.dictionaryapi.dev/api/v2/entries/en/",
        wordSearched,
        "definition"
      );
    }
    //*displays
    setDefTabDisplay(true);
    setSynTabDisplay(false);
    setRhyTabDisplay(false);
  };
  //API data request for //*synonyms
  const onClickSynonym = (e) => {
    e.preventDefault();
    if (wordSearched.length > 0) {
      fetchAPI(
        "https://api.dictionaryapi.dev/api/v2/entries/en/",
        wordSearched,
        "synonyms"
      );
    }
    setSynTabDisplay(true);
    setRhyTabDisplay(false);
    setDefTabDisplay(false);
  };
  //API data request for //*rhymes
  const onClickRhyme = (e) => {
    e.preventDefault();
    if (wordSearched.length > 0) {
      fetchAPI(
        "https://rhymebrain.com/talk?function=getRhymes&word=",
        wordSearched,
        "rhymes"
      );
    }
    setRhyTabDisplay(true);
    setSynTabDisplay(false);
    setDefTabDisplay(false);
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
          <button onClick={onClickDefinition}>definition</button>
          <button onClick={onClickSynonym}>synonyms</button>
          <button onClick={onClickRhyme}>rhymes</button>
          <button type="submit">clear</button>
        </form>
      </div>
      <div className="output">
        {!wordSearched&&<p>enter a word to begin!</p>}
        {loader && <p>loading...</p>}
        {definitionData && defTabDisplay && (
          <Definition data={definitionData} />
        )}
        {synonymData && synTabDisplay && <Synonym data={synonymData} />}
        {rhymeData && rhyTabDisplay && <Rhyme data={rhymeData} />}
      </div>
      <footer>
        <p>powered by dictionaryapi.dev and rhymebrain</p>
      </footer>
    </div>
  );
}

export default App;
