import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(new Date());
  const offSet = time.getTimezoneOffset() / 60;
  const [apiData, setAPIData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [timezones, setTimezones] = useState([]);

  //API data fetch function
  async function fetchAvailableTimezones(url) {
    const response = await fetch(url);
    const data = await response.json();
    setAPIData(
      data.filter((data) => {
        return data.includes("/");
      })
    );

    // all regions
    let regionsArr = data
      .filter((data) => {
        return data.includes("/");
      })
      .map((country) => {
        return country.slice(0, country.indexOf("/")); // returns region values
      });
    setCountries(
      regionsArr.filter((c, index) => {
        return regionsArr.indexOf(c) === index; // removes all duplicate values
      })
    );
  }

  useEffect(() => {
    //default timezone
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    //define API data
    fetchAvailableTimezones("http://worldtimeapi.org/api/timezone");

    return function cleanUp() {
      //default timezone cleanup
      clearInterval(timerID);
    };
  }, []); // empty dependency to run once only

  // set timezones list available to selected region
  const [selectedRegion, setSelectedRegion] = useState("");
  const onCountrySelect = (e) => {
    setSelectedRegion(e.target.value);
    setTimezones(
      apiData.filter((dataPt) => {
        return dataPt.includes(e.target.value);
      })
    );
  };

  //function to fetch current timezone data
  async function fetchTimezoneData(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  // fetch output time to selected timezone
  const onTimezoneSelect = (e) => {
    e.preventDefault();
    fetchTimezoneData(
      `http://worldtimeapi.org/api/timezone/${selectedRegion}/${e.target.value}`
    );
  };

  return (
    <div className="App">
      <h1>hello i tell you the time</h1>
      <div>
        <h2>default timezone (sgt)</h2>
        <h1>{time.toLocaleTimeString()}</h1>
        <h3>select a timezone</h3>
        <select onChange={onCountrySelect}>
          <option value="no_selection">select a region</option>
          {countries.length > 0 &&
            countries.map((country, key) => {
              return (
                <option key={key} value={country}>
                  {country}
                </option>
              );
            })}
        </select>
        <form onSubmit={onTimezoneSelect}>
          {timezones.length > 0 && (
            <select>
              <option value="no_selection">select a timezone</option>
              {timezones.map((timezone, key) => {
                return (
                  <option key={key}>
                    {timezone.slice(timezone.indexOf("/") + 1)}
                  </option>
                );
              })}
            </select>
          )}
          <button type="submit">search</button>
        </form>
      </div>
    </div>
  );
}

export default App;
