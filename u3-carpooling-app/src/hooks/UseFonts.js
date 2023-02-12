import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    atkinson: require("../../assets/fonts/AtkinsonHyperlegible-Bold.ttf"),
    syne: require("../../assets/fonts/Syne-ExtraBold.ttf"),
  });
};
