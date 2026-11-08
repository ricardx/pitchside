import { View, Text } from "react-native";
import { Game } from "@/data/fakeData";
import formatDate from "@/utils/formatDate";
import formatPrice from "@/utils/formatPrice";

type GameCardProps = {
    game: Game;
};

export default function GameCard({ game }: GameCardProps) {
    return (
        <View>
            <Text>{game.location}</Text>
            <Text>{formatDate(game.startsAt)}</Text>
            <Text>{formatPrice(game.price)}</Text>
        </View>
    )
}