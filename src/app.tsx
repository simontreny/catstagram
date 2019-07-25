import React, { useState, useEffect } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { authService } from "./authService";
import { BreedListScreen } from "./breedListScreen";
import { CatListScreen } from "./catListScreen";
import { GalleryScreen } from "./galleryScreen";
import { LoginScreen } from "./loginScreen";
import { useChangingValue } from "./hooks";

const AppNavigator = createAppContainer(
	createStackNavigator(
		{
			BreedList: { screen: BreedListScreen },
			CatList: { screen: CatListScreen },
			Gallery: { screen: GalleryScreen },
		},
		{
			defaultNavigationOptions: {
				headerTintColor: "white",
				headerStyle: { backgroundColor: "#12afcb", borderBottomWidth: 0 },
			},
		}
	)
);

const App = () => {
	const loggedIn = useChangingValue(authService.isLoggedIn, authService.onLoggedInChanged);
	return loggedIn ? <AppNavigator /> : <LoginScreen />;
};

const AppController = () => {
	const [initialized, setInitialized] = useState(false);
	useEffect(() => {
		authService.init().then(() => setInitialized(true));
	});
	return initialized ? <App /> : null;
};

export default AppController;
