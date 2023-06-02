// Local imports
const getAndValidateInputs = require("../lib/main").getAndValidateInputs;
const setGoogleCredentials = require("../lib/main").setGoogleCredentials;
const fs = require("fs");

const jsonString = JSON.stringify({test: "test"});

afterAll(() => {
    try {
        fs.unlinkSync("./serviceAccount.json");
    } catch(e) {
        console.log("Error in test teardown: ", e.message);
    }
})

test("Test that input validation succeeds if both apk and aab paths are provided", () => {
    process.env['INPUT_APKFILEPATH'] = "some-path"
    process.env['INPUT_AABFILEPATH'] = "some-path"
    process.env['INPUT_PACKAGENAME'] = "some.package"
    process.env['INPUT_SERVICEACCOUNTJSONPLAINTEXT'] = jsonString
    getAndValidateInputs();
})

test("Test that input validation succeeds if only apk path is provided", () => {
    process.env['INPUT_APKFILEPATH'] = "some-path"
    process.env['INPUT_PACKAGENAME'] = "some.package"
    process.env['INPUT_SERVICEACCOUNTJSONPLAINTEXT'] = jsonString
    getAndValidateInputs();
})

test("Test that input validation succeeds if only aab path is provided", () => {
    process.env['INPUT_AABFILEPATH'] = "some-path"
    process.env['INPUT_PACKAGENAME'] = "some.package"
    process.env['INPUT_SERVICEACCOUNTJSONPLAINTEXT'] = jsonString
    getAndValidateInputs();
})

test("Test that input validation fails if both apk and aab path is missing", () => {
    process.env['INPUT_PACKAGENAME'] = "some.package"
    process.env['INPUT_SERVICEACCOUNTJSONPLAINTEXT'] = jsonString
    try {
        getAndValidateInputs();
    } catch(e) {
        expect(e.message).toBe("You must provide either 'apkFilePath' or 'aabFilePath' to use this action");
    }
})

test("Test that provided json is set correctly as environment variables", () => {
    process.env['INPUT_APKFILEPATH'] = "some-path"
    process.env['INPUT_SERVICEACCOUNTJSONPLAINTEXT'] = jsonString
    process.env['INPUT_PACKAGENAME'] = "some.package"
    getAndValidateInputs();
    setGoogleCredentials();
    fs.readFile(process.env["GOOGLE_APPLICATION_CREDENTIALS"], 'utf8',(err, data) => {
        expect(data).toBe(jsonString);
    });
})
