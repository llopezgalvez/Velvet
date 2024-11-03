import { useAddReservation } from "../../hooks/useAddReservation";
import { useGetReservations } from "../../hooks/useGetReservation";
import { useGetPaymentMethods } from "../../hooks/useGetPayment";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";
import './viewReservation.css';
import { deleteReservation } from "../../services/apiReservation";

export const FormReservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { paymentMethods, isLoading: loadingPaymentMethods } = useGetPaymentMethods();
  const { reservationData: initialReservationData, fetchError, fetchReservations } = useGetReservations();
  const [reservationData, setReservationData] = useState(initialReservationData);
  const { create, isLoading } = useAddReservation();

  const [formData, setFormData] = useState({
    start: '',
    end: '',
    methodOfPay: ''
  });

  useEffect(() => {
    setReservationData(initialReservationData);
  }, [initialReservationData]);

  const convertToDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el método de pago es válido
    if (!formData.methodOfPay || formData.methodOfPay === "N/A") {
      Swal.fire({
        icon: "warning",
        title: "Por favor selecciona un método de pago válido",
        showConfirmButton: true,
      });
      return;
    }

    const convertedFormData = {
      ...formData,
      start: convertToDate(formData.start),
      end: convertToDate(formData.end)
    };

    const { start, end, methodOfPay } = convertedFormData;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const today = new Date();

    // If para comparar la fecha actual con la fecha de inicio
    if (startDate < today) {
      Swal.fire({
        icon: "warning",
        title: "La fecha de inicio ya ha pasado",
        showConfirmButton: true,
      });
      return;
    }

    // if para comparar fecha de inicio y salida
    if (startDate > endDate) {
      Swal.fire({
        icon: "warning",
        title: "La fecha de inicio no puede ser mayor que la fecha de salida",
        showConfirmButton: true,
      });
      return;
    }

    const response = await create(id, start, end, methodOfPay);
    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "¡Reservación guardada exitosamente!",
        showConfirmButton: false,
        timer: 1500,
      });

      setFormData({
        start: "",
        end: "",
        methodOfPay: "",
      });
      await fetchReservations();
    } else {
      Swal.fire({
        position: "bottom-end",
        icon: "warning",
        title: response.error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar mi reservación!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteReservation(id);
        await fetchReservations();
        Swal.fire(
          '¡Eliminada!',
          'La reservación ha sido eliminada',
          'success'
        );
      }
    });
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="information">
            <h5 className="card-title">
              Para realizar tu reservación, completa el formulario
            </h5>
            <p className="card-text">
              Recuerda que debes de tener registrado un método de pago para
              poder realizar tu reservación
            </p>
          </div>
          <div className="container-reservation">
            <form onSubmit={handleSubmit}>
              <div className="dates mb-3">
                <div className="dates-info">
                  <label htmlFor="start" className="form-label">
                    Selecciona la fecha de inicio para tu reservación:
                  </label>
                </div>
                <div className="entries">
                  <input
                    value={formData.start}
                    onChange={handleChange}
                    type="date"
                    id="start"
                    name="start"
                    className="form-control"
                  />
                </div>
                <div className="dates-info">
                  <label htmlFor="end" className="form-label">
                    Selecciona la fecha de salida para tu reservación:
                  </label>
                </div>
                <div className="entries">
                  <input
                    value={formData.end}
                    onChange={handleChange}
                    type="date"
                    id="end"
                    name="end"
                    className="form-control"
                  />
                </div>
              </div>
              <label htmlFor="methodOfPay" className="form-label">
                Selecciona tu tarjeta a la cuál se realizará el cargo por tu reservación
              </label>
              <div className="info-mdp">
                <label>Terminación de la tarjeta:</label>
                <select name="methodOfPay" value={formData.methodOfPay} onChange={handleChange} className="form-select" >
                  {paymentMethods.length > 0 ?
                    (paymentMethods.map((method) => (
                      <option key={method._id} value={method._id}> * * * * * * * * * * * * {method.cardNumber ? method.cardNumber.toString().slice(-4) : 'N/A'} </option>))) : (<option value="N/A">No hay métodos de pago disponibles</option>)} </select> </div>
              <div className="buttons">
                <button type="submit" className="btn btn-success">
                  Realizar mi reservación
                </button>
                <Link to={'/'} className="btn btn-danger">Cancelar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h2>Mis reservaciónes</h2>
        {fetchError && <p className="text-danger mt-3">Error: {fetchError}</p>}
        {isLoading ? (
          <p className="text-info mt-3">Cargando tus reservaciónes...</p>
        ) : (
          <>
            {reservationData.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Hotel</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de salida</th>
                    <th>Numeral de la tarjeta</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservationData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.hotelId.name}</td>
                      <td>{dayjs(data.start).utc().format("DD/MM/YYYY")}</td>
                      <td>{dayjs(data.end).utc().format("DD/MM/YYYY")}</td>
                      <td>* * * * * * * * * * * * {data.methodOfPay.cardNumber.toString().slice(-4)}</td>
                      <td>
                        <button className="btn btn-danger"
                          onClick={() => handleDelete(data._id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay reservaciónes aún :(</p>
            )}
          </>
        )}
      </div>
    </>
  );
};
