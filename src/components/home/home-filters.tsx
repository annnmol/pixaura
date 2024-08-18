import { useThemeColor } from "@/src/hooks/useThemeColor";
import { theme } from "@/src/lib/colors";
import { showHaptics } from "@/src/lib/haptics";
import { useAppStore } from "@/src/store";
import { IFilters, defaultFilters } from "@/src/store/slices/home-data-slice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";
import { ThemedButton, ThemedText } from "../themed";
import { textStyles } from "../themed/text";
import { renderBackdrop, renderFooter } from "../ui/bottom-sheet";
import { ImageColors, ImageOrders, ImageTypes } from "@/src/lib/image-helpers";

interface Props {}

const HomeFilters = ({}: Props) => {
  const backgroundColor = useThemeColor({}, "background");
  const filters = useAppStore(useShallow((state) => state.filters));
  const setFilters = useAppStore(useShallow((state) => state.setFilters));
  const [tempFilters, setTempFilters] = useState(filters);

  function onPress(val: string, keyName: keyof IFilters, index: number) {
    setTempFilters((currentFilters) => {
      let newValue = val;
      // //remove if already present
      if (currentFilters[keyName] === newValue) newValue = "";
      const temp = { ...currentFilters, [keyName]: newValue };
      return temp;
    });
  }
    
  function onApplyBtn() {
    setFilters(tempFilters);
    handleDismissModalPress();
  }
  function onResetBtn() {
    setFilters(defaultFilters);
    setTempFilters(defaultFilters);
    handleDismissModalPress();
  }

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    showHaptics("impactAsync");
  }, []);

  // callbacks
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    showHaptics("impactAsync");
  }, []);

//   const handleSheetChanges = useCallback((index: number) => {
//     console.log("handleSheetChanges", index);
//   }, []);

  return (
    <>
      <TouchableOpacity onPress={handlePresentModalPress}>
        <MaterialCommunityIcons
          name="filter-variant"
          size={24}
          color={theme.onPrimary}
        />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={2}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        footerComponent={(props) => {
          return (
            <BottomSheetFooter {...props} bottomInset={0}>
              <BottomSheetView style={[styles.footer, { backgroundColor }]}>
                <ThemedButton
                  type="text"
                  textType="defaultSemiBold"
                  style={styles.btn}
                  onPress={onResetBtn}
                >
                  Reset
                </ThemedButton>
                <ThemedButton
                  textType="defaultSemiBold"
                  style={styles.btn}
                  onPress={onApplyBtn}
                >
                  Apply
                </ThemedButton>
              </BottomSheetView>
            </BottomSheetFooter>
          );
        }}
      >
        <BottomSheetView style={[styles.contentContainer, { backgroundColor }]}>
          <ThemedText
            type="subtitle"
            style={{ textAlign: "center", marginTop: 10 }}
          >
            Choose filters 🎉
          </ThemedText>
          <RenderSection
            title="Type"
            keyName="image_type"
            data={ImageTypes}
            onPress={onPress}
            activeValue={tempFilters["image_type"]}
          />
          <RenderSection
            title="Color"
            keyName="colors"
            data={ImageColors}
            onPress={onPress}
            activeValue={tempFilters["colors"]}
          />
          <RenderSection
            title="Editors Choice"
            keyName="editors_choice"
            data={["true", "false"]}
            onPress={onPress}
            activeValue={tempFilters["editors_choice"]}
          />
          <RenderSection
            title="Sort"
            keyName="order"
            data={ImageOrders}
            onPress={onPress}
            activeValue={tempFilters["order"]}
          />
          <RenderSection
            title="Safe search"
            keyName="safesearch"
            data={["true", "false"]}
            onPress={onPress}
            activeValue={tempFilters["safesearch"]}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

interface RenderSectionProps {
  title: string;
  keyName: keyof IFilters;
  data: string[];
  activeValue: string;
  onPress:
    | ((item: string, keyName: keyof IFilters, index: number) => void)
    | undefined;
}
const RenderSection = ({
  title,
  keyName,
  data,
  activeValue,
  onPress,
}: RenderSectionProps) => {
  return (
    <BottomSheetView style={styles.sectionContainer}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        {title}:
      </ThemedText>
      <BottomSheetView style={styles.sectionRow}>
        {data?.map((item, index) => {
          return (
            <FilterChip
              item={item}
              index={index}
              isActive={activeValue === item}
              onPress={(item, index) => onPress?.(item, keyName, index)}
              key={item?.toString()}
            />
          );
        })}
      </BottomSheetView>
    </BottomSheetView>
  );
};

interface FilterChipProps {
  item: string;
  index: number;
  isActive?: boolean;
  onPress?: ((item: string, index: number) => void) | undefined;
}

const FilterChip = ({ item, index, isActive, onPress }: FilterChipProps) => {
  const backgroundColor = isActive ? theme.card : theme.background;
  const color = isActive ? theme.text : theme.icon;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.listItemContainer, { backgroundColor }]}
      onPress={() => onPress?.(item, index)}
    >
      <ThemedText style={[textStyles.caption, styles.listItemText, { color }]}>
        {item}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default HomeFilters;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },

  listItemContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  listItemText: {
    fontSize: 14,
    lineHeight: 20,
  },

  sectionContainer: {
    gap: 6,
    padding: 16,
  },

  sectionRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    paddingLeft: 10,
  },

  sectionTitle: {
    fontSize: 16,
    lineHeight: 20,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  btn: {
    width: "50%",
    paddingVertical: 0,
    borderRadius: 4,
  },
});
