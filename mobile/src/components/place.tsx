import { Image, Pressable, PressableProps, Text, View } from "react-native";
import { IconTicket } from "@tabler/icons-react-native";
import { colors, fontFamily } from "@/styles/theme";

export type PlaceProps = {
  id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
};

type Props = PressableProps & {
  data: PlaceProps;
};

export function Place({ data, ...rest }: Props) {
  return (
    <Pressable
      className="h-[120] w-full p-2 border border-GRAY-200 rounded-xl flex-row gap-4 items-center"
      {...rest}
    >
      <Image
        className="w-[116] h-[104] bg-gray-200 rounded-lg"
        source={{ uri: data.cover }}
      />

      <View className="flex-1 gap-1">
        <Text
          className="text-sm text-GRAY-600"
          style={{ fontFamily: fontFamily.medium }}
        >
          {data.name}
        </Text>
        <Text
          className="text-xs text-GRAY-500"
          style={{ fontFamily: fontFamily.regular }}
          numberOfLines={2} // define o numero max de linhas e add "..."
        >
          {data.description}
        </Text>

        <View className="flex-row gap-[7] mt-[10] items-center">
          <IconTicket size={16} color={colors.red.base} />
          <Text
            className="text-xs text-GRAY-400"
            style={{ fontFamily: fontFamily.regular }}
          >
            {data.coupons} cupons disponíveis
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
