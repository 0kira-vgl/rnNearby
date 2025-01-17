import { useWindowDimensions, Text } from "react-native";
import { Place, PlaceProps } from "./place";
import { useRef } from "react";
import { s } from "@/styles/places";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { router } from "expo-router";

type PlacesProps = {
  data: PlaceProps[];
};

export function Places({ data }: PlacesProps) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null); // serve para ter acesso ao parametros, tal qual {...rest}

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]} // tamanho da tela
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false} // para não passar do limite delimitado
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.navigate(`/market/${item.id}`)}
          />
        )}
        contentContainerStyle={s.content}
        ListHeaderComponent={() => (
          <Text style={s.title}>Explore locais perto de você</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
