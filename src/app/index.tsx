import { Text, View, StyleSheet } from "react-native";
import { games } from "@/data/fakeData";

export default function Index() {
  return (
    <View style={styles.container}>
      {games.map((game) => (
        <View key={game.id}>
          <Text>{game.location}</Text>
          <Text>{game.startsAt}</Text>
        </View>
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
