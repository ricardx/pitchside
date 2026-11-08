import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";


export default function GameScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
    <View>
        <Text>Game {id}</Text>
    </View>
    )
}