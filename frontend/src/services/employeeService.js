import api from './api';

export const employeeService = {
  listarTodos: async () => {
    const response = await api.get('/employees');
    return response.data;
  },

  buscarPorId: async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  criar: async (funcionario) => {
    const response = await api.post('/employees', funcionario);
    return response.data;
  },

  atualizar: async (id, funcionario) => {
    const response = await api.put(`/employees/${id}`, funcionario);
    return response.data;
  },

  deletar: async (id) => {
    await api.delete(`/employees/${id}`);
  },

  alternarStatus: async (id) => {
    const response = await api.patch(`/employees/${id}/status`);
    return response.data;
  }
};
