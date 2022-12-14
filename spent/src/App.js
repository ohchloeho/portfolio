import { useEffect, useState } from "react";
import "./global.css";
import Inputs from "./components/Inputs";
import Transactions from "./components/Transactions";
import Balances from "./components/Balances";

function App() {
  const [data, updateData] = useState(
    () =>
      JSON.parse(localStorage.getItem("data")) || [
        //default values
        {
          name: "paycheck",
          amount: 3000,
          date: "2022-05-24",
          type: "income",
        },
        {
          name: "macbook air",
          amount: 1400,
          date: "2022-06-16",
          type: "expense",
        },
        {
          name: "iphone 14",
          amount: 988,
          date: "2022-03-16",
          type: "expense",
        },
      ]
  );
  //updating and storing values in localStorage
  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  //update data once inputed
  const onInputData = (event) => {
    updateData([...data, event]);
  };

  //delete transaction function
  const onRemoveTransaction = (index) => {
    updateData([
      ...data.slice(0, index),
      ...data.slice(index + 1, data.length),
    ]);
  };

  return (
    <div className="App">
      <h1>hello i track expenses</h1>
      <Balances data={data} />
      {data.length > 0 && (
        <Transactions data={data} onRemoveTransaction={onRemoveTransaction} />
      )}
      <Inputs onInputData={onInputData} />
    </div>
  );
}

export default App;
