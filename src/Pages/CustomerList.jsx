import React, { useState } from "react";

const CustomerList = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col  justify-center gap-5">
      <div className="flex items-center justify-between mt-5">
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-color  text-white font-semibold py-2 px-4 rounded-md  focus:outline-none mr-4"
          >
            New Customer
          </button>
        </div>
        <div>
          <input
            className="w-full px-4 py-2 rounded-md border  focus:outline-none border-color focus:border-color"
            type="text"
            name=""
            placeholder="Search by Name or Id"
            id=""
          />
        </div>
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Unique ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Condition
                </th>
                <th scope="col" className="px-6 py-3">
                  Point Rate
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-color hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
                <td className="px-6 py-4">$2999</td>

                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-color  hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$2999</td>

                <td className="px-6 py-4">$99</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-color  hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mx-auto flex w-72 items-center justify-center">
        <div
          onClick={() => setOpenModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
        >
          <div
            onClick={(e_) => e_.stopPropagation()}
            className={`absolute w-full rounded-lg bg-white dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${
              openModal
                ? "opacity-1 translate-y-0 duration-300"
                : "-translate-y-20 opacity-0 duration-150"
            }`}
          >
            <form className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10">
              <svg
                onClick={() => setOpenModal(false)}
                className="mx-auto mr-0 w-10 cursor-pointer fill-black dark:fill-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                </g>
              </svg>
              <h1 className="pb-8 text-4xl backdrop-blur-sm">Add Customer</h1>
              <div className="space-y-5">
               <div>
               <label htmlFor="email_navigate_ui_modal" className="block">
                Customer Name
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-2 rounded-md border  focus:outline-none border-color focus:border-color"
                    type="text"
                    name=""
                    placeholder="Customer Name"
                    id=""
                  />
                </div>
               </div>
              <div>
              <label htmlFor="password_navigate_ui_modal" className="block">
                Unique ID
                </label>
                <div className="relative">
                <input
                    className="w-full px-4 py-2 rounded-md border  focus:outline-none border-color focus:border-color"
                    type="text"
                    name=""
                    placeholder="Unique ID"
                    id=""
                  />
                </div>
              </div>
               <div>
               <label htmlFor="password_navigate_ui_modal" className="block">
                Type
                </label>
                <div className="relative">
                <select
                      id="customerId"
                      name="customerId"
                      className="w-full border border-color rounded px-4 py-2"
                    >
                      <option value="1">Deposit</option>
                      <option value="2">Withdraw </option>
                    </select>
                </div>
               </div>
                <div>
                <label htmlFor="password_navigate_ui_modal" className="block">
                Condition
                </label>
                <div className="relative">
                <select
                      id="customerId"
                      name="customerId"
                      className="w-full border border-color rounded px-4 py-2"
                    >
                      <option value="1">Withdraw</option>
                      <option value="2">Non-Withdraw</option>
                      {/* Add more customer options as needed */}
                    </select>
                </div>
                </div>
                <div>
                <label htmlFor="password_navigate_ui_modal" className="block">
                Point Rate
                </label>
                <div className="relative">
                <input
                    className="w-full px-4 py-2 rounded-md border  focus:outline-none border-color focus:border-color"
                    type="text"
                    name=""
                    placeholder="Point Rate"
                    id=""
                  />
                </div>
                </div>
              </div>
              {/* button type will be submit for handling form submission*/}
              <button
                type="button"
                className="relative py-2.5 px-5 rounded-lg mt-6 bg-color drop-shadow-lg  dark:bg-gray-700 dark:hover:bg-gray-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;