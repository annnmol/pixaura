import {
  FlashList,
  MasonryFlashList,
  MasonryFlashListRef,
} from "@shopify/flash-list";
import React, { useCallback, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useShallow } from "zustand/react/shallow";

//custom imports
import { ThemedText, ThemedView } from "@/src/components/themed";
// import data from "@/assets/dummy/data.json";
import HomeCategoryChip from "@/src/components/home/category-chip";
import HomeFeedCard from "@/src/components/home/feed-card";
import { showHaptics } from "@/src/components/themed/haptics";
import { showToast } from "@/src/components/themed/toast";
import Header from "@/src/components/ui/header";
import ListEmptyComponent from "@/src/components/ui/list-empty-component";
import ListFooterComponent from "@/src/components/ui/list-footer-component";
import ListItemSeparator from "@/src/components/ui/list-item-separator";
import Search, { SearchComponentRef } from "@/src/components/ui/search";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { theme } from "@/src/lib/colors";
import { restartApp } from "@/src/lib/helpers";
import { ImageCategories } from "@/src/lib/image-helpers";
import { ImagesNetworkService } from "@/src/services/images-network-service";
import { useAppStore } from "@/src/store";
import { PixImageType } from "@/types/image-service";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { FlatList } from "react-native-gesture-handler";

const HomeScreen = () => {
  //state
  const filters = useAppStore(useShallow((state) => state.filters));
  const setFilters = useAppStore(useShallow((state) => state.setFilters));
  // const [filters, setFilters] = useState({
  //   q: "",
  //   editor_choice: false,
  //   image_type: "photo",
  //   category: "",
  //   colors: "",
  //   order: "popular",
  // });
  //refs
  const searchComponentRef = useRef<SearchComponentRef>(null);
  const CategoryflashListRef = useRef<FlashList<any>>(null);
  const masonryFlashListRef = useRef<MasonryFlashListRef<any>>(null);

 

  //data fetching
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["images", filters],
    queryFn: ({ pageParam }) => ImagesNetworkService.searchImages(pageParam),
    initialPageParam: { ...filters, page: 1 },
    getNextPageParam: (lastPage: any, pages: any[]) => {
      const page = pages?.length + 1 ?? 1;
      const params = { ...filters, page };
      // console.log(`🚀 ~ getNextPageParam:`, params);
      return params;
    },
    getPreviousPageParam: (lastPage: any, pages: any[]) => {
      const page = pages?.length - 1 > 1 ? pages?.length - 1 : 1;
      const params = { ...filters, page };
      // console.log(`🚀 ~  getPreviousPageParam:`, params);
      return params;
    },
  });

  //data manipulation
  const combinedHits: PixImageType[] = [];
  data?.pages?.forEach((page: any) => {
    combinedHits.push(...page?.hits); // Combine all the hits from all the pages
  });

  function handleFilterPress() {
    // Show toast
    // showHaptics("impactAsync");
    // showToast({
    //   text1: "Refetching images with new filters",
    // });
    restartApp();
    // refetch(filters);
  }

  function onHeaderLogoPress() {
    masonryFlashListRef?.current?.scrollToOffset({ offset: 0, animated: true });
    showHaptics("impactAsync");
  }

  function onSearch(q: string) {
    setFilters((currentFilters) => {
      const temp = { ...currentFilters, q: q };
      // console.log(
      //   `🚀 ~ file: index.tsx:84 ~ fetchSearchResults ~ searchQuery:`,
      //   temp
      // );
      return temp;
    });
  }

  function onCategoryChange(cat: string, index: number) {
    // Scroll to the selected index after setting the filters
    CategoryflashListRef.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0.25, // This attempts to align the item at the center of the FlashList
    });

    setFilters((currentFilters) => {
      let newValue = cat;
      // //remove if already present
      if (currentFilters.category === newValue) newValue = "";

      const temp = { ...currentFilters, category: newValue };
      // console.log(
      //   `🚀 ~ file: index.tsx:84 ~ fetchSearchResults ~ searchQuery:`,
      //   temp
      // );
      return temp;
    });
  }

  const handleScroll = useCallback((event:NativeSyntheticEvent<NativeScrollEvent>) => {
    // const yOffset = event.nativeEvent.contentOffset.y;
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return (
              <Header>
                <Header.Left>
                <TouchableOpacity onPress={onHeaderLogoPress}>
                    <Header.Title>Pixaura</Header.Title>
                </TouchableOpacity>
                </Header.Left>
                <Header.Right>
                  {/* <TouchableOpacity onPress={onHeaderSearchIconPress}>
                    <Ionicons name="search" size={24} color={theme.onPrimary} />
                  </TouchableOpacity> */}
                  <TouchableOpacity onPress={handleFilterPress}>
                    <MaterialCommunityIcons
                      name="filter-variant"
                      size={24}
                      color={theme.onPrimary}
                    />
                  </TouchableOpacity>
                </Header.Right>
              </Header>
            );
          },
        }}
      />

      <Search
        onSearch={onSearch}
        ref={searchComponentRef}
        viewStyles={{ marginHorizontal: 16, marginTop: 12 }}
      />
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
          paddingHorizontal: 12,
          paddingVertical: 0,
        }}
        ItemSeparatorComponent={() => (
          <ListItemSeparator style={{ width: 10 }} />
        )}
        extraData={filters} // This line is added to trigger re-renders on filters change
      />
      <MasonryFlashList
        data={combinedHits ?? []}
        estimatedItemSize={300}
        numColumns={2}
        keyExtractor={(item: PixImageType) => item?.id?.toString()}
        renderItem={HomeFeedCard}
        contentContainerStyle={{
          paddingHorizontal: 12,
        }}
        ItemSeparatorComponent={ListItemSeparator}
        ListFooterComponent={
          combinedHits?.length > 0 ? ListFooterComponent : null
        }
        ListEmptyComponent={
          !isLoading ? ListEmptyComponent : ListFooterComponent
        }
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ref={masonryFlashListRef}
        onScroll={handleScroll}
      />
    </ThemedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    // marginTop:50
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "green",
  },
});
