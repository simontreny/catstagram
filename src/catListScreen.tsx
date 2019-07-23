import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { NavigationScreenProps } from "react-navigation";
import { fetchCatsWithBreed } from "./api";
import { Breed, Cat } from "./domain";

type CatListScreenProps = NavigationScreenProps<{ breed: Breed }>;

export const CatListScreen = (props: CatListScreenProps) => {
	const [cats, setCats] = useState<Cat[]>([]);
	useEffect(() => {
		fetchCatsWithBreed(props.navigation.getParam("breed").id).then(setCats);
	});

	return (
		<FlatList<Cat>
			numColumns={3}
			data={cats}
			keyExtractor={item => item.id}
			renderItem={({ item }) => <BreedCell cat={item} />}
		/>
	);
};

CatListScreen.navigationOptions = (props: CatListScreenProps) => ({
	title: props.navigation.getParam("breed").name,
});

const BreedCell = ({ cat }: { cat: Cat }) => {
	return (
		<View style={styles.cell}>
			<Image style={styles.picture} source={{ uri: cat.url }} />
		</View>
	);
};

const styles = StyleSheet.create({
	cell: {
		width: `${100 / 3}%`,
		aspectRatio: 1,
		padding: 1,
	},
	picture: {
		flex: 1,
		backgroundColor: "#dddddd",
	},
});
