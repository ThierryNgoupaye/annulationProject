"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "@/servicesAuth/authService";
import axios from 'axios';
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Swal from "sweetalert2";



export default function AnnulationClientPage() {

    const [pieces, setPieces] = useState([]);
    const [utilisateur, setUser] = useState(null);
    const {user, logout} = useContext(UserContext);


    useEffect(() => {
        if (user && user.userId) {
            fetchUserData(user.userId).then(r => {
            });
        }
    }, [user]);


    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/getClient/${userId}`);
            setUser(response.data[0]);
            // console.log('Données utilisateur récupérées :', response.data);
        } catch (error) {
            console.log('erreur lors du chargement des informations de l\'utilisateur', error);
        }
    };


    useEffect(() => {
        if (utilisateur) {
            console.log('Utilisateur disponible:', utilisateur);
            fetchUserTrips(utilisateur.id_utilisateur).then(r => {});
        }
    }, [utilisateur]);


    const fetchUserTrips = async (idUser) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/get/${idUser}`);
            console.log('Réponse API pour les voyages :', response.data);
            setPieces(response.data);
        } catch (error) {
            console.error('Error fetching trips:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Erreur lors de la récupération des voyages. Veuillez réessayer plus tard.',
            });
        }
    };



    if (!user)
    {
        return (
            <div>
                <p className="text-center text-3xl font-bold text-red-600 ">Vous n'êtes pas connecté</p>
                <Link className="text-xl mt-10" href="/login/LoginClient">Connectez vous pour continuer ... </Link>
            </div>
        );
    }
    else
    {
        return (
            <>
                <div className="flex flex-col min-h-screen">
                    <NavBar />
                    <main className="flex-grow">
                        <div className="container mx-auto p-4 mt-10">
                            <h1 className="text-3xl font-bold mb-10">Tous Mes Voyages Réservés</h1>
                            <div className="overflow-x-auto mb-10">
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                    <thead>
                                    <tr className="bg-blue-100">
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">#</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nom</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Prix</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Description</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Etat</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {pieces.map((piece, index) => (
                                        <tr key={piece.id} className={index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{piece.id_piece}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{piece.nom_piece}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{piece.prix_piece}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{piece.description_piece}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{piece.etat}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">
                                                <Link href={`/AnnulationClientPage/${piece.id_piece}`}>
                                                    <button
                                                        className="bg-red-400 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                                                    >
                                                        Annuler
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </>
        );
    }
}
