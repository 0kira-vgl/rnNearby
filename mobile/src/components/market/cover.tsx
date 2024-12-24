import { ImageBackground, View } from "react-native";
import { Button } from "../button";
import { router } from "expo-router";
import { IconArrowLeft } from "@tabler/icons-react-native";

type CoverProps = {
  uri: string;
};

export function Cover({ uri }: CoverProps) {
  return (
    <ImageBackground
      source={{ uri }}
      className="w-full h-[232] -mb-8 bg-GRAY-200"
    >
      <View className="p-6 pt-[46]">
        <Button className="w-10 h-10" onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}
