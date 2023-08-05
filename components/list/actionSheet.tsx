import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native-gesture-handler";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FarmDataType } from "./types";
import PhoneNumberInput from "./phoneNumberInput";
import { useFarms } from "@/context/list";
import { useAuth } from "@/context/auth";
import { LoadingSpinner } from "@/components/loadingSpinner";

const farmValidationSchema = (list: FarmDataType[]) =>
    yup.object().shape({
        displayname: yup.string().required("Enter a display name!"),
        name: yup
            .string()
            .required("Enter a name!")
            .test({
                name: "isUnique",
                message: "Name must be unique!",
                test: (value: string) =>
                    !list.some((item) => item.name === value),
            }),
        phone: yup
            .string()
            .test(
                "minMaxNumDigits",
                "Enter a valid phone number!",
                function (value) {
                    if (!value) return false;
                    const numDigits = (value.match(/\d/g) || []).length;
                    return numDigits === 10;
                }
            ),
    });

const farmInitialValues = {
    displayname: "",
    name: "",
    phone: "",
};

export default function ActionSheet() {
    const farmsContext = useFarms();
    const userContext = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>New Farm</Text>

            {/* Add a photo */}
            <View style={styles.addPhotoContainer}>
                <Text style={styles.addPhotoText}>Add a Photo</Text>
                <TouchableOpacity
                    style={styles.addPhotoButton}
                    activeOpacity={0.7}
                >
                    <FontAwesome name="camera" size={35} color="#808080" />
                </TouchableOpacity>
            </View>

            {/* Form */}
            {farmsContext && (
                <Formik
                    onSubmit={() => {}}
                    initialValues={farmInitialValues}
                    validationSchema={farmValidationSchema(farmsContext?.farms)}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        resetForm,
                    }) => (
                        <View style={styles.formContainer}>
                            {/* Error */}
                            <Text style={styles.error}>{error}</Text>

                            {/* Display Name */}
                            <TextInput
                                placeholder="Display Name*"
                                value={values.displayname}
                                onChangeText={handleChange("displayname")}
                                onBlur={handleBlur("displayname")}
                                style={[styles.input]}
                            />
                            <Text style={styles.error}>
                                {touched.displayname && errors.displayname}
                            </Text>

                            {/* Name */}
                            <TextInput
                                placeholder="Name*"
                                value={values.name}
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
                                style={[styles.input]}
                            />
                            <Text style={styles.error}>
                                {touched.name && errors.name}
                            </Text>

                            {/* Phone */}
                            <PhoneNumberInput
                                keyboardType="number-pad"
                                placeholder="Phone"
                                onChangeText={handleChange("phone")}
                                onBlur={handleBlur("phone")}
                                style={[styles.input]}
                            />
                            <Text style={styles.error}>
                                {touched.phone && errors.phone}
                            </Text>

                            {/* Add Farm */}
                            <TouchableOpacity
                                style={[
                                    styles.CTAButton,
                                    Boolean(loading || !userContext?.user)
                                        ? { opacity: 0.5 }
                                        : null,
                                ]}
                                onPress={() => handleSubmit()}
                                disabled={Boolean(
                                    loading || !userContext?.user
                                )}
                            >
                                {loading ? (
                                    <LoadingSpinner color="#F7F5F0" />
                                ) : (
                                    <Text style={styles.CTAButtonText}>
                                        Add Farm
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginVertical: 15,
        width: "100%",
        display: "flex",
        paddingBottom: 150,
    },
    title: {
        width: "100%",
        fontFamily: "AveriaBold",
        fontSize: 36,
        lineHeight: 50.5,
        letterSpacing: -1.8,
        marginBottom: 20,
    },
    addPhotoContainer: {
        width: "100%",
    },
    addPhotoText: {
        fontFamily: "LatoItalic",
        fontSize: 18,
        color: "#808080",
        marginBottom: 19,
    },
    addPhotoButton: {
        width: 100,
        height: 100,
        borderRadius: 15,
        backgroundColor: "#DFDFDF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        width: "100%",
    },
    error: {
        height: 22,
        fontSize: 12,
        paddingTop: 3,
        paddingLeft: 15,
        fontFamily: "LatoRegular",
        color: "red",
    },
    input: {
        backgroundColor: "#DFDFDF",
        padding: 15,
        height: 50,
        borderRadius: 15,
        overflow: "hidden",
    },
    CTAButton: {
        backgroundColor: "#3A5C42",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 15,
        marginBottom: 22,
    },
    CTAButtonText: {
        fontSize: 18,
        color: "#F7F5F0",
        fontFamily: "LatoRegular",
    },
});
