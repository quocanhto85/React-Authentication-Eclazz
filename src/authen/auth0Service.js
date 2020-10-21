import React, { useState, useEffect, useContext } from "react"
import { authenService } from "../services/authenService";
import { useCookies } from 'react-cookie';
import { Spinner } from "react-bootstrap";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../helper/constant";

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

export const Provider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState()
    const [, setCookie, removeCookie] = useCookies(ACCESS_TOKEN);
    const [mounted, setmounted] = useState(false);

    useEffect(() => {
        const initAuth0 = async () => {
          const user = await authenService.getAccountInfo();
          setmounted(true)
          if (user) {
            setIsAuthenticated(true)
            setUser(user)
          } else
            logout(false)
          setLoading(false)
        }
        initAuth0()
      }, [])

      const login = async (options) => {
        setLoading(true)
        const { status, data: { expires_in, access_token, refresh_token } } = await authenService.login(options);
        if (status === 200) {
          saveCookie(ACCESS_TOKEN, access_token, expires_in)
          refresh_token && saveCookie(REFRESH_TOKEN, refresh_token);
          const user = await authenService.getAccountInfo();
          if (!user) {
            logout();
            setLoading(false);
            return 0;
          }
          else {
            setUser(user);
            setIsAuthenticated(true)
          }
        }
        setLoading(false)
        return status;    
      }

      const saveCookie = (name, value, expires) => {
        const options = { path: '/' };
        expires && (options.expires = new Date(new Date().getTime() + expires * 1000));
        setCookie(name, value, options)
      }

      const logout = (setAuthen = true) => {
        removeCookie(ACCESS_TOKEN, { path: '/' })
        removeCookie(REFRESH_TOKEN, { path: '/' })
        setAuthen && setIsAuthenticated(false)
      }
      if (!mounted) return <Spinner animation="border" />;
      return (
        <Auth0Context.Provider
          value={{
            isAuthenticated,
            user,
            loading,
            logout,
            login,
          }}
        >
          {children}
        </Auth0Context.Provider>
      )
}