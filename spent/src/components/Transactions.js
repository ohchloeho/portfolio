import React, { useState } from "react";

export default function Transactions(props) {
  let allTransactions = props.data;

  //set text color according to income / expense
  const [incomeOrExpenseColor, setIncomeOrExpenseColor] = useState("green");

  return (
    <div className="Transactions-cont">
        <h2>Transactions</h2>
      <div className="transaction-item title">
        <p>date</p>
        <p>transaction</p>
        <p>amount</p>
      </div>
      {allTransactions.map((transaction, id) => {
        if (transaction.type == "income") {
            //income output
          return (
            <div className="transaction-item" key={id}>
              <p>{transaction.date} </p>
              <p>{transaction.name}</p>
              <p style={{ color: "green" }}>${transaction.amount}</p>
            </div>
          );
        } else {
            //expense output
          return (
            <div className="transaction-item" key={id}>
              <p>{transaction.date} </p>
              <p>{transaction.name}</p>
              <p style={{ color: "red" }}>${transaction.amount}</p>
            </div>
          );
        }
      })}
    </div>
  );
}
