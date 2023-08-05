import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ViewToken,
    Pressable,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "@/firebase.config";
import { useAuth } from "@/context/auth";
import LoadingList from "../../list/loadingList";
import { sampleData } from "../../list/sampleData";
import { Item } from "../../list/item";
import Animated, {
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideOutDown,
    useAnimatedKeyboard,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { Link } from "expo-router";
import ActionSheet from "../../list/actionSheet";
import { useFarms } from "@/context/list";

const screenDimensions = Dimensions.get("screen");

export default function List() {
    const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const farmListContext = useFarms();
    const data = farmListContext?.farms;
    const setData = farmListContext?.setFarms;
    const userContext = useAuth();

    // List animation
    const viewableItems = useSharedValue<ViewToken[]>([]);
    const onViewableItemsChanged = ({
        viewableItems: vItems,
    }: {
        viewableItems: ViewToken[];
    }) => {
        viewableItems.value = vItems;
    };
    const viewabilityConfigCallbackPairs = useRef([
        {
            viewabilityConfig: { viewAreaCoveragePercentThreshold: 50 },
            onViewableItemsChanged,
        },
    ]);

    // Add button animation
    const rotationDegree = useSharedValue(0);
    useEffect(() => {
        if (isOpenSheet) {
            rotationDegree.value = withTiming(45, { duration: 500 });
        } else {
            rotationDegree.value = withTiming(0, { duration: 500 });
        }
    }, [isOpenSheet]);
    const plusAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: rotationDegree.value + "deg",
                },
            ],
        };
    });

    // Keyboard raises bottom sheet
    const keyboard = useAnimatedKeyboard();
    const translateStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -keyboard.height.value / 2.3 }],
        };
    });

    useEffect(() => {
        setLoading(true);
        setData && setData(sampleData);
        setLoading(false);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" translucent />

            {/* Farm list */}
            <SafeAreaView style={styles.safeViewContainer}>
                {/* Top bar */}
                <View style={styles.topBar}>
                    <View style={styles.topBarTextContainer}>
                        <Text style={styles.topBarTextGreeting}>
                            {userContext
                                ? `Welcome ${userContext.user?.email}!`
                                : "Sign in to view"}
                        </Text>
                        <Text style={styles.topBarTextLabel}>Your Farms</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            FIREBASE_AUTH.signOut();
                        }}
                    >
                        <FontAwesome
                            name="sign-out"
                            size={40}
                            color="#000000"
                        />
                    </TouchableOpacity>
                </View>

                {/* List */}
                {loading ? (
                    <LoadingList />
                ) : data?.length === 0 ? (
                    <View style={styles.noFarmsMessageContainer}>
                        <Text style={styles.noFarmsMessage}>
                            There are no farms!
                        </Text>
                        <Text style={styles.noFarmsCTA}>Add a new farm.</Text>
                    </View>
                ) : (
                    <View style={styles.listContainer}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <Item
                                    data={item}
                                    viewableItems={viewableItems}
                                />
                            )}
                            viewabilityConfigCallbackPairs={
                                viewabilityConfigCallbackPairs.current
                            }
                            showsVerticalScrollIndicator={false}
                            overScrollMode="never"
                            contentContainerStyle={{ paddingBottom: 111 }}
                        />
                    </View>
                )}
            </SafeAreaView>

            {/* Action sheet */}
            {isOpenSheet && (
                <>
                    <Animated.View
                        style={styles.backdropContainer}
                        entering={FadeIn}
                        exiting={FadeOut}
                    >
                        <Pressable
                            style={styles.backdrop}
                            onPress={() => {
                                setIsOpenSheet(false);
                            }}
                        />
                    </Animated.View>
                    <Animated.View
                        style={[styles.sheet, translateStyle]}
                        entering={SlideInDown.springify().damping(25)}
                        exiting={SlideOutDown.springify()
                            .damping(25)
                            .duration(200)}
                    >
                        <ActionSheet />
                    </Animated.View>
                </>
            )}

            {/* Add button */}
            <SafeAreaView style={styles.addButtonContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        setIsOpenSheet(!isOpenSheet);
                    }}
                    activeOpacity={0.8}
                >
                    <Animated.View style={plusAnimation}>
                        <FontAwesome name="plus" size={20} color="#ffffff" />
                    </Animated.View>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: screenDimensions.width,
        height: screenDimensions.height,
    },
    safeViewContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 36,
        marginVertical: 15,
        width: screenDimensions.width,
        display: "flex",
    },
    topBar: {
        width: "100%",
        height: 80,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    topBarTextContainer: {
        display: "flex",
        justifyContent: "center",
        height: "100%",
        maxWidth: "80%",
    },
    topBarTextGreeting: {
        fontFamily: "AveriaRegular",
        fontSize: 16,
    },
    topBarTextLabel: {
        fontFamily: "AveriaBold",
        fontSize: 36,
        letterSpacing: -1.8,
    },
    noFarmsMessageContainer: {
        flex: 1,
        marginTop: 55,
    },
    noFarmsMessage: {
        color: "#808080",
        fontFamily: "LatoLightItalic",
        fontSize: 32,
        textAlign: "center",
    },
    noFarmsCTA: {
        color: "#808080",
        fontFamily: "LatoBoldItalic",
        fontSize: 32,
        textAlign: "center",
    },
    listContainer: {
        width: "100%",
        flex: 1,
        paddingTop: 22,
        display: "flex",
        flexDirection: "row",
    },
    addButtonContainer: {
        position: "absolute",
        left: 0,
        zIndex: 3,
        width: "100%",
        display: "flex",
        alignItems: "center",
        bottom: 15,
    },
    addButton: {
        backgroundColor: "#3A5C42",
        height: 100,
        width: 100,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: { height: 10, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
    },
    sheet: {
        backgroundColor: "#F7F5F0",
        padding: 16,
        height: screenDimensions.height,
        width: "100%",
        position: "absolute",
        bottom: -150,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 2,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#0000005d",
    },
    backdropContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
});
