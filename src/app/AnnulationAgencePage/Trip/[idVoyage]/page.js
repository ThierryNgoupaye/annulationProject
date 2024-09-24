"use client";
import NavBar from "@/components/navbarAgency";
import Footer from "@/components/footer";
import {useContext, useEffect, useState} from "react";
import Image from 'next/image';
import PhotoBus from "../../../../../public/photoVoyage.avif";
import Swal from "sweetalert2";
import {UserContext} from "@/servicesAuth/authService";
import axiosInstance from "@/axios";



export default function AnnulationAgencyPage({ params }) {


    const [agencyTrip, setAgencyTrip] = useState({});
    const tripId = params.idVoyage;
    const { userContext } = useContext(UserContext);


    useEffect(() => {
        if (userContext && userContext.userId && tripId)
        {
            fetchUserTrips(tripId).then(r => {});
        }
    }, [userContext]);


    const fetchUserTrips = async (idVoyage) => {
        try {
            const response = await axiosInstance.get(`/voyages/detailsAgence/${idVoyage}`);
            setAgencyTrip(response.data.data);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };


    const handleDelete = async (piece) => {
        const result = await Swal.fire({
            title: 'Causes de l\'annulation',
            input: 'textarea',
            inputLabel: 'Quelles peuvent être les raisons de l\'annulation de votre voyage ?',
            inputPlaceholder: 'Saisissez les détails ici...',
            inputAttributes: {
                'aria-label': 'Saisissez les détails ici',
            },
            showCancelButton: true,
            confirmButtonText: 'Envoyer',
            cancelButtonText: 'Annuler',
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
                if (!value) {
                    Swal.showValidationMessage('Veuillez saisir les causes de l\'annulation');
                }
                return value;
            },
        });

        if (result.isConfirmed && result.value) {
            const text = result.value;
            const dataToSend = {
                descriptionCause: text,
                idVoyage: tripId,
            };

            try {
                const response = await axiosInstance.post('/agences/cancelled', dataToSend);
                await Swal.fire('Annulation réussie', 'Les raisons et les informations du voyage ont été envoyées avec succès.', 'success');
                //fetchUserTrips(tripId);
            } catch (error) {
                await Swal.fire('Erreur', `Une erreur est survenue : ${error.message}`, 'error');
            }
        }
    };
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <NavBar/>
                <main className="flex-grow overflow-y-auto mb-5 ">
                    <div className="mt-4 flex min-h-[calc(100vh-100px)]">
                        {/* Première colonne */}
                        <div className="ml-2 mt-8 mr-5 w-2/3 rounded-lg">
                            <div className="flex">
                                    <div className='mt-1 h-3/4 w-full '>
                                        <Image className="w-full h-[400px] px-5 py-3 mt-2" src={PhotoBus}
                                               alt="voyage"/>
                                    </div>
                            </div>
                                <div className='mt-2 h-1/4 w-full mb-5'>
                                    <p className="mt-5 ml-10 text-bold font-bold text-2xl text-red-400"> Politique d'annulation </p>
                                    <p className="mt-5 5 ml-5 mb-1 font-bold  mr-2"> Pour compenser l'annulation de  voyage, nous offrons les options suivantes : </p>
                                       <p className="ml-4 mt-4 mr-2 text-justify"> * Coupon de Valeur Égale : Les passagers affectés recevront un coupon d'une valeur équivalente au montant de leur réservation pour le voyage annulé.
                                       Ce coupon peut être utilisé pour réserver un autre voyage avec notre agence dans un délai spécifié.
                                       </p>
                                       <p className= "ml-4  mr-2 text-justify"> * Coupon avec Surplus : Dans certains cas, nous offrons un coupon d'une valeur supérieure à celle du montant que vous avez payé pour le voyage annulé. Ce coupon permettra aux clients
                                           de l'agence de bénéficier d'un avantage supplémentaire lors de leurs prochaines réservations avec nous
                                       </p>
                                </div>
                        </div>

                        {/*deuxieme colonne */}
                        <div className="mt-8 ml-5 mr-4 w-1/3 ">
                            <table className="min-w-full h-full bg-white border border-blue-300 rounded-xl shadow-md ">
                                <thead>
                                <tr className="bg-blue-400">
                                    <th className="border-b border-gray-300 px-6 py-3 text-center text-xl font-bold text-gray-900 uppercase tracking-wider">Détails du voyage
                                    </th>
                                </tr>
                                </thead>
                                <tbody>

                                    { agencyTrip? (
                                    <tr  className = 'bg-blue-50'>
                                        <td className="border-b border-gray-300 px-6 py-4">
                                            <div className="flex flex-col">
                                                <div className="mb-4"><strong>Numero du voyage:</strong> {tripId}</div>
                                                <div className="mb-4"><strong>Nom de l'agence
                                                    :</strong> {agencyTrip.nomAgence}</div>
                                                <div className="mb-4"><strong>Nombre de
                                                    réservations:</strong> {agencyTrip.nbreReservation}</div>
                                                <div className="mb-4">
                                                    <strong>Nombre de places:</strong> {agencyTrip.nbrePlace}</div>
                                                <div className="mb-4"><strong>Date de
                                                    publication:</strong> {new Date(agencyTrip.datePublication).toLocaleDateString()}
                                                </div>
                                                <div className="mb-4"><strong>Date limite de
                                                    réservation </strong> {new Date(agencyTrip.dateLimReservation).toLocaleDateString()}
                                                </div>
                                                <div className="mb-4"><strong>Date limite de confirmation
                                                    :</strong> {new Date(agencyTrip.dateLimConfirmation).toLocaleDateString()}
                                                </div>
                                                <div className="mb-4"><strong>Lieu de départ :</strong> {agencyTrip.lieuDepart}</div>
                                                <div className="mb-4"><strong>Lieu arrivée:</strong> {agencyTrip.lieuArrive}</div>
                                                <div className="mb-4"><strong>Date de depart : </strong> {new Date(agencyTrip.dateDebut).toLocaleDateString()}</div>

                                                <div className="mt-10 flex items-center justify-center">
                                                    <button
                                                        onClick={() => handleDelete(agencyTrip)}
                                                        className="bg-red-400 hover:bg-red-600 text-white py-1 px-3 rounded-md">
                                                        Annuler
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : <p> Chargement des données </p>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
}
