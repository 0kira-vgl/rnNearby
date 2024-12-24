import { colors, fontFamily } from "@/styles/theme";
import { IconProps } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";

type InfoProps = {
  description: string;
  icon: React.ComponentType<IconProps>;
};

export function Info({ description, icon: Icon }: InfoProps) {
  return (
    <View className="flex-row items-center gap-2">
      <Icon size={16} color={colors.gray[400]} />
      <Text
        className="text-GRAY-500 text-sm flex-1"
        style={{ fontFamily: fontFamily.regular, lineHeight: 22.4 }}
      >
        {description}
      </Text>
    </View>
  );
}
