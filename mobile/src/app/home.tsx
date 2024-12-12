import { api } from "@/services/api";
import { useEffect } from "react";
import { View, Text, Alert } from "react-native";

export default function Home() {
  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      console.log(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias.");
    }
  }

  // toda vez que a tela for carregada...
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Home</Text>
    </View>
  );
}
