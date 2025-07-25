import { v4 } from "uuid";

export const adminLinks = [
  {
    id: v4(),
    title: "home",
    to: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="currentColor"
        className={"me-2"}
        viewBox="0 0 16 16"
      >
        <path d="M8 3.293l6 6V14a1 1 0 0 1-1 1h-4v-4H7v4H3a1 1 0 0 1-1-1V9.293l6-6zM7.5 1.5a.5.5 0 0 1 .5.5v.793l6.354 6.353a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708L7.5 2.793V2a.5.5 0 0 1 .5-.5z" />
      </svg>
    ),
  },
  {
    id: v4(),
    title: "products",
    to: "/products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="currentColor"
        className={"me-2"}
        viewBox="0 0 16 16"
      >
        <path d="M8.5 1.5A1.5 1.5 0 0 0 7 3v1H4.5A1.5 1.5 0 0 0 3 5.5V7h10V5.5A1.5 1.5 0 0 0 11.5 4H9V3a1.5 1.5 0 0 0-1.5-1.5zM3 8v5.5A1.5 1.5 0 0 0 4.5 15h7A1.5 1.5 0 0 0 13 13.5V8H3z" />
      </svg>
    ),
    toggleKey: "isProductsActive",
    children: [
      {
        id: v4(),
        title: "addProduct",
        to: "/products/new",
      },
    ],
  },
];
