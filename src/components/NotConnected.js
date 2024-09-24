import Link from 'next/link';

export default function NotConnected (){
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-blue-100 p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
                    Bienvenue !
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                    Vous n'êtes pas connecté. Pour accéder à toutes les fonctionnalités, veuillez vous connecter.
                </p>
                <div className="flex justify-center">
                    <Link href="/login/LoginClient" className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
};

