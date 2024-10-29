import React, { useEffect, useState } from 'react';
import { useCarrito } from '../context/CarritoContext'; 
import AsientoService from "../../service/AsientoService";
import BoletoService from '../../service/BoletoService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './asientoModal.css';
import AsientoList from './AsientoList';

const AsientoModal = ({ onClose, idSala, nombreSala, sede, pelicula, idFuncion, agregarAsientosAlCarrito }) => {
    const { agregarAlCarritoBoletos } = useCarrito(); 
    const [asientos, setAsientos] = useState([]);
    const [selectedAsientos, setSelectedAsientos] = useState(new Set());
    const [boletos, setBoletos] = useState([]);

    useEffect(() => {
        const fetchAsientos = async () => {
            try {
                const response = await AsientoService.getAsientosPorSala(idSala);
                setAsientos(response.data);
                console.log('Asientos cargados:', response.data);
            } catch (error) {
                console.error('Error al cargar los asientos:', error);
            }
        };

        const fetchBoletos = async () => {
            try {
                const response = await BoletoService.getBoletosPorIdFuncion(idFuncion);
                setBoletos(response.data);
                console.log('Boletos cargados:', response.data);
            } catch (error) {
                console.error('Error al cargar los boletos:', error);
            }
        };

        if (idSala) {
            fetchAsientos();
            fetchBoletos();
        }
    }, [idSala, idFuncion]);

    const handleCheckboxChange = (asientoId) => {
        setSelectedAsientos((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(asientoId)) {
                newSelected.delete(asientoId); 
            } else {
                newSelected.add(asientoId); 
            }
            return newSelected; 
        });
    };

    const handleAgregarAsientos = () => {
        const selectedArray = Array.from(selectedAsientos);
        if (selectedArray.length > 0) {
            // Crear un Set para evitar duplicados
            const nuevosBoletos = selectedArray.map(asientoId => {
                const asiento = asientos.find(a => a.id_asiento === asientoId);
                return {
                    id_asiento: asientoId,
                    pelicula,
                    id_funcion: idFuncion,
                    nombreSala,
                    sede,
                    nombre: asiento ? asiento.nombre : ''
                };
            });
    
            // Verificar si algún asiento ya está en los boletos
            const boletosExistentesSet = new Set(boletos.map(boleto => boleto.id_asiento));
            const duplicados = nuevosBoletos.filter(boleto => boletosExistentesSet.has(boleto.id_asiento));
    
            if (duplicados.length > 0) {
                // Lanza un error o muestra un mensaje de advertencia
                alert(`Los siguientes asientos ya están en el carrito: ${duplicados.map(b => b.id_asiento).join(', ')}`);
                return; // Salir de la función sin agregar los nuevos boletos
            }
    
            // Usar un Set para eliminar duplicados
            const uniqueBoletosMap = new Map();
            nuevosBoletos.forEach(boleto => {
                if (!uniqueBoletosMap.has(boleto.id_asiento)) {
                    uniqueBoletosMap.set(boleto.id_asiento, boleto);
                }
            });
    
            // Convertir el Map de nuevo a un array
            const uniqueBoletos = Array.from(uniqueBoletosMap.values());
    
            // Actualizar el estado de boletos
            setBoletos(prevBoletos => [...prevBoletos, ...uniqueBoletos]);
    
            // Agregar asientos al carrito
            agregarAsientosAlCarrito(selectedArray);
    
            uniqueBoletos.forEach(boleto => {
                agregarAlCarritoBoletos(boleto);
            });
        } else {
            console.warn('No hay asientos seleccionados');
        }
        onClose();
    };
    
    
    const handleClose = () => {
        onClose();
    };

    const boletosSet = new Set(boletos.map(boleto => boleto.id_asiento));

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{idSala} - Seleccionar Asientos para: {pelicula} en la {nombreSala} del Distrito: {sede} ID Funcion {idFuncion}</h5>
                        <button type="button" className="close" onClick={handleClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <AsientoList 
                            asientos={asientos} 
                            selectedAsientos={selectedAsientos} 
                            boletosSet={boletosSet} 
                            onCheckboxChange={handleCheckboxChange} 
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Cerrar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleAgregarAsientos}>
                            Agregar Asientos al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsientoModal;
