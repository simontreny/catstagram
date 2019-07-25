import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { NavigationScreenProp, NavigationScreenProps, withNavigation } from "react-navigation";
import { fetchCatsWithBreed } from "./api";
import { Breed, Cat } from "./domain";

type CatListScreenProps = NavigationScreenProps<{ breed: Breed }>;

export const CatListScreen = (props: CatListScreenProps) => {
	const [cats, setCats] = useState<Cat[]>([]);
	useEffect(() => {
		fetchCatsWithBreed(props.navigation.getParam("breed").id).then(setCats);
	}, []);

	return (
		<View testID="catListScreen">
			<FlatList<Cat>
				numColumns={3}
				data={cats}
				keyExtractor={item => item.id}
				renderItem={({ item }) => <CatCell cat={item} />}
			/>
		</View>
	);
};

CatListScreen.navigationOptions = (props: CatListScreenProps) => ({
	title: props.navigation.getParam("breed").name,
});

const CatCell = withNavigation(({ navigation, cat }: { navigation: NavigationScreenProp<any>; cat: Cat }) => {
	return (
		<TouchableOpacity
			testID="catCell"
			style={styles.cell}
			activeOpacity={0.8}
			onPress={() => navigation.navigate("Gallery", { cat })}
		>
			<Image style={styles.picture} source={{ uri: cat.url }} />
		</TouchableOpacity>
	);
});

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
