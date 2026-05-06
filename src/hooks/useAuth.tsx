import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await axios.get('/api/auth/check-login', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                console.error(error);
                setIsLoggedIn(false);
                setUser(null);
            }
        };
        checkLogin();
    }, [token]);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password,
            });
            setToken(response.data.token);
            setIsLoggedIn(true);
            setUser(response.data.user);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout', {
                token,
            });
            setToken(null);
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    return { isLoggedIn, user, login, logout };
};

export default useAuth;
