import * as Haptics from "expo-haptics";

// export function showHaptics(
//   type: "notificationAsync" | "impactAsync" = "impactAsync"
// ) {
//   if (type === "notificationAsync") {
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     return;
//   }

//   return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// }
export const showHaptics = (
  type: "notificationAsync" | "impactAsync" = "impactAsync"
) => {
  switch (type) {
    case "notificationAsync":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case "impactAsync":
    default:
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};
