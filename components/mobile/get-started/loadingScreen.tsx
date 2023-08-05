import { useEffect, useState } from "react";
import { Modal, Platform, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";

// This component is used to display a loading screen when the page is loading.
export default function LoadingScreen({
    isPageLoaded,
}: {
    isPageLoaded: boolean;
}) {
    // The loading modal should be visible if the page is not loaded.
    const isModalVisible = !isPageLoaded;

    // The initial layer prevents the stack from showing before assets have loaded during the modal fade-in transition.
    const [isInitialLayerVisible, setIsInitialLayerVisible] =
        useState<boolean>(true);

    // Show the initial layer for half a second.
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLayerVisible(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [isInitialLayerVisible, setIsInitialLayerVisible]);

    return [
        <Modal
            key={1}
            transparent
            visible={isModalVisible}
            animationType="fade"
        >
            <StatusBar style="light" translucent={false} />

            {/* Loading animation */}
            <View style={styles.loadingModal}>
                <LottieView
                    source={require("@/assets/animations/loading.json")}
                    loop={true}
                    autoPlay
                    style={styles.loadingIcon}
                />
            </View>
        </Modal>,
        isInitialLayerVisible ? (
            <View key={0} style={styles.loadingInitialLayer} />
        ) : null,
    ];
}

const styles = StyleSheet.create({
    loadingModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3A5C42",
    },
    loadingIcon: { width: 75, height: 75 },
    loadingInitialLayer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3A5C42",
    },
});
