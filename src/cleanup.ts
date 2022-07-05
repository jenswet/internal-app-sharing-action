import * as fs from "fs";
const serviceAccountFile = "./serviceAccount.json";
try {
    fs.unlinkSync(serviceAccountFile)
    console.log("Service account JSON file deleted successfully")
} catch (err) {
    // @ts-ignore
    console.log(err.message)
}
