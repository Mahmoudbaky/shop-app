import React from "react";
import AddProdBtn from "./AddProdBtn";

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul className="flex justify-center gap-8">
          <li>Log out</li>
          <li>
            <AddProdBtn />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
