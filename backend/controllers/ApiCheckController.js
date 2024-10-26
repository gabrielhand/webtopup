import axios from "axios";

class ApiCheckController {
  async check(user_id = null, zone_id = null, game = null) {
    const api_key =
      "9KXbuOnRBkxPDrStifZ7V0EwzAmoqTsQd81vJUMajc2yl5gCYIpFLhN3HGe6";

    const params = {
      api_key: api_key,
      game: game,
      user_id: user_id,
      zone_id: zone_id,
    };

    console.log(params);

    const result = await this.connect(params);
    if (result.code === 200) {
      return {
        status: { code: 200 },
        data: { userNameGame: result.result.username },
      };
    } else {
      return {
        status: { code: 1 },
        data: { userNameGame: "Invalid User ID or Zone ID" },
      };
    }
  }

  async connect(data = null) {
    const url = "https://ruukastore.com/api/v1/check-game";

    try {
      const response = await axios.post(url, new URLSearchParams(data), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const jsonResponse = response.data;
      console.log(jsonResponse);
      return jsonResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ApiCheckController;
