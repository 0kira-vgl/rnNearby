import { View, Text, FlatList } from "react-native";
import { Category } from "./category";

export type CategoriesProps = {
  id: string;
  name: string;
}[]; // indica que é uma lista

type Props = {
  data: CategoriesProps;
  selected: string;
  onSelect: (id: string) => void;
};

export function Categories({ data, selected, onSelect }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelect(item.id)} // quando pressionar pegara o id
          isSelected={item.id === selected} // verifica se esta selecionado
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
      style={{ maxHeight: 36, position: "absolute", zIndex: 1, top: 64 }}
    />
  );
}
