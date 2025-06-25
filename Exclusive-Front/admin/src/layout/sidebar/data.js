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
    title: "admins",
    to: "/admins",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="currentColor"
        className={"me-2"}
        viewBox="0 0 16 16"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z" />
      </svg>
    ),
    toggleKey: "isAdminsActive",
    children: [
      {
        id: v4(),
        title: "add-admin",
        to: "/admins/new",
      },
    ],
  },
  {
    id: v4(),
    title: "users",
    to: "/users",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="currentColor"
        className={"me-2"}
        viewBox="0 0 16 16"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z" />
      </svg>
    ),
  },
  // {
  //   id: v4(),
  //   title: "profile",
  //   to: "/profile",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width={20}
  //       height={20}
  //       fill="currentColor"
  //       className={"me-2"}
  //       viewBox="0 0 16 16"
  //     >
  //       <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z" />
  //     </svg>
  //   ),
  // },
  {
    id: v4(),
    title: "products",
    to: "/accepted-products",
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
        title: "pending-products",
        to: "/pending-products",
      },
      {
        id: v4(),
        title: "blocked-products",
        to: "/blocked-products",
      },
    ],
  },
  {
    id: v4(),
    title: "categories",
    to: "/categories",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="currentColor"
        className={"me-2"}
        viewBox="0 0 16 16"
      >
        <path d="M2 2h6v6H2V2zm1 1v4h4V3H3zM9 2h5v5H9V2zm1 1v3h3V3h-3zM2 9h5v5H2V9zm1 1v3h3v-3H3zM9 9h5v5H9V9zm1 1v3h3v-3h-3z" />
      </svg>
    ),
    toggleKey: "isCategoriesActive",
    children: [
      {
        id: v4(),
        title: "add-category",
        to: "/add-category",
      },
    ],
  },
  {
    id: v4(),
    title: "sub-categories",
    to: "/sub-categories",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="currentColor"
        className={"me-2"}
        viewBox="0 0 16 16"
      >
        <path d="M4.5 2A1.5 1.5 0 0 1 6 3.5V5h8.5A1.5 1.5 0 0 1 16 6.5v2A1.5 1.5 0 0 1 14.5 10H6v1.5A1.5 1.5 0 0 1 4.5 13h-2A1.5 1.5 0 0 1 1 11.5v-7A1.5 1.5 0 0 1 2.5 3H4V3.5A1.5 1.5 0 0 1 4.5 2zM2 4v7a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V4H2zm4 1v5h8.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H6z" />
      </svg>
    ),
    toggleKey: "isSubCategoriesActive",
    children: [
      {
        id: v4(),
        title: "add-sub-category",
        to: "/add-sub-category",
      },
    ],
  },
];
