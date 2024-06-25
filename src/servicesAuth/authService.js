"use client";
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userId = localStorage.getItem('userId');
            if (userId) {
                setUser({ userId });
            }
        }
    }, []);

    const login = async (loginData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/loginClient', loginData);
            const data = response.data;
            localStorage.setItem('userId', data.userId);
            setUser({ userId: data.userId });
            await Swal.fire({
                icon: 'success',
                title: 'Authentification réussie',
                text: 'Vous vous êtes authentifié avec succès!',
            });
            if (typeof window !== 'undefined') {
                window.location.href = '/AnnulationClientPage';
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Authentification échouée',
                text: 'Mot de passe ou email incorrect. Réessayez.',
            });
            console.error('Login failed', error);
        }
    };

    const loginAgency = async (loginAgencyData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/loginClient', loginAgencyData);
            const data = response.data;
            localStorage.setItem('userId', data.userId);
            setUser({ userId: data.userId });
            await Swal.fire({
                icon: 'success',
                title: 'Authentification réussie',
                text: 'Vous vous êtes authentifié avec succès!',
            });
            if (typeof window !== 'undefined') {
                window.location.href = '/AnnulationAgencePage';
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Authentification échouée',
                text: 'Mot de passe ou email incorrect. Réessayez.',
            });
            console.error('Login failed', error);
        }
    };


    const logout = () => {
        localStorage.removeItem('userId');
        setUser(null);
        if (typeof window !== 'undefined') {
            window.location.href = '/';
        }
    };


    return (
        <UserContext.Provider value={{ user, login, loginAgency, logout }}>
            {children}
        </UserContext.Provider>
    );
};