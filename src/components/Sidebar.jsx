//Dependencies
import { useContext } from "react";
//Context
import { ChatContext } from "../context/chat/ChatContext";
//Components
import { SidebarChatItem } from "./SidebarChatItem"
import { AuthContext } from "../auth/AuthContex";

export const Sidebar = () => {


    const { chatState } = useContext(ChatContext);

    const { auth } = useContext(AuthContext);

    const { uid } = auth;

    return (
        <div className="inbox_chat">

            {
                chatState.usuarios
                    .filter((usuario) => usuario.uid !== uid)
                    .map((usuario) => (
                        <SidebarChatItem
                            key={usuario.uid}
                            usuario={usuario}
                            urlImg={"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"}
                        />
                    ))
            }

            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>


        </div>
    )
}
