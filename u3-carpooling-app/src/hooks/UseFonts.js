import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    atkinson: require("../../assets/fonts/AtkinsonHyperlegible-Bold.ttf"),
    "atkinson-regular": require("../../assets/fonts/AtkinsonHyperlegible-Regular.ttf"),
    "atkinson-italic": require("../../assets/fonts/AtkinsonHyperlegible-BoldItalic.ttf"),
    syne: require("../../assets/fonts/Syne-ExtraBold.ttf"),
    "syne-bold": require("../../assets/fonts/Syne-Bold.ttf"),
  });
};
