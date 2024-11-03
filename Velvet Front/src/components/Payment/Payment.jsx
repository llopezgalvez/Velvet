import { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import "./Payment.css";
import { useSavePayment } from "../../hooks/useSavePayment.jsx";
import { useGetPaymentMethods } from "../../hooks/useGetPayment.jsx";
import Swal from "sweetalert2"
import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc"

dayjs.extend(utcPlugin)

export const Payment = () => {
    const { isLoading, savePayment } = useSavePayment();
    const { paymentMethods: initialPaymentMethods, fetchError, deletePaymentMethod, fetchPaymentMethods } = useGetPaymentMethods()
    const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)
    const [formData, setFormData] = useState({
        cardHolder: '',
        cardNumber: '',
        securityCode: '',
        expirationDate: ''
    })
    const [error, setError] = useState(null);

    useEffect(() => {
        setPaymentMethods(initialPaymentMethods)
    }, [initialPaymentMethods])

    const convertToDate = (mmYY) => {
        const [month, year] = mmYY.split('/')
        const fullYear = `20${year}`;
        return `${fullYear}-${month}-01`
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const convertedFormData = {
            ...formData,
            expirationDate: convertToDate(formData.expirationDate)
        }
        console.log(convertedFormData); // Verifica los datos convertidos
        const response = await savePayment(convertedFormData)
        if (response && response.error) {
            setError("Error al guardar el método de pago")
        } else {
            // Mostrar SweetAlert cuando se guarda el método de pago exitosamente
            Swal.fire({
                icon: 'success',
                title: '¡Método de pago guardado!',
                showConfirmButton: false,
                timer: 1500 // Cierra automáticamente el SweetAlert después de 1.5 segundos
            })

            // Limpiar todos los campos del formulario
            setFormData({
                cardHolder: '',
                cardNumber: '',
                securityCode: '',
                expirationDate: ''
            })
            await fetchPaymentMethods()
        }
    }

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deletePaymentMethod(id)
                await fetchPaymentMethods()
                Swal.fire(
                    'Eliminado!',
                    'El método de pago ha sido eliminado.',
                    'success'
                )
            }
        })

    }


    const soloNumeros = (e) => {
        const teclaPresionada = e.key;
        const esNumero = /^[0-9]$/;
        if (!esNumero.test(teclaPresionada) && teclaPresionada !== "Backspace" && teclaPresionada !== "Delete") {
            Swal.fire({
                position: "bottom-end",
                icon: "warning",
                title: "Solo debe de colocar números en el campo del número de tarjeta",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const limitarNumeracion = (e) => {
        const valorCampo = e.target.value;
        if (valorCampo.length >= 16 && e.key !== "Backspace" && e.key !== "Delete") {
            Swal.fire({
                position: "bottom-end",
                icon: "warning",
                title: "Solo puedes colocar 16 número como máximo en el número de la tarjeta",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const soloLetras = (e) => {
        const teclaPresionada = e.key;
        const esLetraOEspacio = /^[a-zA-Z\s]$/i; // Agregado 'i' al final para hacerlo insensible a mayúsculas y minúsculas
        if (teclaPresionada === "CapsLock") {
            return;
        }
        if (!esLetraOEspacio.test(teclaPresionada) && teclaPresionada !== "Backspace" && teclaPresionada !== "Delete") {
            Swal.fire({
                position: "bottom-end",
                icon: "warning",
                title: "Solo puede colocar letras en el titular de la tarjeta",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const maximoCuatroNumeros = (e) => {
        const teclaPresionada = e.key;
        const esNumero = /^[0-9]$/;
        const valorCampo = e.target.value;

        // Permitir teclas de control (Backspace, Delete)
        if (teclaPresionada === "Backspace" || teclaPresionada === "Delete") {
            return;
        }

        // Prevenir letras y espacios
        if (!esNumero.test(teclaPresionada)) {
            Swal.fire({
                position: "bottom-end",
                icon: "warning",
                title: "No se pueden colocar letras o espacios en el CVV",
                showConfirmButton: false,
                timer: 1500
            });
        }

        // Prevenir más de 4 dígitos
        if (valorCampo.length >= 4) {
            Swal.fire({
                position: "bottom-end",
                icon: "warning",
                title: "No puedes colocar más de 4 dígitos en el CVV",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const formatoFecha = (e) => {
        const input = e.target;
        input.value = input.value.replace(/\D/g, "")

        // Formatear la fecha a MM/YY
        if (input.value.length === 4) {
            input.value = input.value.slice(0, 2) + "/" + input.value.slice(2)
        }

        // Verificar si la fecha está vencida
        if (input.value.length === 5) {
            const [month, year] = input.value.split("/")
            const expirationDate = dayjs(`20${year}-${month}-01`)
            const currentDate = dayjs()

            if (expirationDate.isBefore(currentDate, 'month')) {
                Swal.fire({
                    position: "bottom-end",
                    icon: "warning",
                    title: "¡Tu tarjeta ya ha expirado!",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                input.setCustomValidity("")
            }
        }
    }

    return (
        <>
            <NavBar />
            <div className="containerP">
                <div className="container p-0">
                    <form onSubmit={handleSubmit}>
                        <div className="card px-4">
                            <p className="h8 py-3">Método de Pago</p>
                            <div className="row gx-3">
                                <div className="col-12">
                                    <div className="d-flex flex-column">
                                        <p className="text mb-1">Nombre</p>
                                        <input
                                            className="form-control mb-3"
                                            type="text"
                                            placeholder="Nombre"
                                            name="cardHolder"
                                            value={formData.cardHolder}
                                            onChange={handleChange}
                                            onKeyDown={soloLetras}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex flex-column">
                                        <p className="text mb-1">Numeración</p>
                                        <input
                                            className="form-control mb-3"
                                            type="text"
                                            placeholder="1234 5678 435678"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            onKeyDown={(e) => {
                                                soloNumeros(e);
                                                limitarNumeracion(e);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex flex-column">
                                        <p className="text mb-1">Expiración</p>
                                        <input
                                            className="form-control mb-3 pt-2"
                                            type="text"
                                            id="fecha"
                                            name="expirationDate"
                                            pattern="\d{2}/\d{2}"
                                            title="Formato requerido: MM/YY"
                                            maxLength="5"
                                            placeholder="MM/YY"
                                            value={formData.expirationDate}
                                            onChange={handleChange}
                                            onInput={formatoFecha}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex flex-column">
                                        <p className="text mb-1">CVV/CVC</p>
                                        <input
                                            className="form-control mb-3 pt-2"
                                            type="password"
                                            placeholder="***"
                                            name="securityCode"
                                            value={formData.securityCode}
                                            onChange={handleChange}
                                            onKeyDown={maximoCuatroNumeros}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary mb-3" type="submit">
                                        <span className="ps-3">Registrar</span>
                                        <span className="fas fa-arrow-right"></span>
                                    </button>
                                    {error && <p className="text-danger mt-3">Error: {error}</p>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container mt-4">
                <h2>Métodos de Pago</h2>
                {fetchError && <p className="text-danger mt-3">Error: {fetchError}</p>}
                {isLoading ? (
                    <p className="text-info mt-3">Cargando métodos de pago...</p>
                ) : (
                    <>
                        {paymentMethods.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Número de Tarjeta</th>
                                        <th>Fecha de Expiración</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentMethods.map((method, index) => (
                                        <tr key={index}>
                                            <td>{method.cardHolder}</td>
                                            <td>
                                                * * * * * * * * * * * * {method.cardNumber ? method.cardNumber.toString().slice(-4) : '****'}
                                            </td>
                                            <td>{dayjs(method.expirationDate).utc().format("DD/MM/YYYY")}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => handleDelete(method._id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        ) : (
                            <p>No hay métodos de pago</p>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};