//Dependencies
import moment from "moment/moment";
//Routes
import { AppRouter } from './router/AppRouter'
//Context
import { SocketProvider } from './context/SocketContext'
import { ChatProvider } from './context/chat/ChatContext'
import { AuthProvider } from './auth/AuthContex'


//Configuración de moment en español
import 'moment/locale/es';
moment.locale('es');

export const ChatApp = () => {
    return (
        <ChatProvider>
            <AuthProvider>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </AuthProvider>
        </ChatProvider>
    )
}
