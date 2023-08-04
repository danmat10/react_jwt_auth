import axios from "axios";
import { createRefresh } from "react-auth-kit";
import ENDPOINTS from "../services/endpoints";
import {AUTH_TOKEN_EXPIRES_AT} from "../config/constants";

const refreshApi = createRefresh({
  interval: AUTH_TOKEN_EXPIRES_AT,
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
        refresh_token: refreshToken,
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
