import { Tabs } from "expo-router/js-tabs";

export default function RootLayout() {
  return (<Tabs>
    <Tabs.Screen name="index"/>
    <Tabs.Screen name="leagues"/>
    <Tabs.Screen name="profile"/>
  </Tabs>
  );
}
