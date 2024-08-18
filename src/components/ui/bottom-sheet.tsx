import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { memo, useCallback } from "react";
import { ThemedText } from "../themed";

// renders
export const renderBackdrop = memo((props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0.8}
  />
));

// renders
export const renderFooter = memo((props:BottomSheetFooterProps) => (
  <BottomSheetFooter {...props} bottomInset={24}>
      <ThemedText >Footer</ThemedText>
  </BottomSheetFooter>
));
