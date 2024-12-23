import { Categories, CategoriesProps } from "@/components/categories";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { View, Alert } from "react-native";

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data); // pega o id e o name
      setCategory(data[0].id); // pega a primeira categoria e deixa selecionada por padrão
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
    <View className="flex-1">
      <Categories
        data={categories}
        onSelect={setCategory} // function que atualiza o estado
        selected={category} // tem a categoria selecionada
      />
    </View>
  );
}
