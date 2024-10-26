import ApiCheckController from "./ApiCheckController.js";

async function testCheck() {
  try {
    // Example data
    const user_id = "459628646";
    const zone_id = "2358";
    const game = "Mobile Legends";

    const apiCheck = new ApiCheckController();

    // Call the check function
    const result = await apiCheck.check(user_id, zone_id, game);

    // Output the result
    console.log("Test Result:", result);
  } catch (error) {
    console.error("Test Error:", error);
  }
}

testCheck();
