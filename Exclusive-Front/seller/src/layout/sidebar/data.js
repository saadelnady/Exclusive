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
];
