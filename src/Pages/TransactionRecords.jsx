import React, { useState } from "react";

const TransactionRecords = () => {
  const [pageNumber,setPageNumber] = useState(0)
  const page = 5 // Adjust the page numbers the way you want
  const updatePageNumber = (num)=>{
      if((num > (page - 1)) || (0 > num)){ return setPageNumber(0) }
      setPageNumber(num)
  }
  return (
    <div className="flex flex-col gap-5">
         <div className="flex items-center justify-between mt-5">
        <div>
         <h3 className="text-2xl font-bold">Transaction Records</h3>
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
        <table className="w-full border-collapse overflow-hidden bg-white shadow-md rounded-lg">
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
            <tr className="bg-white border-b">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">SMA</td>
              <td className="px-4 py-2">12345</td>
              <td className="px-4 py-2">Withdraw</td>
              <td className="px-4 py-2">$100</td>
              <td className="px-4 py-2">56</td>
              <td className="px-4 py-2">2024-04-15</td>
              <td className="px-4 py-2">TRX123</td>
              <td className="px-4 py-2">ORD-56789</td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-4 py-2">2</td>
              <td className="px-4 py-2">SMA</td>
              <td className="px-4 py-2">12345</td>
              <td className="px-4 py-2">Withdraw</td>
              <td className="px-4 py-2">$100</td>
              <td className="px-4 py-2">7586</td>
              <td className="px-4 py-2">2024-04-15</td>
              <td className="px-4 py-2">TRX123</td>
              <td className="px-4 py-2">ORD-56789</td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-4 py-2">3</td>
              <td className="px-4 py-2">SMA</td>
              <td className="px-4 py-2">12345</td>
              <td className="px-4 py-2">Withdraw</td>
              <td className="px-4 py-2">$100</td>
              <td className="px-4 py-2">5641</td>
              <td className="px-4 py-2">2024-04-15</td>
              <td className="px-4 py-2">TRX123</td>
              <td className="px-4 py-2">ORD-56789</td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-4 py-2">4</td>
              <td className="px-4 py-2">SMA</td>
              <td className="px-4 py-2">12345</td>
              <td className="px-4 py-2">Withdraw</td>
              <td className="px-4 py-2">$100</td>
              <td className="px-4 py-2">60785</td>
              <td className="px-4 py-2">2024-04-15</td>
              <td className="px-4 py-2">TRX123</td>
              <td className="px-4 py-2">ORD-56789</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex select-none justify-center items-center bg-white shadow-lg rounded-sm w-fit mx-auto">
        {/* left arrow */}
        <div
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
        </div>
        <div className="flex justify-center items-center  ">
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
        </div>
        {/* right arrow */}
        <div
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
        </div>
      </div>
    </div>
  );
};

export default TransactionRecords;
