//Dependencies
import { useContext } from "react";
//Context
import { ChatContext } from "../context/chat/ChatContext";
//Types
import { types } from "../types/types";
//Helpers
import { scrollToBottom, scrollToBottomAnimated } from "../helpers/ScrollToBotton";
//Api
import { fetchConToken } from "../helpers/fetch";

export const SidebarChatItem = ({ urlImg, usuario }) => {

    const { chatState, dispatch } = useContext(ChatContext);

    const { chatActivo } = chatState;

    const onClick = async () => {
        dispatch({
            type: types.activarChat,
            payload: usuario.uid
        })

        // Cargar los mensajes del chat seleccionado
        const resp = await fetchConToken(`mensajes/${usuario.uid}`)
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        })

        // scrollToBottom('mensajes');
        scrollToBottomAnimated('mensajes');

    }

    return (
        <div
            className={`chat_list ${usuario.uid === chatActivo && 'active_chat'}`}
            onClick={onClick}
        >

            <div className="chat_people">
                <div className="chat_img">
                    <img src={urlImg} alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{usuario.name}</h5>
                    {
                        (usuario.online)
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>

        </div>
    )
}
