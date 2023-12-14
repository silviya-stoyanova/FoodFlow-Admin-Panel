import React, { useState, useEffect, useMemo } from "react";
import {
  faFileInvoiceDollar,
  faClose,
  faUserCheck,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import {
  formatCellWithDate,
  formatBooleanCellWithIcon,
} from "../../utils/common";
import { getOrdersData } from "../../services/get-data";
import Table from "../table/Table";
import { MANAGE_ORDERS_TITLE } from "../../utils/constants";

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
