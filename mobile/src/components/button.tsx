import {
  Text,
  TextProps,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from "react-native";
import { twMerge } from "tailwind-merge";
import { colors } from "@/styles/theme";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";

type ButtonProps = PressableProps & {
  isLoading?: boolean;
};

function Button({
  isLoading = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      className={twMerge(
        "h-14 max-h-14 bg-GREEN-base rounded-[10] items-center justify-center flex-row gap-[14]",
        className
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </Pressable>
  );
}

function Title({ children }: TextProps) {
  return (
    <Text className="text-GRAY-100 text-lg font-semibold">{children}</Text>
  );
}

type IconProps = {
  icon: React.ComponentType<TablerIconProps>;
};

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
