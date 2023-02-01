import App from "./App"
import { AuthContext } from './context/AuthContext';
import { reducer } from './context/AuthContext';
import { initialState } from './context/AuthContext';
import { useReducer } from "react";


export default function Routing() {
  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
        <App />
    </AuthContext.Provider>
  )
}
