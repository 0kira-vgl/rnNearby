import { View, Text, Image } from "react-native";

export function Welcome() {
  return (
    <View>
      <Image
        source={require("@/assets/logo.png")}
        className="size-12 mt-6 mb-7"
      />

      <Text className="text-2xl font-bold text-GRAY-600">
        Boas vindas ao Nearby!
      </Text>
      <Text className="text-base text-GRAY-500 mt-3">
        Tenha cupons de vantagem para usar em {"\n"} seus estabelecimentos
        favoritos.
      </Text>
    </View>
  );
}
