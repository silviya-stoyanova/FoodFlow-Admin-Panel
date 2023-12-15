import React, { useState, useEffect, createContext } from "react";
import {
  DELETE_TEXT,
  MANAGE_ORDERS_TITLE,
  REJECT_TEXT,
} from "../../utils/constants";
import { getOrdersData } from "../../services/get-data";
import Table from "../table/Table";

const DataContext = createContext(null);

const OrdersTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      var ordersData = await getOrdersData();
      setData(ordersData);
    })();
  }, []);

  return (
    <main className="page">
      <h1 className="page-title">{MANAGE_ORDERS_TITLE}</h1>
      <DataContext.Provider value={{ data, setData }}>
        <Table
          rejectButtonTitle={REJECT_TEXT}
          deleteButtonTitle={DELETE_TEXT}
        />
      </DataContext.Provider>
    </main>
  );
};

export default OrdersTable;

export { DataContext };
