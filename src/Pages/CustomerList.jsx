import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CustomerList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [eidteId, setSingleIdModel] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [customer, setCustomer] = useState();
  const [uniqueId, setUniqueId] = useState("");
  const [type, setType] = useState();
  const [condition, setCondition] = useState();
  const [pointRate, setPointRate] = useState();
  const [search, setSearch] = useState();
  const [allData, setAlldata] = useState({}); // all the data addd here
  const [ViewTableData, setViewTableData] = useState([]); // viwe the data to table list get form server
  const [dataListLenght, setDataListLenght] = useState(0); // total data lenght here

  console.log(customer, uniqueId, type, condition, pointRate);
  const pages = Math.ceil(dataListLenght / 50);
  const page = pages; // Adjust the page numbers the way you want
  console.log(pages);
  const updatePageNumber = (num) => {
    if (num > page - 1 || 0 > num) {
      return setPageNumber(0);
    }
    setPageNumber(num);
  };

  /// ===================================== search functionality added the  =====================================

  // search value and pagiation value add within array

  useEffect(() => {
    const url = new URL("https://life-drop-server.vercel.app/getClientData");
    url.searchParams.append("pages", pageNumber);
    url.searchParams.append("searchValue", search);

    // geting data search and pagination
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // Use the data here
        console.log(data);
        setViewTableData(data?.clientDataList?.finalliyValue.reverse());
        setDataListLenght(data?.clientDataList?.TotalDataLenght);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search, pageNumber]);


  // data insert section ================================  insert data to database =======================================



