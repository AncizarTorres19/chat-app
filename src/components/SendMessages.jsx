//Dependencies
import { useContext, useState } from "react"
//Context
import { AuthContext } from "../auth/AuthContex";
import { ChatContext } from "../context/chat/ChatContext"
import { SocketContext } from "../context/SocketContext";

export const SendMessages = () => {

    const { socket } = useContext(SocketContext);
    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);

    const [mensaje, setMensaje] = useState('')

    const onChange = ({ target }) => {
        setMensaje(target.value)
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (mensaje.length === 0) return;
        setMensaje('')

        socket.emit('mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje: mensaje
        });

        //TODO: Hacer el dispatch del mensaje
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        value={mensaje}
                        onChange={onChange}
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    )
}
