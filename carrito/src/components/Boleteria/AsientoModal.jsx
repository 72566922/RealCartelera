import React, { useEffect, useState } from 'react'; // Importa React, useEffect y useState desde 'react'.
import { useCarrito } from '../context/CarritoContext'; // Importa el hook 'useCarrito' desde el contexto de carrito.
import AsientoService from "../../service/AsientoService"; // Importa el servicio AsientoService para obtener los asientos.
import BoletoService from '../../service/BoletoService'; // Importa el servicio BoletoService para obtener los boletos.
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap.
import './asientoModal.css'; // Importa los estilos personalizados de 'asientoModal.css'.
import AsientoList from './AsientoList'; // Importa el componente AsientoList.

const AsientoModal = ({ onClose, idSala, nombreSala, sede, pelicula, idFuncion, agregarAsientosAlCarrito, precio }) => {
    const { agregarAlCarritoBoletos } = useCarrito(); // Desestructura la función agregarAlCarritoBoletos del contexto CarritoContext.
    const [asientos, setAsientos] = useState([]); // Estado para almacenar los asientos cargados.
    const [selectedAsientos, setSelectedAsientos] = useState(new Set()); // Estado para almacenar los asientos seleccionados.
    const [boletos, setBoletos] = useState([]); // Estado para almacenar los boletos existentes.

    useEffect(() => { // Hook useEffect para cargar los datos al montar el componente.
        const fetchAsientos = async () => { // Función para cargar los asientos por sala.
            try {
                const response = await AsientoService.getAsientosPorSala(idSala); // Llama al servicio para obtener los asientos de la sala.
                setAsientos(response.data); // Actualiza el estado 'asientos' con los datos obtenidos.
                console.log('Asientos cargados:', response.data); // Muestra los asientos cargados en la consola.
            } catch (error) {
                console.error('Error al cargar los asientos:', error); // Maneja errores si ocurre alguno durante la carga de los asientos.
            }
        };

        const fetchBoletos = async () => { // Función para cargar los boletos por id de función.
            try {
                const response = await BoletoService.getBoletosPorIdFuncion(idFuncion); // Llama al servicio para obtener los boletos de la función.
                setBoletos(response.data); // Actualiza el estado 'boletos' con los datos obtenidos.
                console.log('Boletos cargados:', response.data); // Muestra los boletos cargados en la consola.
            } catch (error) {
                console.error('Error al cargar los boletos:', error); // Maneja errores si ocurre alguno durante la carga de los boletos.
            }
        };

        if (idSala) { // Si el idSala es válido, llama a las funciones para cargar los datos.
            fetchAsientos();
            fetchBoletos();
        }
    }, [idSala, idFuncion]); // El useEffect se ejecuta cada vez que idSala o idFuncion cambian.

    const handleCheckboxChange = (asientoId) => { // Función para manejar el cambio en la selección de un asiento.
        setSelectedAsientos((prevSelected) => {
            const newSelected = new Set(prevSelected); // Crea un nuevo Set basado en los asientos previamente seleccionados.
            if (newSelected.has(asientoId)) {
                newSelected.delete(asientoId); // Si el asiento ya está seleccionado, lo deselecciona.
            } else {
                newSelected.add(asientoId); // Si el asiento no está seleccionado, lo agrega.
            }
            return newSelected; // Devuelve el nuevo Set de asientos seleccionados.
        });
    };

    const handleAgregarAsientos = () => { // Función para agregar los asientos seleccionados al carrito.
        const selectedArray = Array.from(selectedAsientos); // Convierte el Set de asientos seleccionados a un array.
        if (selectedArray.length > 0) { // Si hay asientos seleccionados.
            const nuevosBoletos = selectedArray.map(asientoId => { // Mapea los asientos seleccionados para crear nuevos boletos.
                const asiento = asientos.find(a => a.id_asiento === asientoId); // Encuentra el asiento por su id.
                return {
                    id_asiento: asientoId,
                    pelicula,
                    id_funcion: idFuncion,
                    nombreSala,
                    precio,
                    sede,
                    nombre: asiento ? asiento.nombre : ''
                };
            });

            const boletosExistentesSet = new Set(boletos.map(boleto => boleto.id_asiento)); // Crea un Set de los boletos existentes basados en los ID de los asientos.
            const duplicados = nuevosBoletos.filter(boleto => boletosExistentesSet.has(boleto.id_asiento)); // Filtra los boletos que ya existen.

            if (duplicados.length > 0) { // Si hay boletos duplicados.
                alert(`Los siguientes asientos ya están en el carrito: ${duplicados.map(b => b.id_asiento).join(', ')}`); // Muestra un mensaje de advertencia.
                return; // Sale de la función sin agregar los nuevos boletos.
            }

            const uniqueBoletosMap = new Map(); // Crea un Map para almacenar boletos únicos.
            nuevosBoletos.forEach(boleto => {
                if (!uniqueBoletosMap.has(boleto.id_asiento)) {
                    uniqueBoletosMap.set(boleto.id_asiento, boleto); // Añade los boletos únicos al Map.
                }
            });

            const uniqueBoletos = Array.from(uniqueBoletosMap.values()); // Convierte el Map de boletos únicos a un array.

            setBoletos(prevBoletos => [...prevBoletos, ...uniqueBoletos]); // Actualiza el estado de los boletos.

            agregarAsientosAlCarrito(selectedArray); // Llama a la función para agregar los asientos al carrito.

            uniqueBoletos.forEach(boleto => { // Para cada boleto único.
                agregarAlCarritoBoletos(boleto); // Llama a la función para agregar el boleto al carrito.
                console.log('Boleto agregado con exito al carrito:', boleto); // Muestra el boleto agregado en la consola.
            });
        } else {
            console.warn('No hay asientos seleccionados'); // Muestra un mensaje de advertencia si no hay asientos seleccionados.
        }
        onClose(); // Cierra el modal.
    };

    const handleClose = () => { // Función para cerrar el modal.
        onClose(); // Llama a la función onClose pasada como propiedad.
    };

    const boletosSet = new Set(boletos.map(boleto => boleto.id_asiento)); // Crea un Set de los boletos existentes para evitar seleccionar los mismos asientos.

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {idSala} - Seleccionar Asientos para: {pelicula} en la {nombreSala} del Distrito: {sede} ID Funcion {idFuncion}
                        </h5>
                        <button type="button" className="close" onClick={handleClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <AsientoList 
                            asientos={asientos} // Pasa los asientos cargados como propiedad.
                            selectedAsientos={selectedAsientos} // Pasa los asientos seleccionados como propiedad.
                            boletosSet={boletosSet} // Pasa el Set de boletos como propiedad.
                            onCheckboxChange={handleCheckboxChange} // Pasa la función para manejar el cambio de selección de asientos.
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={handleAgregarAsientos}>Agregar Asientos al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsientoModal; // Exporta el componente AsientoModal.
