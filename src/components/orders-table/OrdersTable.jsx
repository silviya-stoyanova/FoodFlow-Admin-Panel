import React, { useState, useEffect } from "react";
import { MANAGE_ORDERS_TITLE } from "../../utils/constants";
import { getOrdersData } from "../../services/get-data";
import Table from "../table/Table";

const OrdersTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      var ordersData = await getOrdersData();
      setData(ordersData);
    })();
  }, []);

  return (
    <>
      <h1>{MANAGE_ORDERS_TITLE}</h1>
      <Table data={data} setData={setData} />
    </>
  );
};

export default OrdersTable;
