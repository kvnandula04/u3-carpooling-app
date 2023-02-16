import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import ArrivedPage from "./pages/ArrivedPage";
import LiveTripPage from "./pages/LiveTripPage";
import FriendsPage from "./pages/FriendsPage";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <LiveTripPage /> */}
            {/* <ArrivedPage /> */}
            <FriendsPage />

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
