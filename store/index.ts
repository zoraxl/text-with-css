import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { Tag, validTags } from '../constants';



type StyleFormsList = {
  id: number;
  html: number;
};


export type Style = {
    id: number;
    name: string;
    tag: Tag;
    htmlStyle: string;
}

export interface AppState {
    index: {
        configInd: number;
    }
    style: {
        config: Style[],
        styleForms: StyleFormsList[]
    }
    textArea: {
        textAreaStack: string[];
        inputValue: string;
    }
    
}

export interface ConfigSlice {
    config: Style[],
    styleForms: StyleFormsList[],
}

export interface TextAreaSlice {
    textAreaStack: string[],
    inputValue: string,
}


const initialTextAreaStack: TextAreaSlice = {
    textAreaStack: ['<span className="text-cyan-500"> Please enter your text to start styling </span>'],
    inputValue: '<span className="text-cyan-500"> Please enter your text to start styling </span>'
}

const textAreaSlice = createSlice({
    name: 'textAreaStack',
    initialState: initialTextAreaStack,
    reducers: {
        addToStack(state, action) {
            state.textAreaStack = [
                ...state.textAreaStack,
                action.payload
            ]
        },
        popFromStack(state){
            if (state.textAreaStack.length > 0 ){
                state.textAreaStack = [...state.textAreaStack.slice(0, -1)]
            }
            
        },

        updateStack(state, action){
            state.textAreaStack = action.payload;
        },
        updateInputValue(state, action){
            state.inputValue = action.payload
        }
    }
})

const initialConfigIndState = {
    configInd: 2
}

const configIndSlice = createSlice({
    name: 'configInd',
    initialState: initialConfigIndState,
    reducers: {
        increment(state) {
            state.configInd = state.configInd + 1;
        }
    }
})

const initialStyleState: ConfigSlice = {
    config: [
        {id: 1, name: 'Style 1', tag: validTags[1], htmlStyle: `className="text-cyan-500"`}
    ],
    styleForms: [{id: 1, html: 1}],
}

const styleSlice = createSlice({
    name: 'styleConfig',
    initialState: initialStyleState,
    reducers: {
        addStyle(state, action) {
            state.config = [
                ...state.config,
                action.payload
            ]
        },
        removeStyle(state, action) {
            state.config = state.config.filter((style)=> style.id !== action.payload)
        },
        updateStyle(state, action) {
            state.config = state.config.map(
                (style) => {
                    if (style.id === action.payload.id) {
                        return action.payload;
                    }
                    return style
                })
        },
        addStyleForm(state, action) {
            state.styleForms = [
                ...state.styleForms,
                action.payload
            ]
        },
        removeStyleForm(state, action) {
            state.styleForms = state.styleForms.filter((form) => form.id !== action.payload)
        }
    }
})

// Add persist store

const persistConfig = {
    key: 'root',
    storage,
  };


const stylePersistReducer = persistReducer(persistConfig, styleSlice.reducer);
const textAreaPersistReducer = persistReducer(persistConfig, textAreaSlice.reducer);
const indexReducer = persistReducer(persistConfig, configIndSlice.reducer)

const store = configureStore({
    reducer: {
        style: stylePersistReducer,
        textArea: textAreaPersistReducer,
        index: indexReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);


export {store, persistor};
export const styleActions = styleSlice.actions;
export const textAreaActions = textAreaSlice.actions;
export const configIndActions = configIndSlice.actions;