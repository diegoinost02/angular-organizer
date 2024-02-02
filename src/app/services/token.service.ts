import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
// npm i jwt-decode

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }
  
  getToken() {
    return localStorage.getItem('token')
  }

  removeToken() {
    localStorage.removeItem('token')
  }

  saveRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken)
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  removeRefreshToken() {
    localStorage.removeItem('refreshToken')
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

}
