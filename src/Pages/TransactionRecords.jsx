import React, { useEffect, useState } from "react";

const TransactionRecords = () => {
  // Initialize state with stored values or default values
  const [pageNumber, setPageNumber] = useState(
    parseInt(localStorage.getItem("pageNumber")) || 0
  );
  const [getingTranstionData, setTransationData] = useState(
    JSON.parse(localStorage.getItem("getingTranstionData")) || []
  );
  const [transactionInfoLength, setTransactionInfoLength] = useState(0);
  const [search, setSearch] = useState(localStorage.getItem("search") || "");

  const page = Math.ceil(transactionInfoLength / 50) || 0;

  // const updatePageNumber = (num) => {
  //   if (num > page - 1 || num < 0) {
  //     return setPageNumber(0);
  //   }
  //   setPageNumber(num);
  // };

  useEffect(() => {
    const url = new URL("https://agent-server-eosin.vercel.app/getTransationDAta");
    const params = { search: search};
    url.search = new URLSearchParams(params).toString();

    const getTransactionInfo = async () => {
      try {
        const transactionData = await fetch(url);
        const getingTransation = await transactionData.json();
        setTransactionInfoLength(
          getingTransation?.getingTransationResult?.TotalDataLenght
        );
        setTransationData(
          getingTransation?.getingTransationResult?.finalliyValue.reverse()
        );
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };
    getTransactionInfo();
  }, [search]);

  // Store state in browser storage whenever it changes
  useEffect(() => {
    localStorage.setItem("pageNumber", pageNumber);
    localStorage.setItem("search", search);
    localStorage.setItem("getingTranstionData", JSON.stringify(getingTranstionData));
  }, [pageNumber, search, getingTranstionData]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between mt-5">
        <div>
          <h3 className=" text-base max-sm:w-52  font-bold">
            Transaction Records
          </h3>
        </div>
        <div>
          <input
            className="w-full px-4 py-2 rounded-md border  focus:outline-none border-color focus:border-color"
            type="text"
            name=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name or Id"
            id=""
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse  bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">WD or Non-WD</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Point</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Transaction</th>
              <th className="px-4 py-2">Order ID</th>
            </tr>
          </thead>
          <tbody>
            {/* view data transation information with table   */}
            {getingTranstionData?.map((item, index) => (
              <tr className="bg-white border-b">
                <td className="px-4 py-2">{++index}</td>
                <td className="px-4 py-2">{item?.paymentType}</td>
                <td className="px-4 py-2">{item?.customerId}</td>
                <td className="px-4 py-2">{item?.transationType}</td>
                <td className="px-4 py-2">{item?.amount}</td>
                <td className="px-4 py-2">{item?.points.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {new Date(item?.createdAt).toLocaleString("en-US", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>
                <td className="px-4 py-2 flex flex-col">
                  <span> {item.trans ? item?.trans : item?.transectionNumber }</span>
                  <span className={item.transationType ? 'text-sm' : 'hidden'}>{item?.number}</span>
                </td>
                <td className="px-4 py-2">{item?.orderId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex select-none justify-center items-center bg-white shadow-lg rounded-sm w-fit mx-auto">
        {/* left arrow */}
        {/* <div
          onClick={() => {
            updatePageNumber(pageNumber - 1);
          }}
          className="transition-all py-2 px-3 text-sm border-r duration-200 cursor-pointer p-2 rounded-md flex hover:bg-gray-200 items-center"
        >
          <svg
            className="w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M15 7L10 12L15 17"
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </g>
          </svg>
          Previous
        </div> */}
        {/* <div className="flex justify-center items-center  ">
          {[...Array(page).keys()].map((item, ind) => (
            <div
              onClick={() => {
                setPageNumber(item);
              }}
              className={`cursor-pointer  text-sm  transition-all border-r border-l  duration-200 px-4 ${
                pageNumber === item
                  ? "bg-color text-white"
                  : "bg-white hover:bg-gray-200"
              }   font-semibold text-gray-700   py-[8px] `}
              key={item}
            >
              {item + 1}
            </div>
          ))}
        </div> */}
        {/* right arrow */}
        {/* <div
          onClick={() => {
            updatePageNumber(pageNumber + 1);
          }}
          className=" transition-all py-2  px-3 text-sm duration-200 cursor-pointer border-l  rounded-md flex hover:bg-gray-200 items-center"
        >
          Next
          <svg
            className="w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M10 7L15 12L10 17"
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div> */}
      </div>
    </div>
  );
};

export default TransactionRecords;
