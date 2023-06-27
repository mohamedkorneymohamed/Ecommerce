import { createContext, useState } from "react";


 export let counterContext = createContext()

export function CounterContextProvider(props){
    let [userName, setUserName] = useState('mohamed')
    let [counter, setCounter] = useState(0)
    return <counterContext.Provider value={{userName , counter}}>
        {props.children}
    </counterContext.Provider>
}