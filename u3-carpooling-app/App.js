import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Arrived from "./pages/Arrived";
import LiveTripPage from "./pages/LiveTripPage";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <LiveTripPage /> */}
            <Arrived />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
