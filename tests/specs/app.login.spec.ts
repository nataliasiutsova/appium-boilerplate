import TabBar from "../screenobjects/components/TabBar";
import LoginScreen from "../screenobjects/LoginScreen";
import NativeAlert from "../screenobjects/components/NativeAlert";

describe("WebdriverIO and Appium, when interacting with a login form,", () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openLogin();
        await LoginScreen.waitForIsShown(true);
    });

    it("should be able login successfully", async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnLoginContainerButton();
        // Submit the data
        await LoginScreen.submitLoginForm({
            username: "test@webdriver.io",
            password: "Test1234!",
        });
        // Wait for the alert and validate it
        await LoginScreen.waitForIsShown();
        await expect(await NativeAlert.text()).toEqual(
            "Success\nYou are logged in!"
        );

        // Close the alert
        await NativeAlert.topOnButtonWithText("OK");
        await NativeAlert.waitForIsShown(false);
    });

    it("should not be able login with invalid email adress", async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnLoginContainerButton();
        // Submit the data
        await LoginScreen.submitLoginForm({
            username: "test@webdriver",
            password: "Test1234!",
        });

        const tip1 = await $(
            '//android.widget.ScrollView[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[1]'
        );

        await expect(tip1).toBeDisplayed();
        await expect(tip1).toHaveText("Please enter a valid email address");
    });

    it("should not be able login with a password of less than 8 characters", async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnLoginContainerButton();
        // Submit the data
        await LoginScreen.submitLoginForm({
            username: "test@webdriver.io",
            password: "Test",
        });

        const tip2 = await $(
            '//android.widget.ScrollView[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[2]'
        );
        await expect(tip2).toBeDisplayed();
        await expect(tip2).toHaveText("Please enter at least 8 characters");
    });

    it("should be able sign up successfully", async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnSignUpContainerButton();
        // Submit the data
        await LoginScreen.submitSignUpForm({
            username: "test@webdriver.io",
            password: "Test1234!",
        });
        // Wait for the alert and validate it
        await NativeAlert.waitForIsShown();
        await expect(await NativeAlert.text()).toEqual(
            "Signed Up!\nYou successfully signed up!"
        );

        // Close the alert
        await NativeAlert.topOnButtonWithText("OK");
        await NativeAlert.waitForIsShown(false);
    });

    it("should not be able sign up without password confirmation", async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnSignUpContainerButton();
        // Submit the data

        // await LoginScreen.submitSignUpForm({ username: 'test@webdriver.io', password: 'Test1234!' });
        await $("~input-email").setValue("test@webdriver.io");
        await $("~input-password").setValue("Teast1234!");
        await $("~button-SIGN UP").click();

        const tip3 = await $(
            '//android.widget.ScrollView[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[3]'
        );
        await expect(tip3).toBeDisplayed();
        await expect(tip3).toHaveText("Please enter the same password");
    });
});
