import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import LiveTripPage from "./pages/LiveTripPage";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LiveTripPage />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
