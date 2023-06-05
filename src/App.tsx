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
  const [pdf, setPdf] = useState("");

  async function compile() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    const response2 = await invoke("compile", { code: latexCode });
    setPdf(response2 as string);
    console.log(response2);
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
        <button onClick={() => compile()} className="bg-blue-500 p-2">
          Compile
        </button>
      </Transition>
      <div className="h-full bg-gray-100">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-4xl font-bold text-black">{pdf}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
