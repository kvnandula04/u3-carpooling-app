import { StyleSheet } from "react-native";
import Navigation from "./src/navigation/Navigation";
import MatchPage from "./src/pages/MatchPage";
import ProfilePage from "./src/pages/ProfilePage";
import ProfilePage2 from "./src/pages/ProfilePage2";

export default function App() {
    // return <Navigation />;
    // return <ProfilePage />;
    return <ProfilePage2 />;
    // return <MatchPage />;
}

const styles = StyleSheet.create({});
