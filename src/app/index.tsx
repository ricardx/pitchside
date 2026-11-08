import { Text, View, StyleSheet } from "react-native";
import { games } from "@/data/fakeData";
import formatDate from "@/utils/formatDate";

export default function Index() {
  return (
    <View style={styles.container}>
      {games.map((game) => (
        <View key={game.id}>
          <Text>{game.location}</Text>
          <Text>{formatDate(game.startsAt)}</Text>
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
