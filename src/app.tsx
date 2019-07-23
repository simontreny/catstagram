import { createAppContainer, createStackNavigator } from "react-navigation";
import { BreedListScreen } from "./breedListScreen";
import { CatListScreen } from "./catListScreen";
import { LoginScreen } from "./loginScreen";
import { GalleryScreen } from "./galleryScreen";

const AppNavigator = createStackNavigator(
	{
		Login: { screen: LoginScreen },
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
);

export default createAppContainer(AppNavigator);
