import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: number;
  iat: number;
  exp: number;
}

export const decodeJwtToken = (token: string): JwtPayload => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded;
  } catch {
    throw new Error("Token không hợp lệ");
  }
};
