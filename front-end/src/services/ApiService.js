import BebidaService from './BebidaService';
import ComidaService from './ComidaService';

const ApiService = {
  getAllBebidas: () => {
    return BebidaService.getAllBebidas();
  },
  getAllComidas: () => {
    return ComidaService.getAllComidas();
  },
};

export default ApiService;
