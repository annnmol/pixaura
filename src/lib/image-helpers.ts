export const ImageTypes = ["all", "photo", "illustration", "vector"];

export const ImageCategories = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];

export const ImageColors = [
  "grayscale",
  "transparent",
  "red",
  "orange",
  "yellow",
  "green",
  "turquoise",
  "blue",
  "lilac",
  "pink",
  "white",
  "gray",
  "black",
  "brown",
];

export const ImageOrders = ["popular", "latest"];


const IMAGE_HEIGHTS = {
    "9:16": 320,  // Height for portrait images
    "16:9": 200,  // Height for landscape images
    "1:1": 300,   // Square images
    "4:3": 280,   // Standard aspect ratio
    "3:4": 350,   // Taller portrait images
  };

export function getImageHeight(imageWidth: number, imageHeight: number): number {
//   const aspectRatio = `${Math.round(imageWidth / 100)}:${Math.round(
//     imageHeight / 100
//   )}`;

//   switch (aspectRatio) {
//     case "9:16":
//       return IMAGE_HEIGHTS["9:16"];
//     case "16:9":
//       return IMAGE_HEIGHTS["16:9"];
//     case "1:1":
//       return IMAGE_HEIGHTS["1:1"];
//     case "4:3":
//       return IMAGE_HEIGHTS["4:3"];
//     case "3:4":
//       return IMAGE_HEIGHTS["3:4"];
//     default:
//       return 300; // Default height if aspect ratio doesn't match any predefined ratio
    //   }
    
    const aspectRatio = imageWidth / imageHeight;

    // Map aspect ratios to static heights
    if (aspectRatio > 0.55 && aspectRatio < 0.6) {
      return IMAGE_HEIGHTS["9:16"];
    } else if (aspectRatio > 1.7 && aspectRatio < 1.8) {
      return IMAGE_HEIGHTS["16:9"];
    } else if (aspectRatio > 0.95 && aspectRatio < 1.05) {
      return IMAGE_HEIGHTS["1:1"];
    } else if (aspectRatio > 1.3 && aspectRatio < 1.35) {
      return IMAGE_HEIGHTS["4:3"];
    } else if (aspectRatio > 0.7 && aspectRatio < 0.75) {
      return IMAGE_HEIGHTS["3:4"];
    } else {
      return 300; // Default height for images that don't match predefined ratios
    }
}
