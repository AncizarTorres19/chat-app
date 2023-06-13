import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

//Routes
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AuthRouter } from "./AuthRouter";
//Components
import { ChatPage } from "../pages/ChatPage";

export const Navigation = ({ isAuthenticated }) => {
    return (
        // <Suspense fallback={<Spinner />}>
        <BrowserRouter>

            <Routes>
                <Route path="/auth/*" element={
                    <PublicRoute isAuthenticated={isAuthenticated}>
                        <AuthRouter />
                    </PublicRoute>
                } />

                <Route path="/*" element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <ChatPage />
                    </PrivateRoute>
                } />
            </Routes>

        </BrowserRouter>

        // </Suspense>
    )
}
