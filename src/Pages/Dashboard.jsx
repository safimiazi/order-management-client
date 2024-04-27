import { getItem } from "localforage";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  // State variables for order details
  const [orderId, setOrderId] = useState("");
  const [points, setPoints] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [transactionType, setTransactionType] = useState("Deposit");
  const [showTransactionNumber, setShowTransactionNumber] = useState(false);
  const [customerId, setCUstomerId] = useState();
  const [transectionNumber, setShowTransactionvalue] = useState();
  const [amount, setAmount] = useState();
  const [transType, setTransType] = useState();

  const [paymentType, setPaymentType] = useState();
  const [searchValue, setSearchValue] = useState();
  const [trans, setTrans] = useState();
  const [number, setNumber] = useState();

  const [allDataList, setAllDataList] = useState({}); // insertARrray inside the data form the filed list
  const [userDataList, setUserDataList] = useState([]); // registerUser data list get from the server
  const [search2, setSearch2] = useState(); // default value for rleftaring and search
  const [allTransationData, setAllTransationData] = useState([
    { message: "geting a data successsfully from the database " },
    { TotalAmount: 0 },
    { TotalPoints: 0 },
    { TotalDeposit: 0 },
    { TotalWithdrawalAmount: 0 },
    { TotalWithdrawalCredit: 0 },
    { TotalPaymentMethodbkash: 0 },
    { TotalPaymentMethodRoket: 0 },
    { TotalPaymentMethodUpay: 0 },
    { TotalPaymentMethodNogod: 0 },
    { TotalPaymentMethodBank: 0 },
  ]); // store data all the transation list data
  // Regular expression to match the last number in the string

  // console.log(allTransationData[1].TotalAmount ,'all the stor state list check');

  // ================== data filter for checkout customer id info ===================
  console.log("userDataList", userDataList);
  const filterCustomerData = userDataList?.find(
    (item, index) => item.uniqueId === customerId
  );

  // ========================== all register user api call here ======================

  useEffect(() => {
    const getingAllregisterUser = async () => {
      const userData = await fetch("https://agent-server-mu.vercel.app/getingRegisterUser");
      const userDataString = await userData.json();
      console.log(userDataString);
      setUserDataList(userDataString?.finalResulst);
    };
    getingAllregisterUser();
  }, []);

  // ========================= all transation list here , and api call ========================
  const handleSentData = () => {
    const data = {
      customerId: customerId,
      transectionNumber: transectionNumber,
      amount: amount,
      paymentType: paymentType,
      orderId: orderId,
      points: points,
      trans: trans,
      number: number,
      transationType: transactionType
    };
    setAllDataList(data);
    console.log("amar sunar bangla", data);
  };

  console.log("object", transactionType);
  //transaction type logic
  const handleCustomerIdChange = (e) => {
    console.log("forid vai e", e.target.value)

    setCUstomerId(e.target.value);

    // Find the selected user's transaction type
    const selectedUser = userDataList.find(
      (user) => user.uniqueId === e.target.value
    );
    if (selectedUser) {
      setTransType(selectedUser.condition);
    }
  };


 useEffect(()=>{
  setShowTransactionNumber(true);
  setTransactionType("Deposit")
 },[customerId])

  // call api here for insert all the transation

  useEffect(() => {
    const insertDataToDataBase = async () => {
      try {
        const response = await fetch(
          "https://agent-server-mu.vercel.app/insertTransaction",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(allDataList),
          }
        );

        if (response.ok) {
          // Data successfully added
          const jsonData = await response.json();
          console.log(jsonData);
          if (
            jsonData.reusltInsert.message ===
            "successfully insert Transation data "
          ) {
            toast.success("Successfully added transation id");
          }
        } else {
          // Failed to add data
          console.error("Failed to add data:", response.statusText);
          toast.error("Failed to add data");
        }
      } catch (error) {
        console.error("Error adding data:", error);
        toast.error("Error adding data");
      }
    };

    insertDataToDataBase();
  }, [allDataList]);

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
    setShowTransactionNumber(true);
  };
  // Function to generate a random order ID
  const generateOrderId = () => {
    return "ORD-" + Math.floor(Math.random() * 1000000);
  };

  // Function to calculate points
  const calculatePoints = (amount) => {
    const points = amount * 100 / filterCustomerData?.pointRate;
    return points;
  };

  function generateTransactionId(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let transactionId = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      transactionId += characters[randomIndex];
    }
    return transactionId;
  }

  // Function to handle form submission
  const handleSubmit = () => {
    const orderId = generateOrderId();
    const amount = parseFloat(document.getElementById("amount").value);
    const calculatedPoints = calculatePoints(amount);
    setOrderId(orderId);
    setPoints(calculatedPoints);
    setShowOrderDetails(true);
  };

  // Function to copy text
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  // dashboard search functionlity add here  with pagination and searching =====================

  // Function to update the search parameter
  const handleConditionData = (search) => {
    
    setSearch2(search);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API using the search parameter
        const response = await fetch(
          `https://agent-server-mu.vercel.app/getingTotalData?search=${search2}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Check if the response is successful
        if (response.ok) {
          console.log("Data successfully retrieved");
          const data = await response.json(); // Do something with the data
          setAllTransationData(data); // set data to same state
        } else {
          console.error("Failed to retrieve data");
          // Handle error condition here
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error condition here
      }
    };

    // Call the fetchData function whenever search2 changes
    fetchData();

    // Since we want to refetch data whenever search2 changes, we include it as a dependency
  }, [search2]); // Dependency array contains search2

  // call the same api for see all the bydefault value get

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API using the search parameter
        const response = await fetch(
          `https://agent-server-mu.vercel.app/getingTotalData?search=${search2}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Check if the response is successful
        if (response.ok) {
          console.log("Data successfully retrieved");
          const data = await response.json();
          setAllTransationData(data); // set data to same state
          console.log("mohibullaData", data); // Do something with the data
        } else {
          console.error("Failed to retrieve data");
          // Handle error condition here
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error condition here
      }
    };

    // Call the fetchData function whenever search2 changes
    fetchData();
  }, []); // Dependency array contains search2

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    handleConditionData(e.target.value);
  };

  
