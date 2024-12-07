// useBoletos.js
import { useState, useEffect } from 'react'; // Importa los hooks de React para manejar el estado y efectos secundarios
import BoletoService from '../../service/BoletoService'; // Importa el servicio encargado de manejar la interacción con la API para los boletos

// Hook personalizado para gestionar los boletos
const useBoletos = () => {
    // Definir los estados para los boletos, el estado de carga y el manejo de errores
    const [boletos, setBoletos] = useState([]);  // Estado para almacenar la lista de boletos
    const [loading, setLoading] = useState(true);  // Estado para manejar la carga de datos
    const [error, setError] = useState(null);  // Estado para manejar errores

    // El hook useEffect se utiliza para realizar una acción al montar el componente (como cargar los boletos)
    useEffect(() => {
        // Función asincrónica que obtiene todos los boletos desde la API
        const fetchBoletos = async () => {
            try {
                // Llama al servicio para obtener los boletos
                const response = await BoletoService.getAllBoletos();
                // Almacena los boletos obtenidos en el estado
                setBoletos(response.data);
            } catch (err) {
                // Si ocurre un error, lo guarda en el estado de error
                setError(err);
            } finally {
                // Al finalizar la llamada, establece el estado de carga como falso
                setLoading(false);
            }
        };

        // Llama a la función para obtener los boletos cuando el componente se monte
        fetchBoletos();
    }, []); // El array vacío asegura que este efecto solo se ejecute una vez, cuando el componente se monta

    // Función para registrar un nuevo boleto
    const registrarBoleto = async (boletoData) => {
        try {
            // Llama al servicio para registrar el nuevo boleto
            const newBoleto = await BoletoService.registrarBoleto(boletoData);
            // Actualiza el estado de boletos agregando el nuevo boleto a la lista existente
            setBoletos(prevBoletos => [...prevBoletos, newBoleto]);
            // Retorna el nuevo boleto para su uso en otras partes de la aplicación
            return newBoleto;
        } catch (error) {
            // Si ocurre un error, lo imprime en consola y lo guarda en el estado de error
            console.error("Error registrando boleto:", error);
            setError(error);
            // Lanza el error para que pueda ser manejado fuera del hook
            throw error;
        }
    };

    // Devuelve el estado actual de los boletos, el estado de carga, el error y la función para registrar boletos
    return { boletos, loading, error, registrarBoleto };
};

export default useBoletos;  // Exporta el hook para que pueda ser utilizado en otros componentes
