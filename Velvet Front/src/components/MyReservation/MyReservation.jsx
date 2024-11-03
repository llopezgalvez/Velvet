import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import './MyReservation.css'

export const MyReservation = () => {
    return (
        <>
            <NavBar />
            <section>
                <div class="container py-3">
                    <div class="card">
                        <div class="row ">
                            <div class="col-md-4">
                                <img src="https://i0.wp.com/foodandpleasure.com/wp-content/uploads/2020/10/65345792-h1-facb_angular_pool_view_300dpi.jpg?fit=2800%2C1867&ssl=1" class="w-100 c" />
                            </div>
                            <div class="col-md-8 px-3">
                                <div class="card-block px-3">
                                    <h4 class="card-title">Lorem ipsum dolor sit amet</h4>
                                    <p class="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                    <p class="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <a href="#" class="btn btn-primary">Read More</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section >
        </>
    )
}
