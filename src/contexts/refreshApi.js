import axios from "axios";
import { useAuthHeader, createRefresh } from "react-auth-kit";
import ENDPOINTS from "../services/endpoints";

const refreshApi = createRefresh({
  interval: 0.5, // Refreshs the token in every 10 minutes
  refreshApiCallback: async ({
    // arguments
    authToken,
    authTokenExpireAt,
    refreshToken,
    refreshTokenExpiresAt,
    authUserState,
  }) => {
    try {
      const response = await axios.post(ENDPOINTS.AUTH.REFRESH, {
        refreshToken: refreshToken,
      });
      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});

export default refreshApi;
