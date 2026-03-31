import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { employeeService } from '../services/employeeService';
import { toast } from 'sonner';
import { 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  ToggleLeft, 
  ToggleRight,
  X
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    dataAdmissao: '',
    salario: '',
    status: 'ATIVO'
  });

  useEffect(() => {
    carregarEmployees();
  }, []);

  const carregarEmployees = async () => {
    try {
      const data = await employeeService.listarTodos();
      setEmployees(data);
    } catch (error) {
      toast.error('Erro ao carregar funcionários');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        nome: employee.nome,
        dataAdmissao: employee.dataAdmissao,
        salario: employee.salario.toString(),
        status: employee.status
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        nome: '',
        dataAdmissao: '',
        salario: '',
        status: 'ATIVO'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setFormData({
      nome: '',
      dataAdmissao: '',
      salario: '',
      status: 'ATIVO'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.dataAdmissao || !formData.salario) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const payload = {
        ...formData,
        salario: parseFloat(formData.salario)
      };

      if (editingEmployee) {
        await employeeService.atualizar(editingEmployee.id, payload);
        toast.success('Funcionário atualizado com sucesso!');
      } else {
        await employeeService.criar(payload);
        toast.success('Funcionário cadastrado com sucesso!');
      }
      
      handleCloseModal();
      carregarEmployees();
    } catch (error) {
      toast.error('Erro ao salvar funcionário');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      return;
    }

    try {
      await employeeService.deletar(id);
      toast.success('Funcionário excluído com sucesso!');
      carregarEmployees();
    } catch (error) {
      toast.error('Erro ao excluir funcionário');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await employeeService.alternarStatus(id);
      toast.success('Status alterado com sucesso!');
      carregarEmployees();
    } catch (error) {
      toast.error('Erro ao alterar status');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]" data-testid="dashboard-page">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Users size={24} strokeWidth={1.5} className="text-[#002FA7]" />
              <h1 
                className="text-xl font-bold tracking-tight text-[#0A0A0A]"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                data-testid="dashboard-title"
              >
                Funcionários
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#666666]" data-testid="user-name">
                {user?.nome}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-[#666666] hover:text-[#0A0A0A] transition-colors duration-200"
                data-testid="logout-button"
              >
                <LogOut size={18} strokeWidth={1.5} />
                <span className="text-sm font-medium">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-[#666666]" data-testid="employee-count">
            {employees.length} funcionário(s) cadastrado(s)
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="bg-[#002FA7] text-white hover:bg-[#00227A] transition-colors duration-200 px-6 py-3 font-medium flex items-center gap-2 rounded-none"
            data-testid="add-employee-button"
          >
            <Plus size={20} strokeWidth={1.5} />
            <span>Novo Funcionário</span>
          </button>
        </div>

        {/* Table */}
        <div className="border border-[#E5E5E5] bg-white overflow-hidden">
          <table className="w-full" data-testid="employees-table">
            <thead className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
              <tr>
                <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-[#666666]">
                  Nome
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-[#666666]">
                  Data de Admissão
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-[#666666]">
                  Salário
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-[#666666]">
                  Status
                </th>
                <th className="py-4 px-6 text-right text-xs font-semibold uppercase tracking-[0.1em] text-[#666666]">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-[#666666]">
                    Carregando...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-[#666666]" data-testid="empty-state">
                    Nenhum funcionário cadastrado
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr 
                    key={employee.id} 
                    className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA]/50 transition-colors duration-150"
                    data-testid={`employee-row-${employee.id}`}
                  >
                    <td className="py-4 px-6 text-sm text-[#0A0A0A] font-medium">
                      {employee.nome}
                    </td>
                    <td className="py-4 px-6 text-sm text-[#0A0A0A]">
                      {formatDate(employee.dataAdmissao)}
                    </td>
                    <td className="py-4 px-6 text-sm text-[#0A0A0A]">
                      {formatCurrency(employee.salario)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium border ${
                          employee.status === 'ATIVO'
                            ? 'bg-[#E6F9EC] text-[#008A39] border-[#00C853]'
                            : 'bg-[#FFEDED] text-[#CC0000] border-[#FF2A2A]'
                        }`}
                        data-testid={`employee-status-${employee.id}`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(employee.id)}
                          className="p-2 text-[#666666] hover:text-[#002FA7] hover:bg-[#FAFAFA] transition-colors duration-200"
                          title={employee.status === 'ATIVO' ? 'Inativar' : 'Ativar'}
                          data-testid={`toggle-status-${employee.id}`}
                        >
                          {employee.status === 'ATIVO' ? (
                            <ToggleRight size={20} strokeWidth={1.5} />
                          ) : (
                            <ToggleLeft size={20} strokeWidth={1.5} />
                          )}
                        </button>
                        <button
                          onClick={() => handleOpenModal(employee)}
                          className="p-2 text-[#666666] hover:text-[#002FA7] hover:bg-[#FAFAFA] transition-colors duration-200"
                          title="Editar"
                          data-testid={`edit-employee-${employee.id}`}
                        >
                          <Edit2 size={18} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id)}
                          className="p-2 text-[#666666] hover:text-[#CC0000] hover:bg-[#FFEDED] transition-colors duration-200"
                          title="Excluir"
                          data-testid={`delete-employee-${employee.id}`}
                        >
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          data-testid="employee-modal"
        >
          <div className="bg-white border border-[#E5E5E5] p-8 shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-2xl font-bold tracking-tight text-[#0A0A0A]"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                data-testid="modal-title"
              >
                {editingEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-[#666666] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors duration-200"
                data-testid="close-modal-button"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#666666] mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#002FA7] focus:border-transparent transition-all duration-200 rounded-none"
                  placeholder="Nome completo"
                  data-testid="employee-name-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#666666] mb-2">
                  Data de Admissão *
                </label>
                <input
                  type="date"
                  value={formData.dataAdmissao}
                  onChange={(e) => setFormData({ ...formData, dataAdmissao: e.target.value })}
                  className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#002FA7] focus:border-transparent transition-all duration-200 rounded-none"
                  data-testid="employee-date-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#666666] mb-2">
                  Salário (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.salario}
                  onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
                  className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#002FA7] focus:border-transparent transition-all duration-200 rounded-none"
                  placeholder="0.00"
                  data-testid="employee-salary-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#666666] mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#002FA7] focus:border-transparent transition-all duration-200 rounded-none"
                  data-testid="employee-status-select"
                >
                  <option value="ATIVO">Ativo</option>
                  <option value="INATIVO">Inativo</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-transparent text-[#0A0A0A] border border-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors duration-200 px-6 py-3 font-medium rounded-none"
                  data-testid="cancel-button"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#002FA7] text-white hover:bg-[#00227A] transition-colors duration-200 px-6 py-3 font-medium rounded-none"
                  data-testid="save-employee-button"
                >
                  {editingEmployee ? 'Salvar Alterações' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
