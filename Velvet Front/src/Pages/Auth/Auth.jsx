import { Register } from "../../components/User/Register.jsx"
import { Login } from "../../components/User/Login.jsx"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import './Auth.css'


export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    const handleAuthPage = () => {
        setIsLogin(prev => !prev)
    }

    return (
        <>
            <div className="auth-container">
                {
                    isLogin ? (
                        <Login switchAuthHandler={handleAuthPage}></Login>
                    ) : (
                        <Register switchAuthHandler={handleAuthPage}></Register>
                    )
                }
                <Toaster position="bottom-right" reverseOrder={false} />
            </div>
        </>
    )
}