import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import uuid from "react-native-uuid";
import { FontAwesome } from "@expo/vector-icons";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import { FarmDataType } from "./types";
import PhoneNumberInput from "./phoneNumberInput";
import { useFarms } from "@/context/list";
import { useAuth } from "@/context/auth";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { FIREBASE_STORAGE } from "@/firebase.config";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { doc, setDoc } from "firebase/firestore";

const farmValidationSchema = (list: FarmDataType[] | null) => {
    if (!list) return;
    return yup.object().shape({
        id: yup.string(),
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
                    if (!value) return true;
                    const numDigits = (value.match(/\d/g) || []).length;
                    return numDigits === 10;
                }
            ),
        hours: yup.string(),
    });
};

const farmInitialValues = (id: string) => ({
    id,
    displayname: "",
    name: "",
    phone: "",
    hours: "",
});

export default function AddFarm({
    loading,
    setLoading,
    setIsOpenSheet,
}: {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const farmsContext = useFarms();
    const userContext = useAuth();
    const uniqueId = uuid.v4().toString();
    const isSubmitted = useRef<boolean>(false);

    // Image file
    const [file, setFile] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const filenameInStorage = useRef<string>("");

    // On mount and unmount of component, set file to empty string
    useEffect(() => {
        setFile("");
        setUrl("");
        isSubmitted.current = false;
        filenameInStorage.current = "";
        return () => {
            !isSubmitted.current && deleteImage();
            setFile("");
            setUrl("");
            isSubmitted.current = false;
            filenameInStorage.current = "";
        };
    }, []);
    const [error, setError] = useState<string>("");

    // Get image from camera roll
    const pickImage = async () => {
        setLoading(true);
        setError("");
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (result.canceled) {
                return;
            }
            const source = result.assets[0].uri;
            setFile(source);
        } catch (err) {
            console.log(err);
            setError("There has been an error.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // Get image from camera roll
    const uploadImage = async () => {
        setLoading(true);
        setError("");
        try {
            if (!file) return;

            // Get blob from file and set the unique file name for storage
            const response = await fetch(file);
            const blob = await response.blob();
            filenameInStorage.current =
                new Date().getTime() +
                "-" +
                file.substring(file.lastIndexOf("/") + 1);

            const storageRef = ref(FIREBASE_STORAGE, filenameInStorage.current);
            const uploadTask = await uploadBytesResumable(storageRef, blob);
            uploadTask.task.on(
                "state_changed",
                (snapshot) => {
                    console.log(snapshot);
                },
                (error) => {
                    console.log(error);
                    setError("There has been an error.");
                },
                () => {
                    getDownloadURL(uploadTask.task.snapshot.ref).then(
                        (downloadURL) => {
                            console.log("File available at", downloadURL);
                            setUrl(downloadURL);
                        }
                    );
                }
            );
        } catch (err) {
            console.log(err);
            setError("There has been an error.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // Delete image from firebase storage
    const deleteImage = async () => {
        setLoading(true);
        setError("");
        try {
            if (!filenameInStorage.current) return;

            const storageRef = ref(FIREBASE_STORAGE, filenameInStorage.current);
            await deleteObject(storageRef);
        } catch (err) {
            console.log(err);
            setError("There has been an error.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("file changed", Boolean(file), Boolean(url));
        // Whenever there is a new file, upload it to firebase storage
        // and set the image url to the file's download url  (if there is one)
        file && uploadImage();
        // Whenever there is a new url, delete the old image from firebase storage
        // and set the image url to the file's download url (if there is one)
        file && url && deleteImage();
    }, [file]);

    const handleSubmit = (values: FarmDataType, onSubmitProps: any) => {
        farmsContext?.setFarms((prev: FarmDataType[] | null) => {
            if (!prev) return [{ ...values, image: url }];
            return [...prev, { ...values, image: url }];
        });
        isSubmitted.current = true;
        setIsOpenSheet(false);
        onSubmitProps.resetForm();
    };
    console.log(url);
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>New Farm</Text>

            {/* Add a photo */}
            <View style={styles.addPhotoContainer}>
                <Text style={styles.addPhotoText}>Add a Photo</Text>
                <View style={{ width: 100, height: 100 }}>
                    <TouchableOpacity
                        style={[
                            styles.addPhotoButton,
                            Boolean(loading || !userContext?.user)
                                ? { opacity: 0.5 }
                                : null,
                        ]}
                        disabled={Boolean(loading || !userContext?.user)}
                        activeOpacity={0.7}
                        onPress={pickImage}
                    >
                        {file ? (
                            <Image
                                source={{ uri: file }}
                                style={{ width: "100%", height: "100%" }}
                            />
                        ) : loading ? (
                            <LoadingSpinner color={"#808080"} />
                        ) : (
                            <FontAwesome
                                name="camera"
                                size={35}
                                color="#808080"
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Form */}
            {farmsContext && (
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={farmInitialValues(uniqueId)}
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

                            {/* Hours */}
                            <TextInput
                                placeholder="Hours"
                                value={values.hours}
                                onChangeText={handleChange("hours")}
                                onBlur={handleBlur("hours")}
                                style={[styles.input]}
                            />
                            <Text style={styles.error}>
                                {touched.hours && errors.hours}
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
        overflow: "hidden",
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
