"use client";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/servicesAuth/authService";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Swal from "sweetalert2";
import axiosInstance from "@/axios";



export default function AnnulationClientPage() {
    const [cancelledTrips, setCancelledTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [displayedTrips, setDisplayedTrips] = useState([]);
    const [user, setUser] = useState(null);
    const { userContext } = useContext(UserContext);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [visibleTrips, setVisibleTrips] = useState(10);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userContext && userContext.userId) {
            fetchUserTrips(userContext.userId).then(r => {});
        }
    }, [userContext]);


    const fetchUserTrips = async (idUser) => {
        try {
            const response = await axiosInstance.get(`/historiques/user/${idUser}`);
            if (response.data) {
                const voyagesFiltres = response.data.data;
                setCancelledTrips(voyagesFiltres);
                setFilteredTrips(voyagesFiltres);
                setDisplayedTrips(voyagesFiltres.slice(0, 10));
                setVisibleTrips(10);
            } else {
                setError("Aucun voyage trouvé");
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
            setError("Erreur lors de la récupération des voyages");
            await Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Erreur lors de la récupération des voyages. Veuillez réessayer plus tard.',
            });
        }
    };


    const handleDateFilter = () => {
        const filtered = cancelledTrips.filter(trip => {
            if (!startDate && !endDate) {
                return true;
            }
            if (trip.dateAnnulation === null) {
                return false;
            }
            const cancellationDate = new Date(trip.dateAnnulation);
            if (isNaN(cancellationDate.getTime())) {
                console.warn(`Date d'annulation invalide pour le voyage:`, trip);
                return false;
            }
            const startDateObj = startDate ? new Date(startDate) : null;
            const endDateObj = endDate ? new Date(endDate) : null;
            if (startDateObj && !endDateObj) {
                return cancellationDate >= startDateObj;
            }
            if (!startDateObj && endDateObj) {
                return cancellationDate <= endDateObj;
            }
            return cancellationDate >= startDateObj && cancellationDate <= endDateObj;
        });
        setFilteredTrips(filtered);
        setDisplayedTrips(filtered.slice(0, 10));
        setVisibleTrips(10);
    };

    const loadMoreTrips = () => {
        const newVisibleTrips = visibleTrips + 1;
        setVisibleTrips(newVisibleTrips);
        setDisplayedTrips(filteredTrips.slice(0, newVisibleTrips));
    };



    return (
        <>
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="flex-grow">
                    <div className="container mx-auto p-4 mt-10">
                        {/*<h1 className="text-3xl font-bold mb-10">HistoriqueClient des voyages annulés</h1> */}
                        <div className="mb-6">
                            <label className="mr-4 font-bold">
                                Debut :
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="mr-2 p-2 border rounded"
                            />
                            <label className="ml-4 mr-4 font-bold">
                                Debut :
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="mr-2 p-2 border rounded"
                            />
                            <button
                                onClick={handleDateFilter}
                                className="ml-4 bg-blue-500 hover:bg-blue-800 text-white p-2 rounded"
                            >
                                Rechercher suivant une période
                            </button>
                        </div>
                        <div className="mb-4 mt-5 font-bold text-xl text-blue-800">
                            {startDate || endDate ? (
                                <p>
                                    Affichage des voyages annulés
                                    {startDate ? ` à partir du ${new Date(startDate).toLocaleDateString()}` : ''}
                                    {endDate ? ` jusqu'au ${new Date(endDate).toLocaleDateString()}` : ''}
                                </p>
                            ) : (
                                <p>Affichage de tous les voyages annulés</p>
                            )}
                        </div>
                        {displayedTrips.length > 0 ? (
                            <div className="overflow-x-auto mb-10">
                                <table className="w-full bg-white border border-gray-200 rounded-xl shadow-md">
                                    <thead>
                                    <tr className="bg-blue-100">
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">#</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nom
                                            Agence
                                        </th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Numero
                                            de voyage
                                        </th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date
                                            d'annulation
                                        </th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Taux
                                            d'indemnisation
                                        </th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Cause
                                            d'annulation
                                        </th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Annulation

                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/* Afficher un nombre de voyages annulés egal à un nombre ficher */}
                                    {displayedTrips.map((trip, index) => (
                                        <tr key={trip.id} className={index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{trip.nomAgence}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{trip.idVoyage}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{new Date(trip.dateAnnulation).toLocaleDateString()}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{trip.tauxIndemnisation}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{trip.descriptionAnnulation}</td>
                                            <td className="border-b border-gray-300 px-6 py-4 whitespace-nowrap">{trip.causeAnnulation}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>Aucun voyage annulé trouvé.</p>
                        )}

                        {filteredTrips.length > visibleTrips && (
                            <div className="text-center">
                                <button
                                    onClick={loadMoreTrips}
                                    className="bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded-md"
                                >
                                    Voir plus
                                </button>
                            </div>
                        )}
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
}