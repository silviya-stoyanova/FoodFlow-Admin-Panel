import { DATE_TYPES, PAYMENT_METHODS } from "./constants";

const { ALL, CARD, CASH, INVOICE } = PAYMENT_METHODS;
const { CREATED_DATE, DELIVERED_DATE, START, END } = DATE_TYPES;

const filtersDateElements = [
  {
    labelText: "Created start date:",
    column: CREATED_DATE,
    type: START,
  },
  {
    labelText: "Created end date:",
    column: CREATED_DATE,
    type: END,
  },
  {
    labelText: "Delivered start date:",
    column: DELIVERED_DATE,
    type: START,
  },
  {
    labelText: "Delivered end date:",
    column: DELIVERED_DATE,
    type: END,
  },
];

const filtersSelectElements = [
  {
    name: "paymentMethod",
    options: [ALL, CARD, CASH, INVOICE],
    values: ["", CARD, CASH, INVOICE],
    labelText: "Payment method:",
  },
  {
    name: "isPaid",
    options: [ALL, "true", "false"],
    values: ["", true, false],
    labelText: "Is paid:",
  },
  {
    name: "isNewCustomer",
    options: [ALL, "true", "false"],
    values: ["", true, false],
    labelText: "Is new customer:",
  },
];

export { filtersDateElements, filtersSelectElements };
