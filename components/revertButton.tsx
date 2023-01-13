import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, textAreaActions } from "../store/index";
import * as monaco from 'monaco-editor';
interface RevertButtonProps {
  inputRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | null>;
}

export function RevertButton(props: RevertButtonProps) {

  
  const dispatch = useDispatch();
  const textAreaStack = useSelector(
    (state: AppState) => state.textArea.textAreaStack
  );
  const revertStyle = (editor: monaco.editor.IStandaloneCodeEditor) => {

    const model = editor.getModel();
    if (!model) return;

    if (textAreaStack.length > 0){
      const newValue = textAreaStack.at(-1);
      dispatch(textAreaActions.popFromStack())
      console.log("🚀 ~ file: revertButton.tsx:32 ~ revertStyle ~ newValue", newValue)
      console.log("🚀 ~ file: revertButton.tsx:13 ~ RevertButton ~ textAreaStack", textAreaStack)
      if (newValue) {
        model.setValue(newValue);
        dispatch(textAreaActions.updateInputValue(newValue))
        
        
        // dispatch(textAreaActions.popFromStack());
        
      }
    }

  }

  return (
    <>
      <button
        className="justify-center rounded-md border border-transparent bg-amber-300 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
        onClick={() => revertStyle(props.inputRef.current!)}
      >
        Revert
      </button>
    </>
  );
}
