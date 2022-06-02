import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/react-logo.svg";
const _Navbar = () => {
  //component state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  // navigation
  const navigate = useNavigate();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, setUser]);

  //callback functions
  const handleLogout = () => {
    // dispatch to remove profile from localstorage.
    dispatch(logout());
    setUser(null);
    navigate("/");
  };

  const darkmodeSwitch = () => setDarkMode((prevState) => !prevState);
  return (
    <header className=" my-5">
      <nav className=" flex  h-auto shadow-2xl rounded-lg bg-white  navbar  py-10 md:py-15   max-h-16 relative  items-center w-full justify-between flex-nowrap ">
        {/* <!-- flex left side navbar  --> */}

        {/* grid for website name, avater and username */}
        <div
          className=" grid grid-cols-[4fr,1fr,1fr] gap-4  justify-center m-2 items-center
      space-y-1 "
        >
          {/* <!-- website title --> */}
          <Link to="/">
            <h4 className="text-xs tracking-normal font-medium leading-loose sm:text-lg  md:text-xl">
              social media app
            </h4>
          </Link>
          {user ? (
            <>
              {/* <!-- avatar --> */}
              <div className="  h-12 w-12  rounded-full flex items-center justify-center text-white  bg-slate-400 flex-shrink-0 text-center relative">
                {user?.result?.name?.charAt(0)}
              </div>
              {/* <!-- username --> */}
              <div className="text-xs antialiased font-medium tracking-wide sm:text-xl ">
                {user?.result?.name}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {/* end grid div */}

        {/* <!--flex right side navbar  --> */}
        <div className=" flex justify-around items-center  m-2 w-1/2 md:w-1/5 flex-row  space-y-1 ">
          <div>
            {darkMode ? (
              <button onClick={() => darkmodeSwitch()} className="pt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <button onClick={() => darkmodeSwitch()} className="pt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </button>
            )}
          </div>
          {user ? (
            <>
              <button
                type="button"
                onClick={handleLogout()}
                className=" md:w-30  h-auto inline-block px-2 py-2.5 bg-purple-700 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-purple-500 hover:shadow-lg focus:bg-purple-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out md:text-lg"
              >
                logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <button className=" md:w-30  h-auto inline-block px-2 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out md:text-lg">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default _Navbar;
