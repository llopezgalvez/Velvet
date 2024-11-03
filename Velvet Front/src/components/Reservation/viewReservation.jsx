import "./viewReservation.css";
import { NavBar } from "../NavBar/NavBar";
import { FormReservation } from "./formReservation";
import { Footer } from "../Footer/Footer";

export const Reservation = () => {
  return (
    <>
      <NavBar />
      <FormReservation />
      <Footer />
    </>
  );
};
