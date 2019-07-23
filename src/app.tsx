import { createAppContainer, createStackNavigator } from "react-navigation";
import { BreedListScreen } from "./breedListScreen";
import { CatListScreen } from "./catListScreen";

const AppNavigator = createStackNavigator({
	BreedList: { screen: BreedListScreen },
	CatList: { screen: CatListScreen },
});

export default createAppContainer(AppNavigator);
