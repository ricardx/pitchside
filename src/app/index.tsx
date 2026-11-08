import { View, StyleSheet } from "react-native";
import { games } from "@/data/fakeData";
import GameCard from "@/components/GameCard"

export default function Index() {
  return (
    <View style={styles.container}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
