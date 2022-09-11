import { React, useState } from "react";

export default function Inputs(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState(""); //false = expense, true = income

  const dataSubmit = (e) => {
    e.preventDefault();
    if (name && date && amount) {
      props.onInputData({name, date, amount, type});
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
          value="expense"
          id="expense-check"
          name="transaction-type"
          onChange={() => {
            setType("expense");
          }}
        />
        <label>expense</label>
        <input
          type="radio"
          value="income"
          id="income-check"
          name="transaction-type"
          onChange={() => {
            setType("income");
          }}
        />
        <label>income</label>
        <button type="submit">add</button>
      </form>
    </div>
  );
}
