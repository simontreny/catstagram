import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Image, Text } from "react-native";
import { Breed } from "./domain";
import { fetchBreeds, fetchBreedPictureUrl } from "./api";
import { TouchableHighlight } from "react-native-gesture-handler";
import { withNavigation, NavigationScreenProp } from "react-navigation";

export const BreedListScreen = () => {
	const [breeds, setBreeds] = useState<Breed[]>([]);
	useEffect(() => {
		fetchBreeds().then(setBreeds);
	}, []);

	return (
		<FlatList<Breed>
			data={breeds}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
			keyExtractor={item => item.id}
			renderItem={({ item }) => <BreedCell breed={item} />}
		/>
	);
};

BreedListScreen.navigationOptions = {
	title: "Breeds",
};

const BreedCell = withNavigation(({ navigation, breed }: { navigation: NavigationScreenProp<any>; breed: Breed }) => {
	const [pictureUrl, setPictureUrl] = useState<string>();
	useEffect(() => {
		fetchBreedPictureUrl(breed.id).then(setPictureUrl);
	}, []);

	return (
		<TouchableHighlight activeOpacity={0.95} onPress={() => navigation.push("CatList", { breed })}>
			<View style={styles.cell}>
				<Image style={styles.thumbnail} source={{ uri: pictureUrl }}></Image>
				<Text style={styles.name}>{breed.name}</Text>
			</View>
		</TouchableHighlight>
	);
});

const styles = StyleSheet.create({
	cell: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 12,
		backgroundColor: "white",
	},
	thumbnail: {
		width: 44,
		height: 44,
		borderRadius: 6,
		marginRight: 12,
		backgroundColor: "#dddddd",
	},
	name: {
		flex: 1,
	},
	separator: {
		marginHorizontal: 20,
		height: 1,
		backgroundColor: "#efefef",
	},
});
