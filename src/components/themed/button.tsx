import { useThemeColor } from "@/src/hooks/useThemeColor";
import { forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { textStyles } from "./text";

// Define the button's props type, extending TouchableOpacityProps for React Native
interface ButtonProps extends TouchableOpacityProps {
  type?: "primary" | "outline" | "text" | "grey" | "danger";
  textType?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "caption";
  children: React.ReactNode;
  textProps?: TextProps; // Add this line
}

// Define the Button component with forwardRef
export const ThemedButton = forwardRef<TouchableOpacity, ButtonProps>(
  ({ type = "primary",textType="default", children, style, textProps, ...props }, ref) => {
    const primary = useThemeColor({}, "primary");

    let dynamicStyle: any = {};
    if (type === "primary") {
      dynamicStyle = {
        backgroundColor: primary,
        borderColor: primary,
      };
    }
    if (type === "outline") {
      dynamicStyle = {
        borderColor: primary,
      };
    }

    const buttonStyle = [buttonStyles[type], dynamicStyle, style];
    const textStyle = [
      buttonStyles.buttonText,textStyles[textType],
      type === "outline" && buttonStyles.buttonTextOutline,
      type === "text" && buttonStyles.buttonTextText,
    ];

    return (
      <TouchableOpacity ref={ref} style={buttonStyle} activeOpacity={0.8} {...props}>
        <Text style={textStyle} {...textProps}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

export const buttonStyles = StyleSheet.create({
  primary: {
    // backgroundColor: '#007bff',
    // borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  outline: {
    // backgroundColor: 'transparent',
    // borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
  },
  grey: {
    backgroundColor: "#6c757d",
    borderColor: "#6c757d",
    borderWidth: 1,
    borderRadius: 5,
  },
  danger: {
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  buttonTextOutline: {
    color: "#007bff",
  },
  buttonTextText: {
    color: "#007bff",
  },
});
