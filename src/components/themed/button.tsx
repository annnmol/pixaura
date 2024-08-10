import { forwardRef } from 'react';
import { StyleSheet, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';

// Define the button's props type, extending TouchableOpacityProps for React Native
interface ButtonProps extends TouchableOpacityProps {
  type?: 'primary' | 'outline' | 'text' | 'grey' | 'danger';
  children: React.ReactNode;
  textProps?: TextProps; // Add this line
}

// Define the Button component with forwardRef
export const ThemedButton = forwardRef<TouchableOpacity, ButtonProps>(
  ({ type = 'primary', children, style, textProps,...props }, ref) => {
    const buttonStyle = [styles[type] || styles.primary, style];
    const textStyle = [
      styles.buttonText,
      type === 'outline' && styles.buttonTextOutline,
      type === 'text' && styles.buttonTextText,
    ];

    return (
      <TouchableOpacity ref={ref} style={buttonStyle} {...props}>
        <Text style={textStyle} {...textProps}>{children}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
    primary: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      borderWidth: 1,
      borderRadius: 5,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: '#007bff',
      borderWidth: 1,
      borderRadius: 5,
    },
    text: {
      backgroundColor: 'transparent',
    },
    grey: {
      backgroundColor: '#6c757d',
      borderColor: '#6c757d',
      borderWidth: 1,
      borderRadius: 5,
    },
    danger: {
      backgroundColor: '#dc3545',
      borderColor: '#dc3545',
      borderWidth: 1,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      padding: 10,
    },
    buttonTextOutline: {
      color: '#007bff',
    },
    buttonTextText: {
      color: '#007bff',
    },
  });