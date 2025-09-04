
import React, { useState } from 'react';
import Header from './components/Header.tsx';
import MatchCard from './components/MatchCard.tsx';
import CreateMatchForm from './components/CreateMatchForm.tsx';
import useMatches from './hooks/useMatches.ts';
import { Match, Player } from './types.ts';
import Footer from './components/Footer.tsx';

function App() {
    const { matches, addMatch, joinMatch } = useMatches();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateMatch = (newMatch: Omit<Match, 'id' | 'players'>) => {
        const organizer: Player = { id: `player-${Date.now()}`, name: newMatch.organizer.name };
        const matchWithId: Match = {
            ...newMatch,
            id: `match-${Date.now()}`,
            players: [organizer],
        };
        addMatch(matchWithId);
        setIsModalOpen(false);
    };

    const handleJoinMatch = (matchId: string) => {
        const playerName = prompt("Introduce tu nombre para unirte:");
        if (playerName) {
            joinMatch(matchId, playerName);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 font-sans flex flex-col">
            <Header onOpenModal={() => setIsModalOpen(true)} />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-emerald-400">Partidos Abiertos</h1>
                </div>

                {matches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matches.map((match) => (
                            <MatchCard 
                                key={match.id} 
                                match={match} 
                                onJoin={() => handleJoinMatch(match.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-800 rounded-lg">
                        <p className="text-gray-400 text-xl">No hay partidos disponibles en este momento.</p>
                        <p className="text-gray-500 mt-2">¡Crea uno para empezar a jugar!</p>
                    </div>
                )}
            </main>

            {isModalOpen && (
                <CreateMatchForm
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateMatch}
                />
            )}
            
            <Footer />
        </div>
    );
}

export default App;
