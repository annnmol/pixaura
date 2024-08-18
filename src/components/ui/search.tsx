import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native";

//custom imports
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { debounce } from "@/src/lib/helpers";

const DEBOUCE_TIME = 1000;

interface SearchProps {
  onSearch: (query: string) => void;
  debounceTime?: number;
  inputProps?: TextInput["props"];
  viewStyles?: ViewStyle;
}

export interface SearchComponentRef {
  clearSearch: () => void;
  focusSearch: () => void;
  blurSearch: () => void;
}

function Search(props: SearchProps, ref: ForwardedRef<SearchComponentRef>) {
  const color = useThemeColor({}, "text");
  const queryRef = useRef<TextInput>(null);
  const closeBtnRef = useRef<TouchableOpacity>(null); // Ref for the close button

  // Create a debounced version of the fetch function
  const debouncedQuery = useCallback(
    debounce((q: string) => props.onSearch(q), DEBOUCE_TIME),
    []
  );

  function onChangeText(q: string) {
    debouncedQuery(q);
    if (!closeBtnRef.current) return;
    // Show Hide close button
    let display = q.length > 0 ? "flex" : "none";
    closeBtnRef.current.setNativeProps({
      style: { display: display },
    });
  }

  function clearSearch() {
    if (!queryRef.current) return;
    queryRef.current.clear();
    debouncedQuery("");

    // Hide close button
    if (!closeBtnRef.current) return;
    closeBtnRef.current.setNativeProps({ style: { display: "none" } });
  }

  function focusSearch() {
    if (!queryRef.current) return;
    queryRef.current.focus();
  }

  function blurSearch() {
    if (!queryRef.current) return;
    queryRef.current.blur();
  }

  // Expose clearSearch to the parent component
  useImperativeHandle(ref, () => ({
    clearSearch,
    focusSearch,
    blurSearch,
  }));

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      debouncedQuery.cancel();
    };
  }, [debouncedQuery]);

  return (
    <View style={[styles.searchBarContainer,props.viewStyles]}>
      <View style={styles.searchIcon}>
        <Ionicons name="search" size={24} color={"grey"} />
      </View>
      <TextInput
        keyboardType="web-search"
        enterKeyHint="search"
        clearButtonMode="always"
        placeholder="Search for images"
        ref={queryRef}
        onChangeText={onChangeText}
        style={[styles.input, { color: color }]}
        placeholderTextColor={"grey"}
        {...props?.inputProps}
      />
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={clearSearch}
        ref={closeBtnRef}
      >
        <Ionicons name="close" size={24} color={"grey"} />
      </TouchableOpacity>
    </View>
  );
}

export default forwardRef(Search);

const styles = StyleSheet.create({
  searchBarContainer: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  closeIcon: {
    marginRight: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    display: "none",
  },
  searchIcon: {
    borderRightColor: "grey",
    borderRightWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});
