import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Cat } from "./domain";

type GalleryScreenProps = NavigationScreenProps<{ cat: Cat }>;

export const GalleryScreen = (props: GalleryScreenProps) => {
	return (
		<View testID="galleryScreen" style={styles.container}>
			<Image style={styles.picture} source={{ uri: props.navigation.getParam("cat").url }} />
		</View>
	);
};

GalleryScreen.navigationOptions = () => ({
	title: "Gallery",
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	picture: {
		flex: 1,
		resizeMode: "contain",
	},
});
