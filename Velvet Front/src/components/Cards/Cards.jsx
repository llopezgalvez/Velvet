import './Cards.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useHotels } from '../../hooks/useHotels'

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

export const Cards = () => {

    const { getHotels, hotels } = useHotels()


    useEffect(() => {
        getHotels()
    }, [])

    return (

        <>
        
            <div class="cards-1">
                <div class="container">
                    <div class="row">
                        {hotels.map((hotel) => (
                            <div key={hotel._id} class="col-md-4">
                                <div class="card card-blog">
                                    <Link to={`/hotel/listId/${hotel._id}`}>
                                        <div class="card-image">
                                            <img class="img" src={hotel.mainImg} />
                                            <div class="card-caption"> {hotel.name} </div>

                                            <div class="ripple-cont"></div>
                                        </div>
                                    </Link>
                                    <div class="table">
                                        <h6 class="category text-info">Description</h6>
                                        <p class="card-description"> {hotel.description}</p>
                                        <h6 class="category text-info">Stars</h6>
                                        <p class="card-description"> <StarRating stars={hotel.stars} /></p>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </>

    )
}
