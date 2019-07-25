import { device, element, expect, by } from "detox";

describe("Login screen", () => {
	beforeEach(async () => {
		await device.reloadReactNative();
		await device.setURLBlacklist([".*cdn2.thecatapi.com.*"]);
	});

	it("should not log-in if user doesn't exist", async () => {
		await element(by.id("username")).typeText("johndoe");
		await element(by.id("loginButton")).tap();
		await expect(element(by.text("Error"))).toBeVisible();
	});

	it("should show Breeds screen after log-in if user exists", async () => {
		await element(by.id("username")).typeText("betomorrow");
		await element(by.id("loginButton")).tap();
		await expect(element(by.id("breedListScreen"))).toBeVisible();
	});

	it("should still be logged in after reload", async () => {
		await expect(element(by.id("breedListScreen"))).toBeVisible();
	});

	it("should show at least 5 breeds", async () => {
		await expect(element(by.id("breedCell")).atIndex(4)).toExist();
	});

	it("should show Cats screen when tapping the Birman cell", async () => {
		await waitFor(element(by.text("Birman")))
			.toBeVisible()
			.whileElement(by.type("RCTScrollView"))
			.scroll(120, "down");
		await element(by.text("Birman")).tap();
		await expect(element(by.id("catListScreen"))).toBeVisible();
	});

	it("should have at least 3 American Bobtail pictures", async () => {
		await element(by.text("American Bobtail")).tap();
		await expect(element(by.id("catCell")).atIndex(2)).toExist();
	});

	it("should show Gallery screen when tapping a cat in Cats screen", async () => {
		await element(by.text("Abyssinian")).tap();
		await element(by.id("catCell"))
			.atIndex(0)
			.tap();
		await expect(element(by.id("galleryScreen"))).toBeVisible();
	});
});
