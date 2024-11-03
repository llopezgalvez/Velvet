import './NavBar.css'
import LogoVelvet from '../../assets/LogoVelvet.png'

import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand me-auto" href="/">
                        <img src={LogoVelvet} alt="Logo" />
                    </a>

                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Logo</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li class="nav-item">
                                    <a class="nav-link mx-lg-2 active" aria-current="page" href="/">Home</a>
                                </li>
                                <li class="nav-item mx-lg-2 ">
                                    <Link to={'/viewGraphics'}><a class="nav-link" >Ver Estadisticas de los hoteles</a></Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <Link className='login-button' to={'/auth'}>Login</Link>
                    <button class="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </>
    )
}
