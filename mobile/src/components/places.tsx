import { useWindowDimensions, Text } from "react-native";
import { Place, PlaceProps } from "./place";
import { useRef } from "react";
import { s } from "@/styles/places";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

type PlacesProps = {
  data: PlaceProps[];
};

export function Places({ data }: PlacesProps) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null); // certe para ter acesso ao parametros, tal qual {...rest}

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
        renderItem={({ item }) => <Place data={item} />}
        contentContainerStyle={s.content}
        ListHeaderComponent={() => (
          <Text style={s.title}>Explore locais perto de você</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>

    // <View className="bg-GRAY-100">
    //   <View className="gap-3 p-6 pb-[100]"></View>

    //   <View className="w-20 h-1 bg-GRAY-300"></View>

    //   <Text
    //     className="text-GRAY-600 text-base mb-4"
    //     style={{ fontFamily: fontFamily.regular }}
    //   ></Text>
    // </View>
  );
}
