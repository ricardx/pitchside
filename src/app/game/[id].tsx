import { View, Text, Button } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { games, signups, players, currentPlayerId, Signup, Game } from "@/data/fakeData";
import formatDate from "@/utils/formatDate";
import formatPrice from "@/utils/formatPrice";



export default function GameScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [allSignups, setAllSignups] = useState(signups);
    const game = games.find((g) => g.id === id);
    if (game === undefined) return <Text>Game not found</Text>;
    const confirmedSignups = allSignups.filter((s) => s.gameId === id && s.status === "confirmed");
    const waitlistedSignups = allSignups
        .filter((s) => s.gameId === id && s.status === "waitlisted")
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const capacity = game.playersPerTeam * 2;
    const spotsLeft = capacity - confirmedSignups.length;
    const handleSignup = () => {
        const newSignup: Signup = {
            id: `s${Date.now()}`,
            gameId: game.id,
            playerId: currentPlayerId,
            status: spotsLeft <= 0 ? "waitlisted" : "confirmed",
            createdAt: new Date().toISOString()
        }
        const updatedSignups = [...allSignups, newSignup];
        setAllSignups(updatedSignups);
    }
    const currentPlayerSignup = allSignups.find((s) => (
        s.gameId === game.id && s.playerId === currentPlayerId && s.status !== "dropped"
    ))
    return (
        <View>
            <Text>{game.location}</Text>
            <Text>{formatDate(game.startsAt)}</Text>
            <Text>{formatPrice(game.price)}</Text>
            <Text>{spotsLeft} spots left.</Text>
            <Text>Confirmed Players:</Text>
            {
                confirmedSignups.map((s) => (
                    <Text key={s.id}>
                        {players.find((p) => p.id === s.playerId)?.name}
                    </Text>
                ))
            }
            <Text>Waitlisted Players:</Text>
            {
                waitlistedSignups.map((s, index) => (
                    <Text key={s.id}>
                        {index + 1}. {players.find((p) => p.id === s.playerId)?.name}
                    </Text>
                ))
            }
            {currentPlayerSignup === undefined && <Button title="Sign up" onPress={handleSignup} />}
        </View>
    )
}