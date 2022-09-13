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
  const [filter, setFilter] = useState("no_selection");
  //filtered render
  if (filter === "income") {
    console.log(
      allTransactions.filter((transactions) => {
        return transactions.type === "income";
      })
    );
  }

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
      <select
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value="no_selection">filter by...</option>
        <option value="income">income</option>
        <option value="expense">expense</option>
        <option value="all">all</option>
      </select>
      <div className="transaction-item title">
        <p>date</p>
        <p>transaction</p>
        <p>amount</p>
      </div>
      {(filter === "no_selection") | (filter === "all")
        ? allTransactions.map((transaction, id) => {
            if (transaction.type === "income") {
              //income output
              return (
                <div className="transaction-item" key={id}>
                  <p>{transaction.date} </p>
                  <p>{transaction.name}</p>
                  <p style={{ color: `green` }}>${transaction.amount}</p>
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
          })
        : null}

      {filter === "income" &&
        allTransactions
          .filter((transactions) => {
            return transactions.type === "income";
          })
          .map((transaction, id) => {
            return (
              <div className="transaction-item" key={id}>
                <p>{transaction.date} </p>
                <p>{transaction.name}</p>
                <p style={{ color: `green` }}>${transaction.amount}</p>
                <button
                  onClick={() => {
                    props.onRemoveTransaction(id); //deletion
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
      {filter === "expense" &&
        allTransactions
          .filter((transactions) => {
            return transactions.type === "expense";
          })
          .map((transaction, id) => {
            return (
              <div className="transaction-item" key={id}>
                <p>{transaction.date} </p>
                <p>{transaction.name}</p>
                <p style={{ color: `red` }}>${transaction.amount}</p>
                <button
                  onClick={() => {
                    props.onRemoveTransaction(id); //deletion
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
    </div>
  );
}
