import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");

  // 1. If there is no token, the user is definitely not logged in
  if (!token) return false;

  try {
    // 2. Decode the token to read its claims
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Time in seconds

    // 3. Check if the token's expiration time is in the future
    return decoded.exp > currentTime;
  } catch (error) {
    // If the token is corrupted or invalid text, treat as logged out
    return false;
  }
};
