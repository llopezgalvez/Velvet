import './Footer.css'


export const Footer = () => {
  return (
    <>
      <div class="containerFooter">
        <footer class="text-center text-white" >
          <div class="containerFooter">
            <section >
              <div class="row text-center d-flex justify-content-center pt-5">
                <div class="col-md-2">
                  <h6 class="text-uppercase font-weight-bold">
                    <a href="/" class="text-white">Home</a>
                  </h6>
                </div>
                <div class="col-md-2">
                  <h6 class="text-uppercase font-weight-bold">
                  <a class="nav-link" href="/">Mis reservaciones</a>
                  </h6>
                </div>
                <div class="col-md-2">
                  <h6 class="text-uppercase font-weight-bold">
                  <a class="nav-link" href="/">Hacer una reseña</a>
                  </h6>
                </div>
              </div>
            </section>
            <hr class="my-5" />
            <section class="mb-5">
              <div class="row d-flex justify-content-center">
                <div class="col-lg-8">
                  <p>
                    En Velvet, nos enorgullece ofrecerte una experiencia excepcional al reservar habitaciones de hotel. Ya sea que estés planeando un viaje de negocios, unas vacaciones en familia o una escapada romántica, Velvet tiene todo lo que necesitas para encontrar el alojamiento perfecto para tu próximo viaje.
                  </p>
                </div>
              </div>
            </section>
            <section class="text-center mb-5">
              <a href="" class="text-white me-4">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="" class="text-white me-4">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="" class="text-white me-4">
                <i class="fab fa-google"></i>
              </a>
              <a href="" class="text-white me-4">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="" class="text-white me-4">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="" class="text-white me-4">
                <i class="fab fa-github"></i>
              </a>
            </section>
          </div>

          <div
            class="text-center p-3"
            id='footerid'
          >
            © 2024 Copyright:
            <a class="text-white" href="https://mdbootstrap.com/"
            > Pandilla Momera </a
            >
          </div>
        </footer>
      </div>
    </>
  )
}
