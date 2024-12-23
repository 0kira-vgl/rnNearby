import { Pressable, PressableProps, Text } from "react-native";
import { categoriesIcons } from "@/utils/categories-icons";
import { colors, fontFamily } from "@/styles/theme";
import { twMerge } from "tailwind-merge";

type CategoryPros = PressableProps & {
  name: string;
  iconId: string;
  isSelected?: boolean;
};

export function Category({
  name,
  iconId,
  isSelected = false,
  ...rest
}: CategoryPros) {
  const Icon = categoriesIcons[iconId]; // procura pelo icon

  return (
    <Pressable
      className={twMerge(
        "h-9 bg-GRAY-100 border border-GRAY-300 items-center rounded-lg justify-center flex-row px-3 gap-[10]",
        isSelected && "bg-GREEN-base border-[0]" // estilização condicional
      )}
      {...rest}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text
        className={twMerge(
          "text-sm text-GRAY-500",
          isSelected && "text-GRAY-100"
        )}
        style={{ fontFamily: fontFamily.regular }}
      >
        {name}
      </Text>
    </Pressable>
  );
}
