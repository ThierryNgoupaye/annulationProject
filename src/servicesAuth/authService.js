"use client";
import { createContext, useState, useEffect } from 'react';
import Swal from "sweetalert2";
import axiosInstance from "@/axios";



export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const [userContext, setUserContext] = useState(null);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userId = localStorage.getItem('userId');
            if (userId) {
                setUserContext({ userId });
            }
        }
    }, []);

    const login = async (loginData) => {
        try {
            const response = await axiosInstance.post('/login/user', loginData);
            const data = response.data;
            localStorage.setItem('userId', data.userId);
            setUserContext({ userId: data.userId });
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
            const response =  await axiosInstance.post('/login/agence', loginAgencyData);
            const data = response.data;
            localStorage.setItem('userId', data.userId);
            setUserContext({ userId: data.userId });
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
        setUserContext(null);
        if (typeof window !== 'undefined') {
            window.location.href = '/';
        }
    };

    return (
        <UserContext.Provider value={{ userContext, login, loginAgency, logout}}>
            {children}
        </UserContext.Provider>
    );
};