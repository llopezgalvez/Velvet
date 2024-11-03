import Hotel from '../../assets/Hotel.jpg'
import { Link } from 'react-router-dom'
import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import './Login.css'

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData.email, formData.password);
        if (success) {
            // Redirige al usuario a la página principal después del inicio de sesión exitoso
            window.location.href = "/";
        }
    }

    return (
        <div id="main-wrapper" className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div className="card border-0">
                        <div className="card-body p-0">
                            <div className="row no-gutters">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="mb-5">
                                            <h3 className="h4 font-weight-bold text-theme">INICIA SESIÓN</h3>
                                        </div>

                                        <h6 className="h5 mb-0">Bienvenid@ de vuelta</h6>
                                        <p className="text-muted mt-2 mb-5">Ingresa tu correo y tu contraseña para poder loguearte</p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Correo Electronico</label>
                                                <input value={formData.email} onChange={handleChange} name="email" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                            <div className="form-group mb-5">
                                                <label htmlFor="exampleInputPassword1">Contraseña</label>
                                                <input value={formData.password} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <button type="submit" className="btn btn-dark" data-mdb-ripple-init>Login</button>
                                        </form>
                                    </div>
                                </div>

                                <div className="col-lg-6 d-none d-lg-inline-block">
                                    <div className="account-block rounded-right">
                                        <div className="overlay rounded-right"></div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted text-center mt-3 mb-0">No tienes una cuenta?<Link to={'/register'}>Crear Cuenta</Link></p>
                </div>
            </div>
        </div>
    )
}
