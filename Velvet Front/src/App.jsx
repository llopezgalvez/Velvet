import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HotelsProvaider } from './hooks/useHotels';
import { HomePage } from './components/HomePage/HomePage';
import { Hotels } from './components/Hotels/Hotels';
import { Room } from './components/Room/Room';
import { Review } from './components/Review/Review';
import { Reservation } from './components/Reservation/viewReservation';
import { Auth } from './Pages/Auth/Auth.jsx';
import { Payment } from './components/Payment/Payment.jsx';
import { Register } from './components/User/Register.jsx';
import { Navigate } from 'react-router-dom';
import { MyReservation } from './components/MyReservation/MyReservation.jsx';
import { ViewGraphics } from './components/ViewGraphics/ViewGraphics';
import { GraficaArea } from './components/Grafica/GraficaArea';
import { GraficaBarras } from './components/Grafica/GraficaBarras';
import { GraficaLinea } from './components/Grafica/GraficaLinea';
import { GraficaPastel } from './components/Grafica/GraficaPastel';
import { GraficaRadar } from './components/Grafica/GraficaRadar';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <HotelsProvaider>
            <Routes>
              <Route path='/' element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path='/review' element={<Review />} />
              <Route path='/hotel/listId/:id' element={<Hotels />} />
              <Route path='/room/listRoomByHotel/:id' element={<Room />} />
              <Route path='/review/listReviewHotel/:id' element={<Review />} />
              <Route path='/register' element={<Register />} />
              <Route path='/reservation/add/:id' element={<Reservation />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/myReservation' element={<MyReservation />} />
              <Route path='/viewGraphics' element={<ViewGraphics />} />
              <Route path='/graficaArea' element={<GraficaArea />} />
              <Route path='/graficaBarras' element={<GraficaBarras />} />
              <Route path='/graficaLinea' element={<GraficaLinea />} />
              <Route path='/graficaPastel' element={<GraficaPastel />} />
              <Route path='/graficaRadar' element={<GraficaRadar />} />
            </Routes>
          </HotelsProvaider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
