import React, { useState } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import {
  IoMdAdd,
  IoMdSave,
  IoMdArrowDropdown,
  IoIosApps,
} from "react-icons/io";

const Navbar = ({
  fileName,
  handleNewFile,
  handleSaveFile,
  compile,
}: {
  fileName: string | undefined;
  handleNewFile: () => void;
  handleSaveFile: () => void;
  compile: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center z-10">
      <h1 className="text-lg font-semibold">
        {fileName || "No File Selected"}
      </h1>
      <div className="space-x-4">
        <button
          className="px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={compile}
        >
          <IoIosApps className="inline-block mr-1" /> Compile
        </button>
        <button
          className="px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleNewFile}
        >
          <IoMdAdd className="inline-block mr-1" /> New File
        </button>
        <button
          className="px-3 py-2 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={handleSaveFile}
        >
          <IoMdSave className="inline-block mr-1" /> Save
        </button>
        <HeadlessMenu as="div" className="relative inline-block text-left">
          {({ open }) => (
            <>
              <div>
                <HeadlessMenu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:visible:ring-2 focus:visible:ring-white focus:visible:ring-opacity-75">
                  <span>More</span>
                  <IoMdArrowDropdown
                    className="ml-2 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </HeadlessMenu.Button>
              </div>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                {(ref) => (
                  <HeadlessMenu.Items
                    ref={ref}
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Action 1
                          </button>
                        )}
                      </HeadlessMenu.Item>
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Action 2
                          </button>
                        )}
                      </HeadlessMenu.Item>
                    </div>
                  </HeadlessMenu.Items>
                )}
              </Transition>
            </>
          )}
        </HeadlessMenu>
      </div>
    </div>
  );
};

export default Navbar;
