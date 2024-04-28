import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const [dropDownState, setDropDownState] = useState(false);
  const dropDownMenuRef = useRef();

  useEffect(() => {
    const closeDropDown = (e) => {
      if (!dropDownMenuRef?.current?.contains(e?.target)) {
        setDropDownState(false);
      }
    };

    document.addEventListener("mousedown", closeDropDown);

    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, [])

  return (
    <nav className="flex items-center justify-between bg-color rounded-md px-4  py-2 text-white">
      <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
        <h2>Sarowar</h2>
      </div>
      <ul className="hidden items-center justify-between gap-10 md:flex">
        <li className="group flex  cursor-pointer flex-col">
          <Link className={isActive('/') ? 'text-white font-bold' : ''} to={"/"}>Dashboard</Link>
          <span className={`mt-[2px] h-[3px] w-[0px] rounded-full bg-white transition-all duration-300 ${isActive('/') ? 'w-full' : ''}`}></span>
        </li>
        <li className="group flex  cursor-pointer flex-col">
          <Link className={isActive('/customer-list') ? 'text-white font-bold' : ''} to={"/customer-list"}>Customer List</Link>
          <span className={`mt-[2px] h-[3px]  w-[0px] rounded-full bg-white transition-all duration-300 ${isActive('/customer-list') ? 'w-full' : ''}`}></span>
        </li>
        <li className="group flex  cursor-pointer flex-col">
          <Link className={isActive('/transaction-records') ? 'text-white font-bold' : ''} to={"/transaction-records"}>Transaction Record</Link>
          <span className={`mt-[2px] h-[3px]  w-[0px] rounded-full bg-white transition-all duration-300 ${isActive('/transaction-records') ? 'w-full' : ''}`}></span>
        </li>
      </ul>
      <div
        ref={dropDownMenuRef}
        onClick={() => setDropDownState(!dropDownState)}
        className="relative flex transition-transform md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer"
        >
          {" "}
          <line x1="4" x2="20" y1="12" y2="12" />{" "}
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />{" "}
        </svg>
        {dropDownState && (
          <ul className=" z-10  gap-2  bg-[#393E46]  absolute right-0 top-11 flex w-[200px] flex-col  rounded-lg   text-base ">
            <li className="group flex  cursor-pointer flex-col">
              <Link className={isActive('/') ? 'text-white font-bold' : ''} to={"/"}>Dashboard</Link>
              <span className={`mt-[2px] h-[3px] w-[0px] rounded-full bg-white transition-all duration-300 ${isActive('/') ? 'w-full' : ''}`}></span>
            </li>
            <li className="group flex  cursor-pointer flex-col">
              <Link className={isActive('/customer-list') ? 'text-white font-bold' : ''} to={"/customer-list"}>Customer List</Link>
              <span className={`mt-[2px] h-[3px]  w-[0px] rounded-full bg-white transition-all duration-300 ${isActive('/customer-list') ? 'w-full' : ''}`}></span>
            </li>
            <li className="group flex  cursor-pointer flex-col">
              <Link className={isActive('/transaction-records') ? 'text-white font-bold' : ''} to={"/transaction-records"}>Transaction Record</Link>
              <span className={`mt-[2px] h-[3px]  w-[0px] rounded-full bg-white transition-all duration-300 ${isActive('/transaction-records') ? 'w-full' : ''}`}></span>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
