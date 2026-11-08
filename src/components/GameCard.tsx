import { Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { Game } from "@/data/fakeData";
import formatDate from "@/utils/formatDate";
import formatPrice from "@/utils/formatPrice";

type GameCardProps = {
    game: Game;
};

export default function GameCard({ game }: GameCardProps) {
    return (
        <Link href={`/game/${game.id}`} asChild>
            <Pressable>
                <Text>{game.location}</Text>
                <Text>{formatDate(game.startsAt)}</Text>
                <Text>{formatPrice(game.price)}</Text>
            </Pressable>
        </Link>
    )
}