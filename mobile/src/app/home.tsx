import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/services/api";
import { fontFamily } from "@/styles/theme";
import { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

type MarketsProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentProps = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home({ latitude, longitude }: MarketsProps) {
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

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentProps.latitude,
          longitude: currentProps.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentProps.latitude,
            longitude: currentProps.longitude,
          }}
          image={require("@/assets/location.png")} // troca a imagem padrão
        />

        {markets.map((item) => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout>
              <View>
                <Text
                  className="text-sm text-GRAY-600"
                  style={{ fontFamily: fontFamily.medium }}
                >
                  {item.name}
                </Text>
                <Text
                  className="text-xs text-GRAY-600"
                  style={{ fontFamily: fontFamily.regular }}
                >
                  {item.address}
                </Text>
              </View>
            </Callout>
          </Marker> // percorrendo os lugares...
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  );
}
