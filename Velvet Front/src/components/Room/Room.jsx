import React, { useEffect, useState } from 'react';
import './Room.css';
import { getRoomByHotelIdRequest } from '../../services/apiRoms.js'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Room = ({  }) => {
    const { id } = useParams(); // Obtiene el ID del hotel de la URL
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const navigateToReservation = (id) =>{
        navigate(`/reservation/add/${id}`)
    }

    useEffect(() => {
        const fetchRooms = async () => {
            setIsLoading(true);
            try {
                const response = await getRoomByHotelIdRequest(id);
                if (response.error) {
                    setError(response.err);
                } else {
                    setRooms(response.data.rooms); // Ajusta esto según la estructura de tu respuesta API
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRooms();
    }, [id]);

    if (isLoading) {
        return (
            <div className="container d-flex align-items-center justify-content-center vh-100">
                Cargando...
            </div>
        );
    }

    if (error) {
        return (
            <div className="container d-flex align-items-center justify-content-center vh-100">
                Error: {error.message}
            </div>
        );
    }

    if (rooms.length === 0) {
        return (
            <div className="container d-flex align-items-center justify-content-center vh-100">
                No hay cuartos disponibles para este hotel.
            </div>
        );
    }

    return (
        <div className="container room-content" style={{ marginTop: '7em' }}> {/* Ajusta el valor del margen superior según sea necesario */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {rooms.length === 0 ? noData : (
                    rooms.map((room) => (
                        <div key={room._id} className="col">
                            <div className="card room-card">
                                <img src={room.imgs} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Detalles de la Habitación:</h5>
                                    <p className="card-text"><strong>Adultos:</strong> {room.capacity.numberOfAdults}</p>
                                    <p className="card-text"><strong>Niños:</strong> {room.capacity.numberOfChildren}</p>
                                    <p className="card-text"><strong>Mascotas:</strong> {room.capacity.numberOfPets}</p>
                                    <p className="card-text"><strong>Precio:</strong> ${room.price} por noche</p>
                                    <a href="#" className="btn btn-outline-info"  onClick={() => navigateToReservation(room._id)}>Reservar</a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
