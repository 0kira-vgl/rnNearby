import "@/styles/global.css";
import { View } from "react-native";
import { Welcome } from "@/components/welcome";
export default function App() {
  return (
    <View className="flex-1 p-10 gap-10">
      <Welcome />
    </View>
  );
}
