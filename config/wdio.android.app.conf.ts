import { join } from "path";
import config from "./wdio.shared.local.appium.conf";

// ============
// Specs
// ============
config.specs = ["./tests/specs/app*.spec.ts"];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // The defaults you need to have in your config
        platformName: "Android",
        maxInstances: 1,
        // For W3C the appium capabilities need to have an extension prefix
        // http://appium.io/docs/en/writing-running-appium/caps/
        // This is `appium:` for all Appium Capabilities which can be found here

        "appium:automationName": "UIAutomation1",
        "appium:udid": "emulator-5554",
        "appium:appPackage": "com.wdiodemoapp",
        "appium:appWaitActivity": ".SplashActivity",
        // The path to the app
        "appium:app": join(
            process.cwd(),
            "./apps/Android-NativeDemoApp-0.4.0.apk"
        ),
        // @ts-ignore
        "appium:newCommandTimeout": 240,
    },
];

exports.config = config;
