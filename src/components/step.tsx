import { View, Text } from "react-native";
import { colors } from "@/styles/theme";
import { IconProps } from "@tabler/icons-react-native";

type StepProps = {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
};

export function Step({ title, description, icon: Icon }: StepProps) {
  return (
    <View className="w-full flex-row gap-4">
      <Icon size={32} color={colors.red.base} />

      <View className="flex-1">
        <Text className="text-base font-bold text-GRAY-600">{title}</Text>
        <Text className="text-sm text-GRAY-500 mt-1">{description}</Text>
      </View>
    </View>
  );
}
