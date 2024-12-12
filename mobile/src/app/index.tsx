import { View } from "react-native";
import { router } from "expo-router";
import { Welcome } from "@/components/welcome";
import { Steps } from "@/components/steps";
import { Button } from "@/components/button";
export default function App() {
  return (
    <View className="flex-1 p-10 gap-10">
      <Welcome />
      <Steps />

      <Button onPress={() => router.navigate("/home")}>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  );
}
