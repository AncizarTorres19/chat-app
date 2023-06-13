//Dependencies
import { useContext, useEffect, createContext } from 'react';
//Hooks
import { useSocket } from '../hooks/useSocket'
//Context
import { AuthContext } from '../auth/AuthContex';
import { ChatContext } from './chat/ChatContext';
//Types
import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/ScrollToBotton';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, connectSocket, disconnectSocket } = useSocket('http://localhost:8080');

    const { auth } = useContext(AuthContext);

    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        if (auth.logged) {
            connectSocket();
        }
    }, [auth, connectSocket])

    useEffect(() => {
        if (!auth.logged) {
            disconnectSocket();
        }
    }, [auth, disconnectSocket])

    //Escuchar los cambios en los usuarios conectados
    useEffect(() => {
        socket?.on('lista-usuarios', (usuarios) => {
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            })
        })
    }, [socket, dispatch])

    //Escuchar los mensajes personales
    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje) => {
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            });

            scrollToBottomAnimated('mensajes');
        })
    }, [socket, dispatch])


    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}