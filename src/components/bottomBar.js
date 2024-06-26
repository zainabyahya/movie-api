import React from "react";
import { BsPerson } from "react-icons/bs";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { BiCameraMovie } from "react-icons/bi";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa";

const BottomBar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };
  return (
    <div className="bg-[#1C2026] fixed bottom-0 w-full h-20 flex justify-between items-center lg:hidden">
      <div className="w-full text-white flex justify-around self-center">
        <div className="flex flex-col">
          <Link to={"/"} className="flex flex-col items-center justify-center">
            <GrHomeRounded className="self-center size-7" /> <p>Home</p>
          </Link>
        </div>
        <div className="flex flex-col">
          <BiCameraMovie className="self-center size-7" />
          <DropdownMenu
            isOpen={isOpen}
            selectedOption={selectedOption}
            toggleDropdown={toggleDropdown}
            handleOptionClick={handleOptionClick}
          />
        </div>
        <Link
          to={"/actors"}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col">
            <MdOutlineTheaterComedy className="self-center size-7" />
            <p>Actors</p>
          </div>
        </Link>
        <div className="flex flex-col ">
          <Link
            to={"./bookmarked"}
            className="self-center flex flex-col items-center justify-center"
          >
            <FaRegBookmark className="self-center size-6" />
            <p>Mark</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
