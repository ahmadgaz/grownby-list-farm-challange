import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { FIREBASE_AUTH } from "@/firebase.config";
import { Formik } from "formik";
import * as yup from "yup";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LoadingSpinner } from "../loadingSpinner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginType } from "./types";
import { useAuth } from "@/context/auth";

const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Enter an email!"),
    password: yup
        .string()
        .required("Enter a password!")
        .min(8, "Password must be 8 characters long!")
        .matches(/[0-9]/, "Password requires a number!")
        .matches(/[a-z]/, "Password requires a lowercase letter!")
        .matches(/[A-Z]/, "Password requires an uppercase letter!")
        .matches(/[^\w]/, "Password requires a symbol!"),
});

const loginInitialValues = {
    email: "",
    password: "",
};

export default function Login() {
    const userContext = useAuth();

    const [showPass, setShowPass] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const auth = FIREBASE_AUTH;

    console.log(Boolean(loading || userContext?.user));

    const login = async (values: LoginType, onSubmitProps: any) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
        } catch (err) {
            console.log(err);
            setError("Check email and password!");
        } finally {
            onSubmitProps.resetForm();
            setLoading(false);
        }
    };

    return (
        <Formik
            onSubmit={login}
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
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
                <View>
                    {/* Error */}
                    <Text style={styles.error}>{error}</Text>

                    {/* Email */}
                    <TextInput
                        placeholder="Email*"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        style={[styles.emailInput]}
                    />
                    <Text style={styles.error}>
                        {touched.email && errors.email}
                    </Text>

                    {/* Password */}
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            placeholder="Password*"
                            value={values.password}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            style={[styles.passwordInput]}
                            secureTextEntry={!showPass}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={() => {
                                setShowPass(!showPass);
                            }}
                            style={styles.passwordHide}
                        >
                            <FontAwesome name="eye" size={20} color="#808080" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.error}>
                        {touched.password && errors.password}
                    </Text>

                    {/* Login */}
                    <TouchableOpacity
                        style={
                            Boolean(loading || userContext?.user)
                                ? { ...styles.CTAButton, opacity: 0.5 }
                                : styles.CTAButton
                        }
                        onPress={() => handleSubmit()}
                        disabled={Boolean(loading || userContext?.user)}
                    >
                        {loading ? (
                            <LoadingSpinner color="#F7F5F0" />
                        ) : (
                            <Text style={styles.CTAButtonText}>Login</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
}
const styles = StyleSheet.create({
    error: {
        height: 22,
        fontSize: 12,
        paddingTop: 3,
        paddingLeft: 15,
        fontFamily: "LatoRegular",
        color: "red",
    },
    emailInput: {
        backgroundColor: "#DFDFDF",
        padding: 15,
        height: 50,
        borderRadius: 15,
        overflow: "hidden",
    },
    passwordInputContainer: {
        position: "relative",
        width: "100%",
        height: 50,
        borderRadius: 15,
        backgroundColor: "#DFDFDF",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    passwordInput: {
        padding: 15,
        flex: 1,
        borderRadius: 15,
        overflow: "hidden",
    },
    passwordHide: {
        display: "flex",
        justifyContent: "center",
        marginRight: 15,
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
