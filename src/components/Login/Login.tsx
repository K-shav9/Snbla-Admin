import React, { useEffect } from 'react';
import LoginFrom from './LoginForm';

export const Login = () => {
    useEffect(() => {
      document.title = "Admin Login | Snbla";
    }, []);
    return (
        <div>
            <LoginFrom />
        </div>
    );
};
