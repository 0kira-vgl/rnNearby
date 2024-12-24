import { Text, View } from "react-native";
import { colors, fontFamily } from "@/styles/theme";
import { IconTicket } from "@tabler/icons-react-native";

type CouponProps = {
  code: string;
};

export function Coupon({ code }: CouponProps) {
  return (
    <View className="px-8">
      <Text
        className="text-GRAY-500 mb-3 text-sm"
        style={{ fontFamily: fontFamily.medium }}
      >
        Utilize esse cupom
      </Text>

      <View className="flex-row bg-GREEN-soft px-2 py-[10] rounded-lg items-center gap-[10]">
        <IconTicket size={24} color={colors.green.light} />
        <Text className="text-GRAY-600 text-base font-semibold uppercase">
          {code}
        </Text>
      </View>
    </View>
  );
}
