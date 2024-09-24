"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "@/servicesAuth/authService";
import axios from 'axios';
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Swal from "sweetalert2";
import axiosInstance from "@/axios";




export default function AnnulationClientPage() {

    const [trips, setTrips] = useState([]);
    const { userContext } = useContext(UserContext);


    useEffect(() => {
        if (userContext && userContext.userId) {
            fetchUserTrips(userContext.userId).then(r => {});
        }
    }, [userContext]);


    const fetchUserTrips = async (idUser) => {
        try {
            const response = await axiosInstance.get(`/voyages/actif/user/${idUser}`);
            console.log('Réponse API pour les voyages :', response.data.data);
            setTrips(response.data.data);
        } catch (error) {
            console.error('Error fetching trips:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Erreur lors de la récupération des voyages. Veuillez réessayer plus tard.',
            });
        }
    };


    return (
            <>
                <div className="flex flex-col min-h-screen">
                    <NavBar />
                    <main className="flex-grow">
                        <div className="container mx-auto p-4 mt-10">
                            <h1 className="text-3xl font-bold mb-10">Tous Mes Voyages Réservés</h1>
                            <div className="overflow-x-auto mb-10">
                                <table className="w-screen bg-white border border-gray-200 rounded-lg shadow-md">
                                    <thead>
                                    <tr className="bg-blue-100">
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">#</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nom Agence</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date de Depart</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Prix</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Classe</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {trips.map((trip, index) => (
                                        <tr key={trip.id} className={index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{trip.nomAgence}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{new Date(trip.dateDebut).toLocaleDateString()}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{trip.prix}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{trip.classe}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{trip.status}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">
                                                <Link href={`/AnnulationClientPage/Trip/${trip.voyageId}`}>
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
