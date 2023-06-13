//Dependencies
import { useCallback, useContext, useEffect } from "react";

// Context
import { AuthContext } from "../auth/AuthContex";
//Routes
import { Navigation } from "./Navigation";

export const AppRouter = () => {

    const { auth, verificaToken } = useContext(AuthContext)

    const handleVerificaToken = useCallback(() => {
        verificaToken();
    }, [verificaToken]);

    useEffect(() => {
        handleVerificaToken();
    }, [handleVerificaToken]);

    if (auth.checking) {
        return <h1>Cargando...</h1>
    }


    return (
        <Navigation isAuthenticated={auth.logged} />
    )
}
