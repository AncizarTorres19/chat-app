//Dependencies
import { createContext, useReducer } from "react";
//Reducer
import { chatReducer } from "./ChatReducer";


export const ChatContext = createContext();

const initialState = {
    uid: '',
    chatActivo: null, // UID del usuario al que yo quiero enviar mensajes
    usuarios: [], // Todos los usuarios de la base de datos
    mensajes: [], // El chat seleccionado
}


export const ChatProvider = ({ children }) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState)

    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            {children}
        </ChatContext.Provider>
    )
}