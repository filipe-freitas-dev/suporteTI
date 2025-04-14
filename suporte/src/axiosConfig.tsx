import axios from 'axios';

// Função para configurar o Axios com o token
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',  // URL base da sua API
  headers: {
    'Content-Type': 'application/json',
    // O token será adicionado dinamicamente no cabeçalho Authorization
  }
});

// Função para definir o token de autorização no cabeçalho
const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Salvar o token no localStorage ou sessionStorage
    localStorage.setItem('@token', token);  // Salvar no localStorage
    // sessionStorage.setItem('token', token);  // Ou salvar no sessionStorage
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');  // Limpar o token do localStorage
    // sessionStorage.removeItem('token');  // Ou limpar do sessionStorage
  }
};

export { axiosInstance, setAuthToken };