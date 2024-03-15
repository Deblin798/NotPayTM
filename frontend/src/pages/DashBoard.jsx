import { useEffect, useState } from "react";
import AppBar from "../components/Appbar";
import Balance from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

const DashBoard = () => {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const getBalance = async () => {
    const response = await axios
      .get("http://localhost:3000/api/v1/account/balance/", {
        headers: headers,
      })
      setBalance(response.data.balance)
  };
  useEffect(() => {
    getBalance();
  }, []);
  return (
    <div>
      <AppBar />
      <Balance value={balance} />
      <Users />
    </div>
  );
};

export default DashBoard;
