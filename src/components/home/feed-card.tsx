import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

//custom imports
import { blurhash } from "@/src/lib/helpers";
import { getImageHeight } from "@/src/lib/image-helpers";
import { PixImageType } from "@/types/image-service";

function HomeFeedCard({ item, index }: { item: PixImageType; index: number }) {
  const marginRight = index % 2 === 0 ? 12 : 0; // Add right margin to items in the left column
  const imageHeight = getImageHeight(item.imageWidth, item.imageHeight);

  function handlePress() { 
    router?.push(`/image/${item.id}`);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.listItemContainer, { marginRight }]}
      onPress={handlePress}
    >
      <Image
        source={{ uri: item?.webformatURL }}
        style={[styles.listImage, { height: imageHeight }]}
        contentFit="cover"
        placeholder={blurhash}
        transition={100}
      />
    </TouchableOpacity>
  );
}

export default HomeFeedCard;

const styles = StyleSheet.create({
  container: {},
  listItemContainer: { flex: 1, borderRadius: 10 },
  listImage: { borderRadius: 10, width: "100%", height: 250 },
});
