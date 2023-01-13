import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { StyleButton } from "./styleButton";
import { RevertButton } from "./revertButton";
import { Config } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { textAreaActions } from "../store/index";
import { ConfigDialog } from "./configDialog";
import Editor, { Monaco } from "@monaco-editor/react";

export const MyInput: React.FC = () => {
  // const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const editorRef = React.useRef(null);
  const inputValue = useSelector(
    (state: AppState) => state.textArea.inputValue
  );
  // const defaultValue = `<span className="text-cyan-500"> Please enter your text to start styling </span>`;
  const [renderedDiv, setRenderedDiv] = useState<JSX.Element>(<div>{HTMLReactParser(inputValue)}</div>);
  const config = useSelector((state: AppState) => state.style.config);
  const dispatch = useDispatch();
  const handleChange = (value: string | undefined) => {
    updateInput(value ? value : "");

  };

  function updateInput(value: string) {
    dispatch(textAreaActions.updateInputValue(value));
  }

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

  React.useEffect(() => {

    setRenderedDiv(
      <>{HTMLReactParser(`${inputValue}`)}</>
    );
  }, [inputValue, editorRef]);

  return (
    <div className="">
      <div className="w-screen  p-4">
        <div>
          <div className="space-y-4">
          <div className="inline-flex items-center space-x-4 px-4 "> 
            <ConfigDialog></ConfigDialog> 
            <RevertButton inputRef={editorRef}></RevertButton>
          </div>
          <div className="px-4 max-w-screen items-center grid grid-flow-col auto-cols-max">
          

          {React.Children.toArray(
            config.map((style) => (
              <>
                <StyleButton config={style} inputRef={editorRef}></StyleButton>
              </>
            ))
          )}

          </div>
          </div>

        
          <div className="mx-2 my-4">
            <label className="mx-4 text-amber-400 font-bold text-lg">
              Raw Text:
              <div className="my-2 ">
                <Editor
                  height="25vh"
                  defaultLanguage="html"
                  defaultValue={inputValue}
                  onChange={handleChange}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="m-2 my-4 rounded-lg  bg-neutral-800/80">
          <label className="mx-4 text-amber-400 font-bold text-lg">You entered: </label>
          <div className="h-96 p-2 bg-neutral-200 m-2 rounded-lg">
            {renderedDiv}
          </div>
        </div>
      </div>
    </div>
  );
};
