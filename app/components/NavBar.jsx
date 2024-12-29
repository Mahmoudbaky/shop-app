import React from "react";
import { supabase } from "../utils/supabaseClient";
import AddProdBtn from "./AddProdBtn";
import { TiThMenu } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const NavBar = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
  };

  return (
    <nav className="text-black bg-white">
      <ul className="border-2 border-red-400 mx-[2rem] p-4 flex justify-between text-2xl items-center flex-row gap-8 md:text-3xl xl:text-4xl">
        <li className="flex items-center gap-7 font-bold ">
          <TiThMenu />
          <span>shop</span>
        </li>
        <li>
          <div className="flex items-center gap-7">
            <FaSearch className="md:hidden xl:hidden" />
            <input
              type="text"
              placeholder="Search"
              className="md:block xl:block hidden border-2 h-[40px] w-[250px] border-gray-400 p-2 rounded-full bg-black border-opacity-50 text-lg"
            />
            <FaUser />
            <FaCartShopping />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

{
  /* <button onClick={handleSignOut}>Sign out</button> */
}

<AddProdBtn />;
