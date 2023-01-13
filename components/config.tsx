import { Listbox, Transition } from "@headlessui/react";
import * as React from "react";
import { validTags } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { AppState, configIndActions, styleActions } from "../store/index";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// import HTMLReactParser from "html-react-parser";

interface ConfigFormProps {
  index: number;
}

function ConfigForm(props: ConfigFormProps) {
  const [selected, setSelected] = React.useState(validTags[0].name);
  const currentConfig = useSelector((state: AppState) => {
    return state.style.config.find((style) => style.id === props.index);
  });
  const dispatch = useDispatch();

  const [tag, setTag] = React.useState(
    currentConfig ? currentConfig.tag : validTags[0]
  );
  const [htmlStyle, setHtmlStyle] = React.useState(
    currentConfig ? currentConfig.htmlStyle : ""
  );
  const [name, setName] = React.useState(
    currentConfig ? currentConfig.name : ""
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value;
    // dispatch(styleActions.updateHTML({id: props.index, htmlStyle: code}));
    setHtmlStyle(code);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch(styleActions.updateName({id: props.index, name: event.target.value}));
    setName(event.target.value);
  };

  function updateStyles() {
    const updateName = name ? name : `Style ${props.index}`;
    dispatch(
      styleActions.updateStyle({
        id: props.index,
        tag: tag,
        htmlStyle: htmlStyle,
        name: updateName,
      })
    );
  }

  function handleRemoveStyleFormClick(id: number) {
    const index = id;
    dispatch(styleActions.removeStyleForm(index));
    dispatch(styleActions.removeStyle(index));
  }

  return (
    <div className="w-full md:flex inline-block p-2 ml-1 items-start">
      <input
        id="name"
        value={name}
        className="mx-1 mr-4 w-1/4 relative cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        onChange={handleNameChange}
      />
      <div className="flex items-start w-3/4">
        <span className="pt-2 pr-1 font-bold">{`<`}</span>

        <div className="relative">
          <Listbox value={tag} onChange={setTag}>
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{tag.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {validTags.map((validTag) => (
                  <Listbox.Option
                    key={validTag.id}
                    value={validTag}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-6 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {validTag.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 px-2 flex items-center  text-amber-600">
                            <CheckIcon className="h-3 w-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>

        <span className="grow">
          <input
            id="code"
            className= "cursor-default relative w-full rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            value={htmlStyle}
            onChange={handleChange}
          />
        </span>
        <span className="pt-2 pl-1 font-bold">{">"}</span>

        <div className="flex mx-1 space-x-1 pt-2 pl-1 ">
          <button onClick={updateStyles}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button onClick={() => handleRemoveStyleFormClick(props.index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function Config() {
  // const [styleForms, setStyleForms] = React.useState<StyleFormsList[]>([]);
  // const [currentInd, setCurrentInd] = React.useState<number>(0);

  const config = useSelector((state: AppState) => state.style.config);
  const configInd = useSelector((state: AppState) => state.index.configInd);
  const styleForms = useSelector((state: AppState) => state.style.styleForms);

  const dispatch = useDispatch();

  function handleAddStyleFormClick() {
    // const html = ReactDOMServer.renderToStaticMarkup(<ConfigForm index={index}></ConfigForm>)
    dispatch(configIndActions.increment());

    const index = configInd;
    console.log(
      "🚀 ~ file: config.tsx:127 ~ handleAddStyleFormClick ~ index",
      index
    );

    dispatch(
      styleActions.addStyle({
        id: index,
        tag: validTags[0],
        htmlStyle: "",
        name: `Style ${index}`,
      })
    );
    dispatch(
      styleActions.addStyleForm({
        id: index,
        html: index,
      })
    );
    console.log("🚀 ~ file: config.tsx:113 ~ Config ~ styleForms", styleForms);
  }
  return (
    <>
      <div>
        {React.Children.toArray(
          styleForms.map((item) => (
            <div className="w-full">
              <div>
                <ConfigForm index={item.id}></ConfigForm>
              </div>
            </div>
          ))
        )}

        <button onClick={() => handleAddStyleFormClick()} className="my-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
