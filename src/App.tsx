import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Transition } from "@headlessui/react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-latex";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [latexCode, setLatexCode] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  return (
    <div className=" min-h-screen bg-gray-100 w-full grid grid-cols-2">
      <Transition
        show={isOpen}
        enter="transition-all duration-500"
        enterFrom="opacity-0 transform translate-x-[-100%]"
        enterTo="opacity-100 transform translate-x-0"
        leave="transition-all duration-500"
        leaveFrom="opacity-100 transform translate-x-0"
        leaveTo="opacity-0 transform translate-x-[-100%]"
      >
        <div className=" h-full bg-gray-100 ">
          <AceEditor
            width="100%"
            height="100%"
            mode="latex"
            theme="monokai"
            onChange={setLatexCode}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            value={latexCode}
            className="w-full h-full"
          />
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
    </div>
  );
}

export default App;
