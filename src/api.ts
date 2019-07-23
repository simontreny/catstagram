import { Breed, Cat } from "./domain";

const API_BASE = "https://api.thecatapi.com/v1";
const API_KEY = "9a6d0b1c-98fa-4e6a-bf06-7462af86472c";

export async function api<T>(endPoint: string): Promise<T> {
	const response = await fetch(`${API_BASE}${endPoint}`, { headers: { ["x-api-key"]: API_KEY } });
	if (response.ok) {
		return await response.json();
	} else {
		throw Error(`HTTP error ${response.status}`);
	}
}

export function fetchBreeds(): Promise<Breed[]> {
	return api<Breed[]>("/breeds");
}

export async function fetchBreedPictureUrl(breedId: string): Promise<string> {
	const cat = (await fetchCatsWithBreed(breedId, 1))[0];
	return cat.url;
}

export function fetchCatsWithBreed(breedId: string, limit = 30): Promise<Cat[]> {
	return api<Cat[]>(`/images/search/?breed_ids=${breedId}&limit=${limit}&order=DESC`);
}
