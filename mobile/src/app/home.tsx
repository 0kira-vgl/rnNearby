import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { View, Alert } from "react-native";

type MarketsProps = PlaceProps & {};

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketsProps[]>([]);

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

  async function fetchMarkets() {
    try {
      if (!category) {
        return;
      } // se não tiver, mate a funcion

      const { data } = await api.get("/markets/category/" + category); // concatena o id
      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Locais", "Não foi possível carregar os locais.");
    }
  }

  // toda vez que a tela for carregada...
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]); // quando category tiver carregado renderize tbm...

  return (
    <View className="flex-1 bg-red-200">
      <Categories
        data={categories}
        onSelect={setCategory} // function que atualiza o estado
        selected={category} // tem a categoria selecionada
      />

      <Places data={markets} />
    </View>
  );
}
