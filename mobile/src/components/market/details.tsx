import { colors, fontFamily } from "@/styles/theme";
import { Text, View } from "react-native";
import { Info } from "./info";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";

export type DetailsProps = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
};

type Props = {
  data: DetailsProps;
};
export function Details({ data }: Props) {
  return (
    <View
      className="p-8 pb-0 bg-GRAY-100"
      style={{ borderTopStartRadius: 20, borderTopEndRadius: 20 }}
    >
      <Text className="text-xl font-bold text-GRAY-600">{data.name}</Text>
      <Text
        className="text-base text-GRAY-600 mt-3 mb-8"
        style={{ fontFamily: fontFamily.regular, lineHeight: 22 }}
      >
        {data.description}
      </Text>

      <View
        className="w-full pb-4 mb-4"
        style={{ borderBottomWidth: 1, borderBottomColor: colors.gray[200] }}
      >
        <Text
          className="text-sm text-GRAY-500 mb-3"
          style={{ fontFamily: fontFamily.medium }}
        >
          Informações
        </Text>

        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>

      <View
        className="w-full pb-4 mb-4"
        style={{ borderBottomWidth: 1, borderBottomColor: colors.gray[200] }}
      >
        <Text
          className="text-sm text-GRAY-500 mb-3"
          style={{ fontFamily: fontFamily.medium }}
        >
          Regulamento
        </Text>

        {data.rules.map((item) => (
          <Text key={item.id}>{`\u2022 ${item.description}`}</Text>
        ))}
      </View>
    </View>
  );
}
