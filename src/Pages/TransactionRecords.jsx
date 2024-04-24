import React from "react";

const TransactionRecords = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-semibold mb-1 mt-5">
          Transaction Records History
        </h1>
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
    </div>
  );
};

export default TransactionRecords;
