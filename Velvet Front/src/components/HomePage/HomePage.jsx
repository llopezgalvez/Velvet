import './HomePage.css'
import HeaderVideo from '../../assets/HeaderVideo.mp4'
import { Cards } from '../Cards/Cards'
import Hotel from '../../assets/Hotel.jpg'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <header>

        <div class="overlay"></div>

        <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
          <source src={HeaderVideo} type="video/mp4" />
        </video>

        <div class="container h-100">
          <div class="d-flex h-100 text-center align-items-center">
            <div class="w-100 text-white">
              <h1 class="display-3">VELVET</h1>
              <p class="lead mb-0">TU HOGAR EN CUALQUIER LUGAR</p>
            </div>
          </div>
        </div>
      </header>

      <div className='Container-Cards mt-10 ' id='hoteles'>
        <h1 >HOTELES </h1>
        <div className='CardsMap'>
          <Cards />
          
          
        </div>
        <Footer />
      </div>





    </>
  )
}
