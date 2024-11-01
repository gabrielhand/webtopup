import axios from "axios";
import crypto from "crypto";

const getApiSettings = async () => {
  return {
    username_digi: "usernamedigiflazz",
    api_key_digi: "productiondigiflazz",
  };
};

class DigiFlazzController {
  async order(uid = null, zone = null, service = null, order_id = null) {
    const api = await getApiSettings();

    const target = `${uid}${zone}`;
    const sign = crypto
      .createHash("md5")
      .update(api.username_digi + api.api_key_digi + String(order_id))
      .digest("hex");

    const apiPostData = {
      username: api.username_digi,
      buyer_sku_code: service,
      customer_no: target,
      ref_id: String(order_id),
      sign: sign,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return this.connect("/v1/transaction", apiPostData, headers);
  }

  async status(poid = null, pid = null, uid = null, zone = null) {
    const api = await getApiSettings();

    const target = `${uid}${zone}`;
    const sign = crypto
      .createHash("md5")
      .update(api.username_digi + api.api_key_digi + String(poid))
      .digest("hex");

    const data = {
      command: "status-pasca",
      username: api.username_digi,
      buyer_sku_code: pid,
      customer_no: target,
      ref_id: poid,
      sign: sign,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return this.connect("/v1/transaction", data, headers);
  }

  async harga() {
    const api = await getApiSettings();

    const sign = crypto
      .createHash("md5")
      .update(api.username_digi + api.api_key_digi + "pricelist")
      .digest("hex");

    const data = {
      username: api.username_digi,
      sign: sign,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return this.connect("/v1/price-list", data, headers);
  }

  async connect(url, data, headers) {
    try {
      const response = await axios.post(
        `https://api.digiflazz.com${url}`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      return { error: "error bos" };
    }
  }
}

export default DigiFlazzController;
