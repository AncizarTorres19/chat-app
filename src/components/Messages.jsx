//Dependencies
import { useContext, useEffect } from "react";
//Context
import { ChatContext } from "../context/chat/ChatContext";
//Components
import { IncomingMsg } from "./IncomingMsg"
import { OutgoingMsg } from "./OutgoingMsg"
import { SendMessages } from "./SendMessages"
import { AuthContext } from "../auth/AuthContex";
//Helpers
import { scrollToBottomAnimated } from "../helpers/ScrollToBotton";

export const Messages = () => {

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        scrollToBottomAnimated('mensajes');
    }, [chatState.mensajes]);

    return (
        <div className="mesgs">

            <div
                id="mensajes"
                className="msg_history"
            >

                {
                    chatState.mensajes.map((msg) => (
                        (msg.para === auth.uid)
                            ? <IncomingMsg key={msg._id} msg={msg} /> // Mensaje recibido
                            : <OutgoingMsg key={msg._id} msg={msg} /> // Mensaje enviado
                    ))
                }

            </div>


            <SendMessages />

        </div>
    )
}
