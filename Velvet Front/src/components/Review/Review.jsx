import React, { useEffect, useState } from 'react';
import './Review.css'
import { useParams } from 'react-router-dom';
import { getReviewByHotelIdRequest } from '../../services/apiReview';

// Definición del componente StarRating
const StarRating = ({ stars }) => {
    const starIcons = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= stars) {
            starIcons.push(<span key={i} className="star">&#9733;</span>); // Estrella llena
        } else {
            starIcons.push(<span key={i} className="star">&#9734;</span>); // Estrella vacía
        }
    }

    return <div className="star-rating">{starIcons}</div>;
};


export const Review = () => {
    const { id } = useParams(); // Obtiene el ID del hotel de la URL

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Realiza la solicitud al backend para obtener las revisiones por ID de hotel
                const response = await getReviewByHotelIdRequest(id); // Reemplaza 'hotelId' con el ID del hotel específico
                if (response.error) {
                    console.error('Error fetching reviews:', response.err);
                } else {
                    setReviews(response.data.reviews); // Establece las revisiones en el estado local
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <>
            <section>
                <div className="row text-center d-flex align-items-stretch">
                    {reviews.map((review, index) => (
                        <div key={index} className="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
                            <div className="card testimonial-card">
                                <div className="card-up"></div>
                                <div className="avatar mx-auto bg-white">
                                    <img src="https://media.istockphoto.com/id/1393750072/es/vector/icono-blanco-plano-hombre-para-dise%C3%B1o-web-silueta-ilustraci%C3%B3n-plana-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=UoORARzrQOgxK6buPfciwLwAuYfijYWDSSaa5f0q-d8="
                                        className="rounded-circle img-fluid" alt="User Avatar" />
                                </div>
                                <div className="card-body">
                                <h4 className="">{review.user.name}</h4>
                                
                                    <p className="dark-grey-text mt-4">
                                        <i className="fas fa-quote-left pe-2"></i>{review.description}
                                        <StarRating stars={review.stars} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};
