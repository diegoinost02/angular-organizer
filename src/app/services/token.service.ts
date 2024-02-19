import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
// npm i jwt-decode

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }
  
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }

  saveRefreshToken(refreshToken: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', refreshToken)
    }
  }

  getRefreshToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken')
    }
    return null;
  }

  removeRefreshToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('refreshToken')
    }
  }
  isValidToken() {
    const token = this.getToken()
    if(!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token)

    if(!decodeToken || !decodeToken?.exp) {
      return false;
    }
    const tokenDate = new Date(0);
    tokenDate.setUTCSeconds(decodeToken.exp);
    const today = new Date();

    return tokenDate.getTime() > today.getTime();
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if(!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);

    if(!decodeToken || !decodeToken?.exp) {
      return false;
    }
    const tokenDate = new Date(0);
    tokenDate.setUTCSeconds(decodeToken.exp);
    const today = new Date();

    return tokenDate.getTime() > today.getTime();
  }

  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const decodedToken = jwtDecode<JwtPayload>(token);
    if (!decodedToken || !decodedToken.sub) {
      return null;
    }

    return decodedToken.sub;
  }

}
