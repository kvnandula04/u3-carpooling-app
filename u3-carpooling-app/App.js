import { StyleSheet } from "react-native";
import Navigation from "./src/navigation/Navigation";
import MatchPage from "./src/pages/MatchPage";
import ProfilePage from "./src/pages/ProfilePage";

export default function App() {
    // return <Navigation />;
    return <ProfilePage />;

    // return <MatchPage />;
}

const styles = StyleSheet.create({});
