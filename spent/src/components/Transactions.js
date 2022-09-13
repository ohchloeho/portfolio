import React, { useState } from "react";

export default function Transactions(props) {
  let allTransactions = props.data;

  //sorting function
  const [sort, setSort] = useState("");
  function dynamicSort(property) {
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result;
    };
  }
  //sorted render
  if (sort === "date") {
    allTransactions.sort(dynamicSort("date"));
  }
  if (sort === "amount") {
    allTransactions.sort(dynamicSort("amount"));
  }
  if (sort === "name") {
    allTransactions.sort(dynamicSort("name"));
  }

  //filtering function

  //filtered renders

  return (
    <div className="Transactions-cont">
      <h2>Transactions</h2>
      <select
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <option value="no_selection">sort by...</option>
        <option value="date">date</option>
        <option value="amount">amount</option>
        <option value="name">name</option>
      </select>
      <select>
        <option value="no_selection">filter by...</option>
        <option value="income">income</option>
        <option value="expense">expense</option>
      </select>
      <div className="transaction-item title">
        <p>date</p>
        <p>transaction</p>
        <p>amount</p>
      </div>
      {allTransactions.map((transaction, id) => {
        if (transaction.type === "income") {
          //income output
          return (
            <div className="transaction-item" key={id}>
              <p>{transaction.date} </p>
              <p>{transaction.name}</p>
              <p style={{ color: "green" }}>${transaction.amount}</p>
              <button
                onClick={() => {
                  props.onRemoveTransaction(id); //deletion
                }}
              >
                delete
              </button>
            </div>
          );
        } else {
          //expense output
          return (
            <div className="transaction-item" key={id}>
              <p>{transaction.date} </p>
              <p>{transaction.name}</p>
              <p style={{ color: "red" }}>${transaction.amount}</p>
              <button
                onClick={() => {
                  props.onRemoveTransaction(id); //deletion
                }}
              >
                delete
              </button>
            </div>
          );
        }
      })}
    </div>
  );
}
