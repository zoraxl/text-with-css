import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, Style, textAreaActions } from "../store";
import * as monaco from 'monaco-editor';
interface StyleButtonProps {
  inputRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | null>;
  config: Style;
}

export function StyleButton(props: StyleButtonProps) {
  // const textAreaStack = useSelector(
  //   (state: AppState) => state.textArea.textAreaStack
  // );
  const dispatch = useDispatch();
  const style = (editor: monaco.editor.IStandaloneCodeEditor) => {

    const model = editor.getModel();
    const preValue = model?.getValue();
    if (preValue){
      dispatch(textAreaActions.addToStack(preValue))
    }
    const selection = editor.getSelection();
    const selectedText = selection && model ? model.getValueInRange(selection): null;
    const modifiedSelection = `<${props.config.tag.name} ${props.config.htmlStyle}>${selectedText}</${props.config.tag.name}>`
    if(selectedText && selection) {
      editor.executeEdits("source", [{
        range: selection,
        text: modifiedSelection,
      }])
      const currentValue = model? model.getValue(): null;
      if(currentValue){
        dispatch(textAreaActions.updateInputValue(currentValue));
      }
      
    } 


  };

  return (
    <>
      <button
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={()=> style(props.inputRef.current!)}
      >
        {props.config.name}
      </button>
      <div className="m-2"></div>
    </>
  );
}
