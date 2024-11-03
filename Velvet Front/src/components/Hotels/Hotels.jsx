import { Review } from '../Review/Review';
import React, { useEffect, useState } from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { useParams } from 'react-router-dom';
import { Room } from '../Room/Room';
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import { getHotelsIdRequest } from '../../services/apiHotel';
import './Hotels.css';

const Star = ({ filled }) => {
    return (
        <span className={filled ? "star-filled" : "star-empty"}>&#9733;</span>
    );
};

export const Hotels = () => {
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        async function loadHotel() {
            if (params.id) {
                try {
                    const response = await getHotelsIdRequest(params.id);
                    setHotel(response.data);
                } catch (error) {
                    console.error("Error fetching hotel data:", error);
                } finally {
                    setLoading(false);
                }
            }
        }
        loadHotel();
    }, [params.id]);

    if (loading) {
        return <p>Loading hotel data...</p>;
    }

    if (!hotel) {
        return <p>No hotel data available.</p>;
    }

    const renderStars = () => {
        const filledStars = Math.round(hotel.stars);
        const starsArray = [];

        for (let i = 1; i <= 5; i++) {
            starsArray.push(<Star key={i} filled={i <= filledStars} />);
        }

        return starsArray;
    };

    return (
        <>
            <NavBar />
            <div className="container-cont">
                <div className='bgc'>
                    <div className="container" id='container-imgs'>
                        <div className="row">
                            <div className="col-md-6">
                                <img src={hotel.mainImg} alt="Main" id="mainImg" className="img-fluid" />
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    {hotel.imgs.slice(0, 4).map((img, index) => (
                                        <div key={index} className="col-md-6 mb-3">
                                            <img src={img} alt={`Hotel ${index + 1}`} className="img-fluid" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='TabPanel'>
                    <Tabs aria-label="Basic tabs" defaultValue={0}>
                        <TabList>
                            <Tab>Información</Tab>
                            <Tab>Reseñas</Tab>
                            
                        </TabList>
                        <TabPanel value={0}>
                            <div className='container-description'>
                                <div className='Text'>
                                    <div className='Text-1'>
                                        <h2>Description</h2>
                                        <p>{hotel.description}</p>
                                    </div>
                                    <div className='Text-4'>
                                        <h2>Address</h2>
                                        <p>{hotel.address}</p>
                                    </div>
                                    <div className='Text-3'>
                                        <h2>Phone</h2>
                                        <p>+502 {hotel.phone}</p>
                                    </div>
                                    <div className='Text-3'>
                                        <h2>Country</h2>
                                        <p>{hotel.country}</p>
                                    </div>
                                    <div className='Text-2'>
                                        <h2>Stars</h2>
                                        <div className="stars-container">
                                            {renderStars()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={1}>
                            <Review />
                        </TabPanel>
                    </Tabs>
                </div>
                <Room />
            </div>
            <Footer />
        </>
    );
};
