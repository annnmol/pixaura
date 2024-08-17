import { View, ViewProps } from "react-native";
import { memo } from "react";

//custom imports

const ListItemSeparator = memo(({ ...viewProps }: ViewProps) => {
  return <View style={[{ height: 12 }, viewProps.style]} {...viewProps} />;
});

export default ListItemSeparator;
