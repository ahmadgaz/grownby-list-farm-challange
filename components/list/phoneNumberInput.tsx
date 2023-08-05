import { View, Text, TextInputProps, TextInputComponent } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const normalizeInput = (value: string, previousValue: string): string => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;

    if (cvLength < 4) return currentValue;
    if (cvLength < 7)
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    if (cvLength < 11) {
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
            3,
            6
        )}-${currentValue.slice(6, 10)}`;
    }
    return currentValue.replace(/[\s()-]/g, "");
};

interface PhoneInputProps extends Omit<TextInputProps, "onChangeText"> {
    onChangeText: (text: string) => void;
}

export default function PhoneNumberInput({
    onChangeText,
    ...props
}: PhoneInputProps) {
    const [phone, setPhone] = useState<string>("");
    return (
        <TextInput
            onChangeText={(text) => {
                setPhone((prev) => normalizeInput(text, prev));
                onChangeText(text);
            }}
            value={phone}
            {...props}
        />
    );
}