const needPoint = allTransationData[2]?.TotalPoints?.toFixed(2) - allTransationData[5]?.TotalWithdrawalCredit?.toFixed(2)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-300 rounded-md overflow-auto size-full p-4 mb-8 flex items-center gap-8 justify-between">
        <div className="flex-1 flex">
          <input
            id="userIdInput"
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="User ID"
            className="w-full py-2 px-4 rounded-l-md focus:outline-none"
          />
          <button
            id="searchButton"
            className="bg-color hover:bg-orange-600 text-white py-2 px-4 rounded-r-md  focus:outline-none"
          >
            Search
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleConditionData("today")}
            className="rounded-lg bg-color px-4  hover:bg-orange-600  py-2  text-white duration-300 active:scale-95"
          >
            Today
          </button>

          <button
            onClick={() => handleConditionData("fastWeek")}
            className="rounded-lg bg-color px-4   hover:bg-orange-600 py-2  text-white duration-300 active:scale-95 "
          >
            Fast Week
          </button>
          <button
            onClick={() => handleConditionData("last-week")}
            className="rounded-lg bg-color px-4   hover:bg-orange-600 py-2  text-white duration-300 active:scale-95 "
          >
            Last Week
          </button>
          <button
            onClick={() => handleConditionData("last-month")}
            className="rounded-lg bg-color px-4   hover:bg-orange-600 py-2  text-white duration-300 active:scale-95 "
          >
            Last month
          </button>
          <button
            onClick={() => handleConditionData("this-month")}
            className="rounded-lg bg-color px-4   hover:bg-orange-600 py-2  text-white duration-300 active:scale-95 "
          >
            This Month
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-200 rounded-lg p-2">
            <div className="overflow-x-auto ">
              <table className="w-full  text-left border mx-auto  my-6">
                <thead>
                  <tr className="bg-color text-white">
                    <th className="py-3 px-6 text-left border-b">
                      Total Agent Top Up
                    </th>

                    <th className="py-3 px-6  border-b text-left">
                      Payment Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" text-left transition duration-300">
                    <td className="py-1 px-6 border-b">
                      BDT: ৳ <span> {allTransationData[1].TotalAmount}</span>{" "}
                    </td>

                    <td className="py-1 px-6 border-b text-left">
                      bKash: ৳{" "}
                      <span>
                        {allTransationData[6]?.TotalPaymentMethodbkash}
                      </span>
                    </td>
                  </tr>
                  <tr className=" transition duration-300">
                    <td className="py-1 px-6 border-b">
                      Credits: ৳{" "}
                      <span>
                        {" "}
                        {allTransationData[2]?.TotalPoints?.toFixed(2)}
                      </span>
                    </td>

                    <td className="py-1 px-6 border-b text-left">
                      Rocket: ৳{" "}
                      <span>
                        {allTransationData[7]?.TotalPaymentMethodRoket}
                      </span>
                    </td>
                  </tr>
                  <tr className=" transition duration-300">
                    <td className="py-1 px-6 border-b">Unique Agents: <span>{allTransationData[14]?.uniqueCustomers}</span></td>

                    <td className="py-1 px-6 border-b text-left">Upay: ৳ <span>{allTransationData[8]?.TotalPaymentMethodUpay}</span></td>
                  </tr>
                  <tr className=" transition duration-300">
                    <td className="py-1 px-6 border-b">Total Count: <span>{allTransationData[11]?.TotalTransationToday}</span></td>

                    <td className="py-1 px-6 border-b text-left">Nagod: ৳ <span>{allTransationData[9]?.TotalPaymentMethodNogod}</span></td>
                  </tr>
                  <tr className=" transition duration-300">
                    <td className="py-1 px-6 border-b">Last Deposit: <span>{allTransationData[12]?.TodayLastTimeTransation}</span></td>

                    <td className="py-1 px-6 border-b text-left"></td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full  text-left border mx-auto  my-6">
                <thead>
                  <tr className="bg-color text-white">
                    <th className="py-3 px-6 text-left border-b">
                      Total Withdrawal
                    </th>

                    <th className="py-3 px-6  border-b text-left">
                      Payment Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" text-left transition duration-300">
                    <td className="py-1 px-6 border-b">
                      BDT: ৳ <span> {allTransationData[4]?.TotalWithdrawalAmount}</span>{" "}
                    </td>

                    <td className="py-1 px-6 border-b text-left">
                      bKash: ৳{" "}
                      <span>
                        {allTransationData[6]?.TotalPaymentMethodbkash}
                      </span>
                    </td>
                  </tr>
                  <tr className=" transition duration-300">
                    <td className="py-1 px-6 border-b">
                      Credits: ৳{" "}
                      <span>
                        {" "}
                        {allTransationData[5]?.TotalWithdrawalCredit?.toFixed(2)}
                      </span>
                    </td>

                    <td className="py-1 px-6 border-b text-left">
                      Rocket: ৳{" "}
                      <span>
                      {allTransationData[7]?.TotalPaymentMethodRoket}
                      </span>
                    </td>
                  </tr>
                  <tr className=" transition duration-300">
                    <td className="py-1 px-6 border-b">Unique Agents: <span>{allTransationData[14]?.uniqueCustomers}</span></td>

                    <td className="py-1 px-6 border-b text-left">Upay: ৳ <span>{allTransationData[8]?.TotalPaymentMethodUpay}</span></td>
                  </tr>
                  <tr className=" transition duration-300">
                    <td className="py-1 px-6 border-b">Total Count: <span>{allTransationData[11]?.TotalTransationToday}</span></td>

                    <td className="py-1 px-6 border-b text-left">Nagod: ৳ <span>{allTransationData[9]?.TotalPaymentMethodNogod}</span></td>
                  </tr>
                  <tr className=" transition duration-300">
                    <td className="py-1 px-6 border-b">Last Deposit: <span>{allTransationData[12]?.TodayLastTimeTransation}</span></td>

                    <td className="py-1 px-6 border-b text-left"></td>
                  </tr>
                  <tr className=" transition duration-300">
                    <td className="py-1 px-6 border-b text-color">Need Balence: <span>{allTransationData[13]?.NeedBalenceWD}</span></td>

                    <td className="py-1 px-6 border-b text-left"></td>
                  </tr>
                  <tr className=" transition duration-300">
                    <td className="py-1 px-6 border-b text-color">Need Point: <span>{needPoint.toFixed(2)}</span></td>

                    <td className="py-1 px-6 border-b text-left"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            {!showOrderDetails && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <form className="max-w-md mx-auto bg-white rounded p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Order Management
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="customerId"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Customer ID
                    </label>
                    <select
                      id="customerId"
                      name="customerId"
                      value={customerId}
                      onChange={handleCustomerIdChange}
                      className="w-full border border-color focus:border-color active:border-color rounded px-3 py-2"
                    >
                      {userDataList?.map((item, index) => (
                        <option key={index} value={item?.uniqueId}>
                          {item?.uniqueId}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="transactionType"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Transaction Type
                    </label>
                    <select
                      id="transactionType"
                      name="transactionType"
                      className="w-full border border-color rounded px-3 py-2"
                      onChange={handleTransactionTypeChange}
                      value={transactionType}
                    >
                      {transType === "Withdraw" ? (
                        <>
                          <option value="Deposit">Deposit</option>
                          <option value="Withdraw">Withdraw</option>
                        </>
                      ) : (
                        <option value="Deposit">Deposit</option>
                      )}
                    </select>
                  </div>
                  {showTransactionNumber &&  transactionType === "Deposit" &&(
                    <div className="mb-4">
                      <label
                        htmlFor="transactionNumber"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Transaction Number
                      </label>
                      <input
                        type="text"
                        id="transactionNumber"
                        name="transactionNumber"
                        value={transectionNumber}
                        onChange={(e) =>
                          setShowTransactionvalue(e.target.value)
                        }
                        className="w-full border border-color rounded px-3 py-2"
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      htmlFor="amount"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Amount
                    </label>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      id="amount"
                      name="amount"
                      className="w-full border border-color rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="paymentType"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Payment Type
                    </label>
                    <select
                      id="paymentType"
                      name="paymentType"
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="w-full border border-color rounded px-3 py-2"
                    >
                      <option value="bkash">Bkash</option>
                      <option value="nagod">Nagod</option>
                      <option value="rocket">Rocket</option>
                      <option value="upay">Upay</option>
                      <option value="bank">Bank</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-color hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
            {showOrderDetails && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                <div className="mb-4">
                  <label
                    htmlFor="orderId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Order ID
                  </label>
                  <div className="flex items-center justify-between border border-color rounded-md py-2 px-4">
                    <span>{orderId}</span>
                    <button
                      onClick={() => copyText(orderId)}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="points"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Points
                  </label>
                  <div className="flex items-center justify-between border border-color rounded-md py-2 px-4">
                    <span>{points?.toFixed(2)}</span>
                    <button
                      onClick={() => copyText(points)}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                {transactionType === "Withdraw" && (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="points"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Transaction Id
                      </label>
                      <input
                        type="text"
                        placeholder="Type Phone Number"
                        value={trans}
                        onChange={(e) => setTrans(e.target.value)}
                        id="phoneNumber"
                        name="phoneNumber"
                        className="w-full border border-color rounded px-3 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="Type Phone Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        id="phoneNumber"
                        name="phoneNumber"
                        className="w-full border border-color rounded px-3 py-2"
                      />
                    </div>
                  </>
                )}
                <div>
                  <button
                    onClick={handleSentData}
                    className="bg-color hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none mr-4"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="bg-black text-white font-semibold py-2 px-4 rounded-md focus:outline-none mr-4"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
