import { ActivityIndicator } from "react-native";
import { colors } from "@/styles/theme";
export function Loading() {
  return (
    <ActivityIndicator
      color={colors.green.base}
      className="flex-1 justify-center items-center bg-GRAY-100"
    />
  );
}
