import React from "react";

export default function Balances(props) {
  //array for all balances, separates expense from income w negative value
  const allBalancesArr = props.data.map((balance) => {
    if (balance.type === "expense") {
      return -1 * balance.amount;
    } else {
      return balance.amount;
    }
  });
  console.log(allBalancesArr);

  //total balance values
  //   let totalBalance = 0;
  //   for (let x = 0; x < allBalancesArr.length; x++) {
  //     totalBalance += allBalancesArr[x];
  //   }
  //   let totalBalanceColor = "";
  //   if (totalBalance > 0) {
  //     totalBalanceColor = "green";
  //   } else {
  //     totalBalanceColor = "red";
  //   }
  //   console.log(totalBalance);

  //*sum of total Balances (another method)
  const totalBalance = allBalancesArr.reduce((a, b) => {
    return a + b;
  }, 0);
  let totalBalanceColor = "";
  if (totalBalance > 0) {
    totalBalanceColor = "green";
  } else {
    totalBalanceColor = "red";
  }
  console.log(totalBalance);

  //total expenses
  const allExpArr = allBalancesArr.filter((balance) => {
    return balance < 0;
  });
  const totalExpenses = allExpArr.reduce((a, b) => {
    return a + b;
  }, 0);

  //total income
  const allIncArr = allBalancesArr.filter((balance) => {
    return balance > 0;
  });
  const totalIncome = allIncArr.reduce((a, b) => {
    return a + b;
  }, 0);

  return (
    <div className="Balances-cont">
      <h3>
        total expenses
        <span> ${-1 * totalExpenses}</span>
      </h3>
      <h3>
        total income
        <span> ${totalIncome}</span>
      </h3>
      <h2>
        total balance{" "}
        <span style={{ color: totalBalanceColor }}>${totalBalance}</span>
      </h2>
    </div>
  );
}
