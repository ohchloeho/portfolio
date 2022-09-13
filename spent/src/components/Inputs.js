import { React, useState } from "react";

export default function Inputs(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [radioState, setRadioState] = useState(false);

  //onSubmit function
  const dataSubmit = (e) => {
    e.preventDefault();
    if (name && date && amount) {
      //ensure no empty strings or input
      props.onInputData({ name, date, amount, type });
      //clearing fields onSubmit
      setRadioState(false);
      setName("");
      setDate("");
      setAmount("");
    }
  };

  return (
    <div>
      <form onSubmit={dataSubmit}>
        <input
          placeholder="transaction"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <input
          placeholder="amount"
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
        />
        <input
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
        />
        <input
          type="radio"
          id="income-check"
          name="transaction-type"
          checked={radioState}
          onChange={() => {
            setType("income");
            setRadioState(true);
          }}
        />
        <label>income</label>
        <input
          type="radio"
          id="expense-check"
          name="transaction-type"
          checked={radioState}
          onChange={() => {
            setType("expense");
            setRadioState(true);
          }}
        />
        <label>expense</label>
        <button type="submit">add</button>
      </form>
    </div>
  );
}
