//Dependencies
import { createContext, useCallback, useState, useContext } from "react";

//fetchSinToken es una funcion que hace un fetch sin el token
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
//Context
import { ChatContext } from "../context/chat/ChatContext";
//Types
import { types } from "../types/types";


export const AuthContext = createContext();


const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
}


export const AuthProvider = ({ children }) => {

    const { dispatch } = useContext(ChatContext);

    const [auth, setAuth] = useState(initialState);

    const login = async (email, password) => {

        const resp = await fetchSinToken('login', { email, password }, 'POST');

        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const { usuario } = resp;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.name,
                email: usuario.email
            })

        }
        return resp;
    }

    const register = async (name, email, password) => {
        const resp = await fetchSinToken('login/new', { name, email, password }, 'POST');

        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const { usuario } = resp;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.name,
                email: usuario.email
            })

        }
        return resp;
    }

    const verificaToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            })
            return false;
        }
        const resp = await fetchConToken('login/renew');

        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const { usuario } = resp;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.name,
                email: usuario.email
            })
            return true;
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            })
            return false;
        }


    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({
            type: types.cerrarSesion
        })
        setAuth({
            uid: null,
            checking: false,
            logged: false,
            name: null,
            email: null
        })
    }

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            logout,
            register,
            verificaToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
