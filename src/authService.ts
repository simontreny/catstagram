import AsyncStorage from "@react-native-community/async-storage";
import { Signal } from "micro-signals";

class AuthService {
	private _loggedIn = false;

	readonly onLoggedInChanged = new Signal<boolean>();

	async init(): Promise<void> {
		this._loggedIn = (await AsyncStorage.getItem("logged-in")) === "true";
	}

	get isLoggedIn(): boolean {
		return this._loggedIn;
	}

	async login(username: string): Promise<void> {
		if (username !== "betomorrow") {
			throw Error("User not found");
		}

		this._loggedIn = true;
		AsyncStorage.setItem("logged-in", "true");
		this.onLoggedInChanged.dispatch(this._loggedIn);
	}
}

export const authService = new AuthService();
