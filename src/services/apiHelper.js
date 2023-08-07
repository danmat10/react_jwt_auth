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
const handleErrorResponse = (error, handleOpen, setMessage) => {
  if (
    error.response &&
    (error.response.status === 401 || error.response.status === 403)
  ) {
    setMessage({
      type: "error",
      content: "Você não está autorizado. Por favor, faça login novamente.",
    });
    handleOpen();
  } else {
    setMessage({
      type: "error",
      content: "O servidor está indisponível. Tente novamente mais tarde.",
    });
    handleOpen();
  }
};

export { handleErrorResponse, apiCall };
