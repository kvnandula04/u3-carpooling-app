import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import HomePage from "./pages/HomePage";

export default function App() {
    return (
        <SafeAreaView>
            <HomePage />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
