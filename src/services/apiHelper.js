import axios from "axios";

const apiCall = async (method, endpoint, data = null, headers = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios({
      method,
      url: endpoint,
      data,
      headers: { ...defaultHeaders, ...headers },
    });

    return response.data; // Retornando apenas os dados para simplificar.
  } catch (error) {
    throw error; // Rejete a Promise com o erro capturado para que possa ser tratado posteriormente.
  }
};

/**
 * Trata a resposta de erro de uma chamada de API.
 * @param {Object} error - O erro retornado pelo Axios.
 * @param {Function} setErrorType - Uma função setState para definir o tipo de erro.
 */
const handleErrorResponse = (error, setErrorType) => {
  // Se o erro tem uma resposta e é um erro 401 ou 403, então é não autorizado.
  if (
    error.response &&
    (error.response.status === 401 || error.response.status === 403)
  ) {
    setErrorType("unauthorized");
  }
  // Se o erro tem uma solicitação mas nenhuma resposta, então o servidor não está disponível.
  else if (error.request) {
    setErrorType("serverUnavailable");
  }
  // Aqui você pode adicionar outros tipos de erros conforme necessário.
  // ...

  // Finalmente, imprime o erro no console para fins de debug.
  console.error(error);
};

export { handleErrorResponse, apiCall };
