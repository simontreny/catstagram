import React from "react";
import { Image, StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Cat } from "./domain";

type GalleryScreenProps = NavigationScreenProps<{ cat: Cat }>;

export const GalleryScreen = (props: GalleryScreenProps) => {
	return <Image style={styles.picture} source={{ uri: props.navigation.getParam("cat").url }} />;
};

GalleryScreen.navigationOptions = () => ({
	title: "Gallery",
});

const styles = StyleSheet.create({
	picture: {
		flex: 1,
		backgroundColor: "black",
		resizeMode: "contain",
	},
});
