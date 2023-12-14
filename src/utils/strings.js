import { DATE_TYPES, PAYMENT_METHODS } from "./constants";

const { ALL, CARD, CASH, INVOICE } = PAYMENT_METHODS;
const { CREATED_DATE, DELIVERED_DATE, START, END } = DATE_TYPES;

const filtersDateElements = [
  {
    labelText: "Created after:",
    column: CREATED_DATE,
    type: START,
  },
  {
    labelText: "Created before:",
    column: CREATED_DATE,
    type: END,
  },
  {
    labelText: "Delivered after:",
    column: DELIVERED_DATE,
    type: START,
  },
  {
    labelText: "Delivered after:",
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
