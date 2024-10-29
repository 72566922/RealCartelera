// src/components/modalAsientos/ModalAsientos.js
import React, { useState } from "react";
import './modalStyle.css';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

function ModalAsientos({ asientos, onClose, onSelect, manejarVenta, idFuncion, nombreSala, nombreSede }) {
    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);

    const contarAsientosHabilitados = () => {
        const asientosHabilitados = asientos.filter(asiento => asiento.estado === 'habilitado');
        return asientosHabilitados.length;
    };

    const imprimirDatos = () => {
        console.log("Datos disponibles:");
        console.log("ID Función:", idFuncion);
        console.log("Nombre de la Sala:", nombreSala);
        console.log("Nombre de la Sede:", nombreSede);
        console.log("Asientos seleccionados:", asientosSeleccionados);
        console.log("Cantidad de asientos seleccionados:", obtenerTotalAsientos());
        console.log("Cantidad de asientos habilitados:", contarAsientosHabilitados());

        // Imprimir detalles de cada asiento agregado
        asientosSeleccionados.forEach(asiento => {
            console.log(`Asiento agregado: ID ${asiento.id_asiento}, Fila: ${asiento.nombre}, Número: ${asiento.numero}, Precio: ${asiento.precio}`);
        });
    };

    const handleSelect = (asiento) => {
        console.log("Asiento seleccionado:", asiento); // Imprime el objeto de asiento seleccionado

        // Verifica si el asiento ya está seleccionado
        const yaSeleccionado = asientosSeleccionados.some(a => a.id_asiento === asiento.id_asiento);
        
        if (yaSeleccionado) {
            // Si el asiento ya está seleccionado, lo deseleccionamos
            setAsientosSeleccionados(prevSeleccionados => 
                prevSeleccionados.filter(a => a.id_asiento !== asiento.id_asiento)
            );
            alert(`El asiento ID ${asiento.id_asiento} ha sido deseleccionado.`);
        } else {
            // Si no está seleccionado, lo seleccionamos
            setAsientosSeleccionados(prevSeleccionados => [...prevSeleccionados, asiento]);
            alert(`El asiento ID ${asiento.id_asiento} ha sido seleccionado.`);
        }

        // Llama a la función onSelect si está definida
        if (onSelect) {
            onSelect(asiento);
        }
    };

    const obtenerTotalAsientos = () => asientosSeleccionados.length;

    const handleAgregarCarrito = () => {
        if (manejarVenta) {
            manejarVenta(asientosSeleccionados);

            // Imprimir datos al agregar al carrito
            imprimirDatos();  

            // Imprimir detalles de la función
            console.log("Detalles de la función:");
            console.log("ID Función:", idFuncion);
            console.log("Nombre de la Sala:", nombreSala);
            console.log("Nombre de la Sede:", nombreSede);

            // Imprimir detalles de cada asiento agregado
            asientosSeleccionados.forEach(asiento => {
                console.log(`Asiento agregado: ID ${asiento.id_asiento}, nombre: ${asiento.nombre}, estado: ${asiento.estado}, Sala: ${asiento.sala.nombre}`);
            });

            alert(`Se han agregado ${obtenerTotalAsientos()} asientos al carrito.`);
            
            // Limpiar asientos seleccionados después de agregar al carrito
            setAsientosSeleccionados([]);
            onClose();
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <ModalHeader
                        nombreSala={nombreSala}
                        nombreSede={nombreSede}
                        onClose={onClose}
                    />
                    <ModalBody
                        asientos={asientos}
                        asientosSeleccionados={asientosSeleccionados}
                        handleSelect={handleSelect}
                    />
                    <ModalFooter
                        onClose={onClose}
                        asientosSeleccionados={asientosSeleccionados}
                        obtenerTotalAsientos={obtenerTotalAsientos}
                        handleAgregarCarrito={handleAgregarCarrito} // Pasar la función para agregar al carrito
                    />
                </div>
            </div>
        </div>
    );
}

export default ModalAsientos;
