import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { games } from "@/data/fakeData";
import formatDate from "@/utils/formatDate";
import formatPrice from "@/utils/formatPrice";


export default function GameScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const game = games.find((g) => g.id === id);
    if (game === undefined) return <Text>Game not found</Text>;
    return (
        <View>
            <Text>{game.location}</Text>
            <Text>{formatDate(game.startsAt)}</Text>
            <Text>{formatPrice(game.price)}</Text>
        </View>
    )
}