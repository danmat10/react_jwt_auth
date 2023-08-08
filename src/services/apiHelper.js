import axios from "axios";
const apiCall = async (method, endpoint, data = null, headers = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    method,
    url: endpoint,
    headers: { ...defaultHeaders, ...headers },
  };

  if (data !== null) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

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
