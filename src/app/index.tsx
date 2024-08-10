import { useQuery } from "@tanstack/react-query";
import { Redirect } from "expo-router";

//custom imports
import { DummyNetworkService } from "@/src/services/dummy-network-service";
import { useEffect } from "react";

export default function Index() {
  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["flights", "all"],
  //   queryFn: async () =>
  //     await DummyNetworkService.getAllFlights(),
  // });

  // const getDummyData = () => {
  //   DummyNetworkService.getAllFlights()
  //     .then((res) => {
  //       // console.log(`🚀 ~ file: index.tsx:17 ~ DummyNetworkService.getAllFlights ~ res`, JSON.stringify(res,null,2))
  //     })
  //     .catch((err) => {
  //       console.log(
  //         `🚀 ~ file: index.tsx:19 ~ DummyNetworkService.getAllFlights ~ err`,
  //         err
  //       );
  //     });
  // };

  // // console.log(`🚀 ~ file: index.tsx:21 ~ Index ~ authSession:`, authSession);
  // useEffect(() => {
  //   getDummyData();
  // }, []);

  // // refetch();

  // console.log(
  //   `🚀 ~ file: index.tsx:25 ~ Index ~ data:`,
  //   data,
  //   isLoading,
  //   error,
  //   JSON.stringify(data, null, 2)
  // );

  return <Redirect href="/welcome" />;
}