//new customer open modal
const handleNewCustomer = () => {
  setCustomer("");
  setUniqueId("");
  setType(""); // Set the default value for the selector
  setCondition(""); // Set the default value for the selector
  setPointRate("");
  setOpenModal(true)
}



    const registerUserInsertData = async () => {
      const data = {
        uniqueId: uniqueId,
        customerName: customer,
        type: type,
        condition: condition,
        pointRate: pointRate,
      };
      // setAlldata(data);
      try {
        const response = await fetch(
          "https://life-drop-server.vercel.app/clientListItem",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setViewTableData(prevData => [...prevData, data].reverse());
          setDataListLenght(prevLength => prevLength + 1);
           if (responseData.result.message === 'successfully insert data ') {
            toast.success("Successfully added user!")
           }
          if(responseData.result.message === "User with the provided uniqueId already exists in the database"){
            toast.error("user already register!")
          }
        } else {
          throw new Error("Failed to register user. Server responded with: " + response.status);
        }
      } catch (error) {
        console.error("Error while registering user:", error);
      }
    };
  

  

  // write fuction for genarete unique id  for identifying users
  // useEffect(() => {
  //   const generateUniqueId = () => {
  //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     let uniqueId = '';
  //     for (let i = 0; i < 8; i++) {
  //       const randomIndex = Math.floor(Math.random() * characters.length);
  //       uniqueId += characters[randomIndex];
  //     }
  //     setUniqueId(uniqueId)
  //   };

  //   generateUniqueId();
  // }, [])

  const handleEdit = (id) => {
    setSingleIdModel(id);
    setOpenEdit(true);

    const singleUserEdit = ViewTableData?.find((item) => item._id === id);
    setCustomer(singleUserEdit?.customerName);
    setUniqueId(singleUserEdit?.uniqueId);
    setType(singleUserEdit?.type); // Set the default value for the selector
    setCondition(singleUserEdit?.condition); // Set the default value for the selector
    setPointRate(singleUserEdit?.pointRate);
  };

  // ============= user edite data find =========================

  // ============== user edite here =====================================
  const HandleEditedData = async (eidteId) => {
    const data = {
      customerName: customer,
      uniqueId: uniqueId,
      type: type,
      condition: condition,
      pointRate: pointRate,
    };
  
    try {
      const response = await fetch(`https://life-drop-server.vercel.app/eiditeClientData/${eidteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log("Data is successfully edited");
        toast.success("Successfully updated user!");
  
        // Update the table data after successful edit
        const updatedData = ViewTableData.map(item => {
          if (item._id === eidteId) {
            // Update the fields of the edited item
            console.log("all item", item)

            return {
              ...item,
              customerName: customer,
              uniqueId: uniqueId,
              type: type,
              condition: condition,
              pointRate: pointRate,
            };
          }
          return item;
        });
  
        setViewTableData(updatedData);
      } else {
        console.error("Failed to update data");
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Network error", error);
      toast.error("Network error");
    }
  };
  
  
  // ============== user deleted api call here  ====================================

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://life-drop-server.vercel.app/deleteClientData/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          if (response.ok) {
            console.log("ViewTableData", ViewTableData)
            const updatedData = ViewTableData.filter(item => item._id !== id);
  
            // Set the state with the updated data
            setViewTableData(updatedData);
          
            // Optional: You can also update the dataListLength state if needed
            setDataListLenght(updatedData.length);        
                console.log("Resource successfully deleted");
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } else {
            console.error("Failed to delete resource");
          }
        } catch (error) {
          console.error("Network error:", error);
          Swal.fire({
            title: "Error!",
            text: "Network error",
            icon: "error",
          });
        }
      }
    });
  };
  

  

  return (
    <div className="flex flex-col  justify-center gap-5">
      {/* modal button here  */}
      <div className="flex items-center justify-between mt-5">
        <div>
          <button
            onClick={handleNewCustomer}
            className="bg-color  text-white max-sm:w-36 py-2 px-4 rounded-md  focus:outline-none mr-4"
          >
            New Customer
          </button>
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

      {/* Table List Name here  */}
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              {/*  table name list here  */}
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

            {/* table body add here  */}
            <tbody>
              {ViewTableData?.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.customerName}
                  </th>
                  <td className="px-6 py-4">{item?.uniqueId}</td>
                  <td className="px-6 py-4">{item?.type}</td>
                  <td className="px-6 py-4">{item?.condition}</td>
                  <td className="px-6 py-4">{item?.pointRate}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      onClick={() => handleEdit(item?._id)}
                      className="font-medium mr-2 text-color hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => handleDelete(item?._id)}
                      className="font-medium text-color hover:underline"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modla here  */}
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
                      value={customer}
                      onChange={(e) => setCustomer(e.target.value)}
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
                      value={uniqueId}
                      onChange={(e) => setUniqueId(e.target.value)}
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
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full border border-color rounded px-4 py-2"
                    >
                      <option value="" selected>Please Select Type</option>
                      <option value="SMA">SMA</option>
                      <option value="MA">MA </option>
                      
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
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full border border-color rounded px-4 py-2"
                    >
                      <option value="" selected>Please Select Condition</option>
                      <option value="Withdraw">Withdraw</option>
                      <option value="Non-Withdraw">Non-Withdraw</option>
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
                      value={pointRate}
                      onChange={(e) => setPointRate(e.target.value)}
                      placeholder="Point Rate"
                      id=""
                    />
                  </div>
                </div>
              </div>
              {/* button type will be submit for handling form submission*/}
              <button
                type="button"
                onClick={registerUserInsertData}
                className="relative py-2.5 px-5 rounded-lg mt-6 bg-color drop-shadow-lg hover:bg-orange-700 text-white  dark:bg-gray-700 dark:hover:bg-gray-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-72 items-center justify-center">
        <div
          onClick={() => setOpenEdit(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openEdit ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
        >
          <div
            onClick={(e_) => e_.stopPropagation()}
            className={`absolute w-full rounded-lg bg-white dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${
              openEdit
                ? "opacity-1 translate-y-0 duration-300"
                : "-translate-y-20 opacity-0 duration-150"
            }`}
          >
            <form className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10">
              <svg
                onClick={() => setOpenEdit(false)}
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
              <h1 className="pb-8 text-4xl backdrop-blur-sm">Edit Customer</h1>
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
                      value={customer}
                      onChange={(e) => setCustomer(e.target.value)}
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
                      value={uniqueId}
                      onChange={(e) => setUniqueId(e.target.value)}
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
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full border border-color rounded px-4 py-2"
                    >
                      <option value="">select type</option>
                      <option value="SMA">SMA</option>
                      <option value="MA">MA </option>
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
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full border border-color rounded px-4 py-2"
                    >
                      <option value="">select condition</option>
                      <option value="Withdraw">Withdraw</option>
                      <option value="Non-Withdraw">Non-Withdraw</option>
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
                      value={pointRate}
                      onChange={(e) => setPointRate(e.target.value)}
                      placeholder="Point Rate"
                      id=""
                    />
                  </div>
                </div>
              </div>
              {/* button type will be submit for handling form submission*/}
              <button
                type="button"
                onClick={()=>HandleEditedData(eidteId)}
                className="relative py-2.5 px-5 rounded-lg mt-6 bg-color drop-shadow-lg hover:bg-orange-700 text-white  dark:bg-gray-700 dark:hover:bg-gray-800"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* pagination */}
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

export default CustomerList;
