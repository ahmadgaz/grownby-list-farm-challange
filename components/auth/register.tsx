import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/firebase.config";
import { Formik } from "formik";
import * as yup from "yup";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LoadingSpinner } from "../loadingSpinner";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { RegisterType } from "./types";
import { addDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from "@/context/auth";

const registerValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Enter an email!"),
    password: yup
        .string()
        .required("Enter a password!")
        .min(8, "Password must be 8 characters long!")
        .matches(/[0-9]/, "Password requires a number!")
        .matches(/[a-z]/, "Password requires a lowercase letter!")
        .matches(/[A-Z]/, "Password requires an uppercase letter!")
        .matches(/[^\w]/, "Password requires a symbol!"),
    confirmPassword: yup
        .string()
        .required("Confirm your password!")
        .oneOf([yup.ref("password"), ""], 'Must match "Password" field value'),
});

const registerInitialValues = {
    email: "",
    password: "",
    confirmPassword: "",
};

export default function Register() {
    const userContext = useAuth();

    const [showPass, setShowPass] = useState<boolean>(false);
    const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const auth = FIREBASE_AUTH;

    const register = async (values: RegisterType, onSubmitProps: any) => {
        setLoading(true);
        setError("");
        try {
            await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            const res = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            await setDoc(doc(FIRESTORE_DB, "users", res.user.uid), {
                email: values.email,
                password: values.password,
                timeStamp: serverTimestamp(),
                farms: [],
            });
        } catch (err) {
            console.log(err);
            setError("Check email!");
            setLoading(false);
        } finally {
            onSubmitProps.resetForm();
            setLoading(false);
        }
    };

    return (
        <Formik
            onSubmit={register}
            initialValues={registerInitialValues}
            validationSchema={registerValidationSchema}
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

                    {/* Confirm Password */}
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            placeholder="Confirm Password*"
                            value={values.confirmPassword}
                            onChangeText={handleChange("confirmPassword")}
                            onBlur={handleBlur("confirmPassword")}
                            style={[styles.passwordInput]}
                            secureTextEntry={!showConfirmPass}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={() => {
                                setShowConfirmPass(!showConfirmPass);
                            }}
                            style={styles.passwordHide}
                        >
                            <FontAwesome name="eye" size={20} color="#808080" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.error}>
                        {touched.confirmPassword && errors.confirmPassword}
                    </Text>

                    {/* Register */}
                    <TouchableOpacity
                        style={[
                            styles.CTAButton,
                            Boolean(loading || userContext?.user)
                                ? { opacity: 0.5 }
                                : null,
                        ]}
                        onPress={() => handleSubmit()}
                        disabled={Boolean(loading || userContext?.user)}
                    >
                        {loading ? (
                            <LoadingSpinner color="#F7F5F0" />
                        ) : (
                            <Text style={styles.CTAButtonText}>Register</Text>
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
