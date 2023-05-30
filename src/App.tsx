import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Transition } from "@headlessui/react";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <Transition
        show={isOpen}
        enter="transition-all duration-500"
        enterFrom="opacity-0 transform translate-x-[-100%]"
        enterTo="opacity-100 transform translate-x-0"
        leave="transition-all duration-500"
        leaveFrom="opacity-100 transform translate-x-0"
        leaveTo="opacity-0 transform translate-x-[-100%]"
      >
        <div className="w-1/2 h-full bg-white overflow-auto p-4">
          <pre className="text-sm text-gray-800"></pre>
        </div>
      </Transition>

      <Transition
        show={!isOpen}
        enter="transition-all duration-500"
        enterFrom="opacity-0 transform translate-x-[100%]"
        enterTo="opacity-100 transform translate-x-0"
        leave="transition-all duration-500"
        leaveFrom="opacity-100 transform translate-x-0"
        leaveTo="opacity-0 transform translate-x-[100%]"
      >
        <div className="w-1/2 h-full bg-white overflow-auto p-4">
          <div className="text-sm text-gray-800">
            {/* Your LaTeX output goes here */}
          </div>
        </div>
      </Transition>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded"
      >
        Toggle View
      </button>
    </div>
  );
}

export default App;
