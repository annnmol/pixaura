import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

//custom imports
import { ThemedText, ThemedView } from "@/src/components/themed";
// import data from "@/assets/dummy/data.json";
import HomeCategoryChip from "@/src/components/home/category-chip";
import { showHaptics } from "@/src/components/themed/haptics";
import { showToast } from "@/src/components/themed/toast";
import Header from "@/src/components/ui/header";
import ListItemSeparator from "@/src/components/ui/list-item-separator";
import Search, { SearchComponentRef } from "@/src/components/ui/search";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { getThemeColor, theme } from "@/src/lib/colors";
import { restartApp } from "@/src/lib/helpers";
import { ImageCategories } from "@/src/lib/image-helpers";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ImagesNetworkService } from "@/src/services/images-network-service";
import { useQuery } from "@tanstack/react-query";
import { PixImageType } from "@/types/image-service";
import HomeFeedCard from "@/src/components/home/feed-card";
import ListFooterComponent from "@/src/components/ui/list-footer-component";

const HomeScreen = () => {
  // const insets = useSafeAreaInsets();
  const color = useThemeColor({}, "text");
  const queryRef = useRef<TextInput>();
  const [filters, setFilters] = useState({
    q: "",
    editor_choice: false,
    image_type: "photo",
    category: "",
    colors: "",
  });
  const searchComponentRef = useRef<SearchComponentRef>(null);
  const CategoryflashListRef = useRef<any>(null); // Step 1: Create a ref for the FlashList

  const triggerSearch = () => {
    if (!searchComponentRef.current) return;
    searchComponentRef.current.focusSearch();
  };

  // const textInputRef = useRef<TextInput>(null);

  // console.log(`🚀 ~ file: index.tsx:20 ~ HomeScreen ~ insets:`, insets);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["images", filters],
    queryFn: async () => await ImagesNetworkService.searchImages(filters),
  });

  // console.log(
  //   `🚀 ~ file: index.tsx:25 ~ Index ~ data:`,
  //   data?.hits?.[0]
  //   // isLoading,
  //   // error,
  //   // JSON.stringify(data, null, 2)
  // );
  function handleLogoPress() {
    // Show toast
    showHaptics("impactAsync");
    showToast({
      text1: "A pikachu appeared",
    });
  }
  function handleFilterPress() {
    console.log("value", queryRef.current?.props?.value);
    // Show toast
    // showHaptics("impactAsync");
    // showToast({
    //   text1: "Refetching images with new filters",
    // });
    restartApp();
    // refetch(filters);
  }

  // Define a function to fetch data based on the search query
  async function fetchData(params: any) {
    console.log(
      `🚀 ~ file: index.tsx:84 ~ fetchSearchResults ~ searchQuery:`,
      params
      // filters
    );
  }

  function onSearch(q: string) {
    let temp = { ...filters, q: q };
    console.log(
      `🚀 ~ file: index.tsx:84 ~ fetchSearchResults ~ searchQuery:`,
      temp
      // filters
    );
    // setFilters((prev: any) => ({ ...prev, search: q }));
    setFilters(temp);
    // fetchData(temp);
    // refetch(temp);
  }

  function onCategoryChange(cat: string, index: number) {
    let temp = { ...filters, category: cat };
    console.log(
      `🚀 ~ file: index.tsx:84 ~ fetchSearchResults ~ onCategoryChange:`,
      temp
    );
    // Step 2: Scroll to the selected index after setting the filters
    CategoryflashListRef.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0.25, // This attempts to align the item at the center of the FlashList
    });

    setFilters(temp);
  }

  const onLoadListener = useCallback(({ elapsedTimeInMs }: any) => {
    console.log("Sample List load time", elapsedTimeInMs);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Header>
        <Header.Left>
          <Header.Title>Pixaura</Header.Title>
        </Header.Left>
        <Header.Right>
          <TouchableOpacity onPress={handleFilterPress}>
            <Ionicons name="search" size={24} color={theme.onPrimary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFilterPress}>
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color={theme.onPrimary}
            />
          </TouchableOpacity>
        </Header.Right>
      </Header>
      <ThemedText>Query: {filters.q}</ThemedText>
      <ThemedText>Category: {filters.category}</ThemedText>
      <Search onSearch={onSearch} ref={searchComponentRef} />
      <FlashList
        ref={CategoryflashListRef}
        data={ImageCategories}
        estimatedItemSize={36}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: string) => item.toString()}
        renderItem={({ item, index }) => {
          return (
            <HomeCategoryChip
              item={item}
              index={index}
              isActive={filters?.category === item}
              onPress={(event, item) => onCategoryChange(item, index)}
            />
          );
        }}
        contentContainerStyle={{
          padding: 12,
        }}
        ItemSeparatorComponent={() => (
          <ListItemSeparator style={{ width: 10 }} />
        )}
        extraData={filters} // This line is added to trigger re-renders on filters change
      />
      <MasonryFlashList
        data={data?.hits ?? []}
        estimatedItemSize={300}
        // estimatedListSize={{ height: 100, width: 100 }}
        numColumns={2}
        keyExtractor={(item: PixImageType) => item?.id?.toString()}
        renderItem={HomeFeedCard}
        contentContainerStyle={{
          padding: 12,
          // backgroundColor: getThemeColor({ light: "white" }, "background"),
        }}
        ItemSeparatorComponent={ListItemSeparator}
        // stickyHeaderIndices={[-1]}
        ListFooterComponent={ListFooterComponent}
        //   ListEmptyComponent={ListEmptyComponent}
        //   ListHeaderComponent={() => {
        //     return <Search onSearch={onSearch} ref={searchComponentRef} />;
        //     }}
        showsVerticalScrollIndicator={false}
        //   stickyHeaderHiddenOnScroll={true}
        onLoad={onLoadListener}
      />
    </ThemedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "green",
  },
});
