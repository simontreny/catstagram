import React, { useState } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationScreenProps } from "react-navigation";

export const LoginScreen = (props: NavigationScreenProps<{}>) => {
	const [username, setUserName] = useState("");

	const login = () => {
		if (username !== "Fly Flyerson") {
			Alert.alert("Error", "User not found");
			return;
		}
		props.navigation.replace("BreedList");
	};

	return (
		<>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
					<View style={styles.contentContainer}>
						<Image style={styles.logo} source={require("../assets/logo.png")} />
						<TextInput
							testID="username"
							style={styles.usernameTextInput}
							placeholder="Username"
							placeholderTextColor="#ffffffc0"
							value={username}
							onChangeText={setUserName}
						/>
						<TouchableOpacity testID="loginButton" style={styles.button} activeOpacity={0.8} onPress={() => login()}>
							<Text style={styles.buttonTitle}>Sign In</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
};

LoginScreen.navigationOptions = {
	header: null,
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#12afcb",
	},
	contentContainer: {
		flex: 1,
		marginHorizontal: 25,
		marginVertical: 20,
		justifyContent: "center",
	},
	logo: {
		alignSelf: "center",
		marginBottom: 60,
	},
	usernameTextInput: {
		marginBottom: 30,
		height: 40,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "white",
		textAlign: "center",
		fontWeight: "600",
		color: "white",
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		height: 40,
		borderRadius: 6,
		backgroundColor: "white",
	},
	buttonTitle: {
		fontWeight: "bold",
		fontSize: 16,
		color: "#12afcb",
	},
});
