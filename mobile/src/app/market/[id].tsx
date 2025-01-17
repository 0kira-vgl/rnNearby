import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Coupon } from "@/components/market/coupon";
import { Cover } from "@/components/market/cover";
import { Details, DetailsProps } from "@/components/market/details";
import { api } from "@/services/api";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";
import { useCameraPermissions, CameraView } from "expo-camera";

type DataProps = DetailsProps & {
  cover: string;
};

export default function Market() {
  const [data, setData] = useState<DataProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const params = useLocalSearchParams<{ id: string }>(); // usado para acessar os parâmetros de consulta
  const [_, requestPermission] = useCameraPermissions();

  const qrLock = useRef(false); // para ler o qr apenas uma vez

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data); // popula o componente com os dados do local
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert(
          "Permissão de câmera",
          "Precisamos que habilite o uso da câmera."
        );
      }

      qrLock.current = false;
      setIsVisibleCameraModal(true); // estado update
    } catch (error) {
      console.log(error);
      Alert.alert("câmera", "Não foi possível utilizar a câmera.");
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);

    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) },
      ]
    );
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);

      const { data } = await api.get(`/coupons/${id}`);

      Alert.alert("Cupom", data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert("Cupom", "Não foi possível utilizar o cupom.");
    } finally {
      setCouponIsFetching(false);
    }

    // setIsVisibleCameraModal(false); // fecha a câmera
    // setCoupon(id); // atualiza o cupom
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading />;
  } // enquanto carrega mostra um loading

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View className="p-8">
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true; // bloqueia a leitura do qr
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
          style={{ flex: 1 }}
        />

        <View className="absolute bottom-10 left-8 right-8">
          {/*fecha a camera*/}
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
