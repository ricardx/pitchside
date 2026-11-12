import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { games, signups, players } from "@/data/fakeData";
import formatDate from "@/utils/formatDate";
import formatPrice from "@/utils/formatPrice";


export default function GameScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const game = games.find((g) => g.id === id);
    if (game === undefined) return <Text>Game not found</Text>;
    const confirmedSignups = signups.filter((s) => s.gameId === id && s.status === "confirmed");
    const waitlistedSignups = signups
        .filter((s) => s.gameId === id && s.status === "waitlisted")
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const capacity = game.playersPerTeam * 2;
    const spotsLeft = capacity - confirmedSignups.length;
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
        </View>
    )
}