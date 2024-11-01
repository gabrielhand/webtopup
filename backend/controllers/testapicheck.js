import ApiCheckController from "./ApiCheckController.js";

async function testCheck() {
  try {
    const user_id = "3048720125";
    const zone_id = null;
    const game = "Free Fire";

    const apiCheck = new ApiCheckController();

    const result = await apiCheck.check(user_id, zone_id, game);

    console.log("Test Result:", result);
  } catch (error) {
    console.error("Test Error:", error);
  }
}

testCheck();
