import React, { useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  // State variables for order details
  const [orderId, setOrderId] = useState("");
  const [points, setPoints] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [transactionType, setTransactionType] = useState();
  const [showTransactionNumber, setShowTransactionNumber] = useState(false);
  const [customerId, setCUstomerId] = useState();
  const [transectionNumber, setShowTransactionvalue] = useState();
  const [amount, setAmount] = useState();
  const [paymentType, setPaymentType] = useState();
  const [searchValue, setSearchValue] = useState();

  const handleSentData = () => {
    const data = {
      customerId,
      transectionNumber,
      amount,
      paymentType,
      orderId,
      points,
    };
    fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (Response.ok) {
          console.log("data is successfully sent");
          toast.success("Successfully New User Created!");
        } else {
          console.error("Failed to send data");
          toast.error("Failed to create Customer");
        }
      })
      .catch((error) => {
        console.error("Network error", error);
        toast.error("Network error");
      });
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
    setShowTransactionNumber(e.target.value === "deposit");
  };
  // Function to generate a random order ID
  const generateOrderId = () => {
    return "ORD-" + Math.floor(Math.random() * 1000000);
  };

  // Function to calculate points
  const calculatePoints = (amount) => {
    const points = amount / 100;
    return points;
  };

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

  const handleConditionData = (search) => {
    fetch(`http://localhost:5000/api?search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (Response.ok) {
          console.log("data is successfully sent");
          toast.success("Successfully New User Created!");
        } else {
          console.error("Failed to send data");
          toast.error("Failed to create Customer");
        }
      })
      .catch((error) => {
        console.error("Network error", error);
        toast.error("Network error");
      });
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    handleConditionData(e.target.value);
  };
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
            onClick={() => handleConditionData("this-week")}
            className="rounded-lg bg-color px-4   hover:bg-orange-600 py-2  text-white duration-300 active:scale-95 "
          >
            This Week
          </button>
          <button
            onClick={() => handleConditionData("last-week")}
            className="rounded-lg bg-color px-4   hover:bg-orange-600 py-2  text-white duration-300 active:scale-95 "
          >
            Last Week
          </button>
          <button
            onClick={() => handleConditionData("this-month")}
            className="rounded-lg bg-color px-4   hover:bg-orange-600 py-2  text-white duration-300 active:scale-95 "
          >
            This Month
          </button>
          <button
            onClick={() => handleConditionData("last-month")}
            className="rounded-lg bg-color px-4   hover:bg-orange-600 py-2  text-white duration-300 active:scale-95 "
          >
            Last Month
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-200 rounded-lg p-4">
            {/* Top Up content */}
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
                      onChange={(e) => setCUstomerId(e.target.value)}
                      className="w-full border border-color focus:border-color active:border-color rounded px-3 py-2"
                    >
                      <option value="Customer1">Customer1</option>
                      <option value="Customer2">Customer2</option>
                      <option value="Customer3">Customer3</option>
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
                      <option value="deposit">Deposit</option>
                      <option value="withdraw">Withdraw</option>
                    </select>
                  </div>
                  {showTransactionNumber && (
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
                    className="bg-color text-white font-bold py-2 px-4 rounded"
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
                    <span>{points}</span>
                    <button
                      onClick={() => copyText(points)}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleSentData}
                    className="bg-color  text-white font-semibold py-2 px-4 rounded-md  focus:outline-none mr-4"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="bg-black text-white font-semibold py-2 px-4 rounded-md  focus:outline-none mr-4"
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
