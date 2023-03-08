import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useMemo,
} from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, StyleSheet, Pressable } from "react-native";
import useFonts from "../hooks/UseFonts";
import Logo from "../components/Logo";
import GridBackground from "../../assets/grid-background";
import LiveMap from "../components/LiveMap";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import PlanTrip from "../components/PlanTrip";

export default function HomePage() {
    const [IsReady, SetIsReady] = useState(false);
    const bottomSheetRef = useRef(BottomSheet);
    const snapPoints = useMemo(() => ["90%", "10%"], []);
    const navigation = useNavigation();

    useEffect(() => {
        async function prepare() {
            try {
                await useFonts();
            } catch (e) {
                console.warn(e);
            } finally {
                SetIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (IsReady) {
            await SplashScreen.hideAsync();
        }
    }, [IsReady]);

    if (!IsReady) {
        return null;
    }

    return (
        <View style={styles.container}>
            <GridBackground
                position="absolute"
                zIndex={-5}
                lineColor={"black"}
                style={{ backgroundColor: "#f7f3eb" }}
            />

            <View style={styles.flex1}>
                <View id="empty" style={styles.flexInner1} />
                <View if="logo" style={styles.flexInner2}>
                    <Logo fontSize={64} color={"#000"} marginTop={"5%"} />
                </View>
                <View id="profile" style={styles.flexInner3}>
                    <Text style={styles.profileText}>Me.</Text>
                </View>
            </View>

            <View style={styles.flex2}>
                <View id="rideWithDrivenBy" style={styles.flexInner21}>
                    <View
                        id="rideWith"
                        style={{ flexDirection: "row", marginLeft: "3%" }}
                    >
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>3</Text>
                        </View>
                        <Text style={styles.text}>Ride with</Text>
                    </View>

                    <View
                        id="drivenBy"
                        style={{ flexDirection: "row", marginRight: "3%" }}
                    >
                        <Text style={styles.text}>Driven by</Text>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>1</Text>
                        </View>
                    </View>
                </View>

                <View id="map" style={styles.flexInner22}>
                    <LiveMap
                        cardStyle={styles.cardStyle}
                        shadowStyle={styles.shadowStyle}
                    />
                </View>
            </View>

            <PlanTrip />

            <View style={styles.flex4}></View>

            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                style={styles.bottomSheet}
                handleIndicatorStyle={styles.bottomSheetHandle}
            >
                <View id="tripHistoryCard" style={styles.tripHistoryCard}>
                    <View
                        id="tripHistoryTitleView"
                        style={styles.tripHistoryTitleView}
                    >
                        <Text style={styles.tripHistoryTitle}>My Pools</Text>
                    </View>
                    <View style={styles.tripHistoryTitleViewInner}>
                        <Text style={styles.tripHistoryTitleViewInnerHeading}>
                            Friday 9th December 2022
                        </Text>
                        <Text style={styles.tripHistoryTitleViewInnerBody}>
                            10:30 @ University of Bath
                        </Text>
                        <Text style={styles.tripHistoryTitleViewInnerBody}>
                            Picked up by Richard
                        </Text>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex1: {
        flex: 1.25,
        flexDirection: "row",
        // backgroundColor: "red",
    },
    flexInner1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        // backgroundColor: "blue",
    },
    flexInner2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green",
    },
    flexInner3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        // backgroundColor: "yellow",
    },
    flex2: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "purple",
    },
    flexInner21: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        // backgroundColor: "blue",
    },
    flexInner22: {
        flex: 6,
        width: "90%",
        marginTop: "-2%",
    },
    flex4: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        // backgroundColor: "pink",
    },
    profileText: {
        fontFamily: "atkinson-italic",
        fontSize: 34,
        marginTop: "15%",
        marginRight: "15%",
    },
    text: {
        fontFamily: "syne-bold",
        fontSize: 18,
        color: "#000",
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 1000,
        backgroundColor: "#3dd37a",
        justifyContent: "center",
        alignItems: "center",
    },
    circleText: {
        fontFamily: "atkinson-italic",
        fontSize: 18,
        color: "#000",
        textAlign: "center",
    },
    cardStyle: {
        width: "100%",
        height: "100%",
        borderColor: "#000",
        borderWidth: 5,
        borderRadius: 32,
        overflow: "hidden",
    },
    shadowStyle: {
        zIndex: -1,
        position: "absolute",
        top: 6,
        left: 6,
        backgroundColor: "#000",
        borderColor: "#000",
    },
    heading: {
        fontFamily: "atkinson-italic",
        fontSize: 54,
        color: "#f7f3eb",
        lineHeight: 53,
        shadowColor: "#000000",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        textAlign: "center",
    },
    tripHistoryCard: {
        width: "100%",
        height: "390%",
        marginTop: -15,
        backgroundColor: "#fff",
    },
    tripHistoryTitleView: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    tripHistoryTitle: {
        fontFamily: "syne",
        fontSize: 24,
        marginTop: "5%",
        color: "#1774ff",
    },
    tripHistoryTitleViewInner: {
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "5%",
    },
    tripHistoryTitleViewInnerHeading: {
        fontFamily: "atkinson-italic",
        fontSize: 22,
        color: "#000",
    },
    tripHistoryTitleViewInnerBody: {
        fontFamily: "atkinson-regular",
        fontSize: 20,
        color: "#000",
    },
    bottomSheet: {
        borderRadius: 32,
        borderColor: "#000",
        borderWidth: 5,
        overflow: "hidden",
    },
    bottomSheetHandle: {
        backgroundColor: "#000",
        width: 70,
        height: 5,
        borderRadius: 5,
    },
});
