import Kategori from "../models/KategoriModel.js";
import Layanan from "../models/LayananModel.js";
import Method from "../models/MethodModel.js";
import SettingWeb from "../models/SettingWebModel.js";
import Voucher from "../models/VoucherModel.js";
import Pembelian from "../models/PembelianModel.js";
import Pembayaran from "../models/PembayaranModel.js";
import DataJoki from "../models/DataJokiModel.js";
import ApiCheckController from "../controllers/ApiCheckController.js";
import digiflazzController from "../controllers/digiflazzController.js";
import { Sequelize, where } from "sequelize";
import dayjs from "dayjs";
import User from "../models/UserModel.js";

const generateRandomString = (length) => {
  const characters = "QWERTYUIOPLKJHGFDSAZXCVBNM";
  let result = "CENTRA-";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateBasicAuth = (username, password) => {
  return Buffer.from(`${username}:${password}`).toString("base64");
};

const generateAuthSignature = (payload, timestamp, path, secret) => {
  const stringToSign = payload + timestamp + path;
  return crypto.createHmac("sha256", secret).update(stringToSign).digest("hex");
};

const orderProduct = async (category, produk, extraData = {}, quan = 1) => {
  const partnerID = "ca3b021619bccf10c82da6c8c0510cd9";
  const secretKey = "kgyyyYlO1N";

  const url = "https://moogold.com/wp-json/v1/api/order/create_order";
  const timestamp = Math.floor(Date.now() / 1000);

  if (!quan) {
    quan = 1;
  }

  const data = {
    category,
    "product-id": produk,
    quantity: quan,
    ...extraData,
  };
  console.info(data);

  const payload = JSON.stringify({
    path: "order/create_order",
    data: data,
    partnerOrderId: generateRandomString(7),
  });

  const basicAuth = generateBasicAuth(partnerID, secretKey);
  const authSignature = generateAuthSignature(
    payload,
    timestamp,
    "order/create_order",
    secretKey
  );

  try {
    const response = await axios.post(url, JSON.parse(payload), {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        auth: authSignature,
        timestamp: timestamp,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "Error occurred" };
  }
};

export const konfirmasiOrder = async (req, res) => {
  try {
    const {
      uid,
      zone,
      service,
      payment_method,
      nomor,
      voucher,
      quantity,
      ktg_tipe,
    } = req.body;
    const layanan = await Layanan.findByPk(service);
    const kategori = await Kategori.findByPk(layanan.kategori_id);

    let dataLayanan;
    const userRole = req.session.role || "Member";

    if (userRole === "Platinum" || "Admin") {
      dataLayanan = await Layanan.findOne({
        where: { id: service },
        attributes: [
          [Sequelize.col("harga_platinum"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    } else if (userRole === "Gold") {
      dataLayanan = await Layanan.findOne({
        where: { id: service },
        attributes: [
          [Sequelize.col("harga_gold"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    } else {
      dataLayanan = await Layanan.findOne({
        where: { id: service },
        attributes: [
          [Sequelize.col("harga_member"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    }
    if (
      dataLayanan.is_flash_sale &&
      new Date(dataLayanan.expired_flash_sale) >= new Date()
    ) {
      dataLayanan.harga = dataLayanan.harga_flash_sale;
    }

    if (voucher) {
      const voucherData = await Voucher.findOne({ where: { kode: voucher } });
      if (voucherData && voucherData.stock > 0) {
        let discount = dataLayanan.harga * (voucherData.promo / 100);
        discount = Math.min(discount, voucherData.max_potongan);
        dataLayanan.harga -= discount;
      }
    }

    const settings = await SettingWeb.findOne({ attributes: ["logo_header"] });
    const logoHeader = settings ? settings.logo_header : null;

    const findPayment = await Method.findOne({
      where: { code: payment_method },
      attributes: ["name", "images"],
    });

    const paymentMethod =
      payment_method === "SALDO" ? "SALDO" : findPayment.name;

    const paymentMethodImage =
      payment_method === "SALDO" ? logoHeader : findPayment.images;

    const gameValidationCodes = [
      "gift-skin-ml",
      "8-ball-pool",
      "arena-of-valor",
      "apex-legends",
      "call-of-duty",
      "dragon-city",
      "free-fire",
      "higgs-domino",
      "honkai-impact",
      "lords-mobile",
      "marvel-super-war",
      "mobile-legends",
      "mobile-legend",
      "mobile-legends-global",
      "mobile-legends-adventure",
      "point-blank",
      "ragnarok-m",
      "tom-and-jerry",
      "top-eleven",
      "valorant",
    ];

    const apiCheck = new ApiCheckController();
    let apiResult;
    let data;

    if (gameValidationCodes.includes(kategori.kode)) {
      if (kategori.kode === "8-ball-pool") {
        apiResult = await apiCheck.check(uid, null, "8 Ball Pool");
      } else if (kategori.kode === "arena-of-valor") {
        apiResult = await apiCheck.check(uid, null, "AOV");
      } else if (kategori.kode === "apex-legends") {
        apiResult = await apiCheck.check(uid, null, "Apex Legends");
      } else if (kategori.kode === "call-of-duty") {
        apiResult = await apiCheck.check(uid, null, "Call Of Duty");
      } else if (kategori.kode === "dragon-city") {
        apiResult = await apiCheck.check(uid, null, "Dragon City");
      } else if (kategori.kode === "free-fire") {
        apiResult = await apiCheck.check(uid, null, "Free Fire");
      } else if (kategori.kode === "higgs-domino") {
        apiResult = await apiCheck.check(uid, null, "Higgs Domino");
      } else if (kategori.kode === "honkai-impact") {
        apiResult = await apiCheck.check(uid, null, "Honkai Impact");
      } else if (kategori.kode === "lords-mobile") {
        apiResult = await apiCheck.check(uid, null, "Lords Mobile");
      } else if (kategori.kode === "marvel-super-war") {
        apiResult = await apiCheck.check(uid, null, "Marvel Super War");
      } else if (
        ["mobile-legends", "mobile-legends-global", "mobile-legend"].includes(
          kategori.kode
        )
      ) {
        apiResult = await apiCheck.check(uid, zone, "Mobile Legends");
      } else if (kategori.kode === "mobile-legends-adventure") {
        apiResult = await apiCheck.check(uid, zone, "Mobile Legends Adventure");
      } else if (kategori.kode === "point-blank") {
        apiResult = await apiCheck.check(uid, null, "Point Blank");
      } else if (kategori.kode === "ragnarok-m") {
        apiResult = await apiCheck.check(uid, zone, "Ragnarok M");
      } else if (kategori.kode === "tom-and-jerry") {
        apiResult = await apiCheck.check(uid, null, "Tom Jerry Chase");
      } else if (kategori.kode === "top-eleven") {
        apiResult = await apiCheck.check(uid, null, "Top Eleven");
      } else if (kategori.kode === "valorant") {
        apiResult = await apiCheck.check(uid, null, "Valorant");
      } else {
        apiResult = await apiCheck.check(uid, null, kategori.nama);
      }

      if (apiResult.status.code === 1) {
        return res.status(422).json({
          message: "Username tidak ditemukan atau coba lagi nanti",
        });
      }

      const username = apiResult.data.userNameGame;
      data = {
        kategori: {
          nama: kategori.nama,
          thumbnail: kategori.thumbnail,
          server_id: kategori.server_id,
        },
        username,
        user_id: uid,
        zone: zone,
        layanan: layanan.layanan,
        harga: dataLayanan.dataValues.harga,
        quantity: quantity,
        hargaTotal: dataLayanan.dataValues.harga * quantity,
        paymentMethod: paymentMethod,
        paymentMethodImage,
        nomor: nomor,
      };
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error confirming order:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const simpanOrder = async (req, res) => {
  try {
    const {
      uid,
      zone,
      nickname,
      service,
      payment_method,
      nomor,
      voucher,
      quantity,
      ktg_tipe,
    } = req.body;
    const layanan = await Layanan.findByPk(service);
    const kategori = await Kategori.findByPk(layanan.kategori_id);

    let dataLayanan;
    const userRole = req.session.role || "Member";

    if (userRole === "Platinum" || "Admin") {
      dataLayanan = await Layanan.findOne({
        where: { id: service },
        attributes: [
          "layanan",
          [Sequelize.col("harga_platinum"), "harga"],
          "kategori_id",
          "provider_id",
          "provider",
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
          [Sequelize.col("profit_platinum"), "profit"],
        ],
      });
    } else if (userRole === "Gold") {
      dataLayanan = await Layanan.findOne({
        where: { id: service },
        attributes: [
          "layanan",
          [Sequelize.col("harga_gold"), "harga"],
          "kategori_id",
          "provider_id",
          "provider",
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
          [Sequelize.col("profit_gold"), "profit"],
        ],
      });
    } else {
      dataLayanan = await Layanan.findOne({
        where: { id: service },
        attributes: [
          "layanan",
          [Sequelize.col("harga_member"), "harga"],
          "kategori_id",
          "provider_id",
          "provider",
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
          [Sequelize.col("profit_member"), "profit"],
        ],
      });
    }
    if (
      dataLayanan.dataValues.is_flash_sale &&
      new Date(dataLayanan.dataValues.expired_flash_sale) >= new Date()
    ) {
      dataLayanan.dataValues.harga = dataLayanan.dataValues.harga_flash_sale;
    }

    if (voucher) {
      const voucherData = await Voucher.findOne({ where: { kode: voucher } });
      if (voucherData && voucherData.stock > 0) {
        let discount = dataLayanan.dataValues.harga * (voucherData.promo / 100);
        discount = Math.min(discount, voucherData.max_potongan);
        dataLayanan.dataValues.harga -= discount;
      }
    }

    console.log(dataLayanan);

    const unik = dayjs().format("HHmm");
    const kode_unik = Math.random().toString().slice(2, 5);
    const order_id = `MSID${unik}${kode_unik}ID`;

    let rand = Math.floor(Math.random() * 1000) + 1;
    let no_pembayaran = "";
    let amount = 0;
    let reference = "";

    if (!dataLayanan) {
      return res
        .status(404)
        .json({ status: false, message: "Data layanan tidak ditemukan" });
    }

    if (payment_method == "SALDO") {
      amount = dataLayanan.dataValues.harga * quantity;
    } else if (
      payment_method == "shopeepay" ||
      payment_method == "dana" ||
      payment_method == "ovo" ||
      payment_method == "BCATF" ||
      payment_method == "MANDIRITF"
    ) {
      amount = dataLayanan.dataValues.harga + rand;
      reference = "";
      if (payment_method == "shopeepay") {
        no_pembayaran = ENV("SHOPEEPAY_ADMIN");
      } else if (payment_method == "dana") {
        no_pembayaran = ENV("DANA_ADMIN");
      } else if (payment_method == "ovo") {
        no_pembayaran = ENV("OVO_ADMIN");
      } else if (payment_method == "BCATF") {
        no_pembayaran = ENV("BCA_ADMIN");
      } else if (payment_method == "MANDIRITF") {
        no_pembayaran = ENV("MANDIRI_ADMIN");
        if (amount < 1000) {
          return res.status(400).json({
            message:
              "Minimum jumlah pembayaran untuk metode pembayaran ini adalah Rp 1.000",
          });
        }
      }
    } else {
      // const duitku = new DuitkuController();
      // const asd = req.body.harga * 1.09;
      // console.log(
      //   `${asd} ${req.body.payment_method} ${req.body.order_id} ${req.body.nomor} ${req.body.order_id}@gmail.com`
      // );
      // const tripayres = await duitku.request(
      //   req.body.harga,
      //   req.body.payment_method,
      //   req.body.order_id,
      //   req.body.nomor,
      //   `${req.body.order_id}@gmail.com`
      // );
      // console.log(tripayres);
      // if (!tripayres.success) {
      //   return res.status(400).json({ message: tripayres.message });
      // }
      // const { no_pembayaran, reference, amount } = tripayres;
      // return res.status(200).json({
      //   no_pembayaran,
      //   reference,
      //   amount,
      // });
    }

    let tipe = "";

    if (req.body.ktg_tipe === "joki") {
      tipe = "joki";
    } else if (req.body.ktg_tipe === "dm_vilog") {
      tipe = "dm_vilog";
    } else if (req.body.ktg_tipe === "gift_skin") {
      tipe = "gift_skin";
    } else {
      tipe = "game";
    }

    if (payment_method != "SALDO") {
      const pembelian = await Pembelian.create({
        order_id: req.body.order_id,
        user_id:
          req.body.ktg_tipe !== "joki" && req.body.ktg_tipe !== "dm_vilog"
            ? req.body.uid
            : "-",
        zone:
          req.body.ktg_tipe !== "joki" && req.body.ktg_tipe !== "dm_vilog"
            ? req.body.zone
            : "-",
        nickname:
          req.body.ktg_tipe !== "joki" && req.body.ktg_tipe !== "dm_vilog"
            ? req.body.nickname
            : "-",
        layanan: dataLayanan.dataValues.layanan,
        harga: amount,
        jumlah: quantity,
        profit: amount,
        status:
          req.body.ktg_tipe !== "joki" &&
          req.body.ktg_tipe !== "dm_vilog" &&
          req.body.ktg_tipe !== "gift_skin"
            ? "Pending"
            : "-",
        tipe_transaksi: req.body.ktg_tipe !== "joki" ? "game" : "joki",
        is_review: "No",
        email_vilog: tipe === "dm_vilog" ? req.body.email_vilog : null,
        password_vilog: tipe === "dm_vilog" ? req.body.password_vilog : null,
        loginvia_vilog: tipe === "dm_vilog" ? req.body.loginvia_vilog : null,
      });

      console.info(pembelian.toJSON());

      const pembayaran = await Pembayaran.create({
        order_id: req.body.order_id,
        harga: amount,
        no_pembayaran: no_pembayaran,
        no_pembeli: req.body.nomor,
        status: "Belum Lunas",
        metode: req.body.payment_method,
        reference: reference,
      });

      if (req.body.ktg_tipe === "joki") {
        await DataJoki.create({
          order_id: req.body.order_id,
          email_joki: req.body.email_joki,
          password_joki: req.body.password_joki,
          loginvia_joki: req.body.loginvia_joki,
          nickname_joki: req.body.nickname_joki,
          request_joki: req.body.request_joki,
          catatan_joki: req.body.catatan_joki,
          status_joki: "Proses",
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      return res.status(200).json({ message: "Pembelian berhasil diproses!" });
    } else if (payment_method == "SALDO") {
      const user = await User.findOne({
        where: {
          username: req.session.username,
        },
      });

      if (dataLayanan.dataValues.harga > user.balance) {
        return res.status(401).json({ msg: "Maaf, saldo anda tidak cukup!" });
      }

      let provider_order_id = "";
      let order = { status: false };

      // if (dataLayanan.dataValues.provider == "digiflazz") {
      //   const digi = new digiflazzController();
      //   const provider_order_id = Math.floor(Math.random() * 100000);
      //   const order = digi.order(
      //     uid,
      //     zone,
      //     dataLayanan.dataValues.provider_id,
      //     provider_order_id
      //   );

      //   if (
      //     (order.data && order.data.status == "Pending") ||
      //     order.data.status == "Sukses"
      //   ) {
      //     order.status = true;
      //   } else {
      //     order.status = false;
      //   }
      // } else if (dataLayanan.dataValues.provider == "moogold") {
      //   const provid = dataLayanan.dataValues.provider_id.split(",");
      //   const kategori = await Kategori.findOne({
      //     where: {
      //       id: dataLayanan.dataValues.kategori_id,
      //     },
      //   });

      //   if (kategori.nama === "FREE FIRE") {
      //     const order = await orderProduct(
      //       "144459",
      //       provid[0],
      //       { "User ID": uid },
      //       provid[1]
      //     );

      //     const provider_order_id = order.order_id;
      //     console.log(order);

      //     if (order.status == "processing") {
      //       order.status = true;
      //     } else {
      //       order.status = false;
      //     }
      //   }
      // }
      for (let i = 0; i < quantity; i++) {
        if (dataLayanan.dataValues.provider == "manual") {
          provider_order_id = "";
          order.status = true;
        }
      }

      if (order.status) {
        await user.update({
          balance: user.balance - dataLayanan.dataValues.harga,
        });

        await Pembelian.create({
          username: req.session.username,
          order_id: order_id,
          user_id: ktg_tipe !== "joki" || ktg_tipe !== "dm_vilog" ? uid : "-",
          zone: ktg_tipe !== "joki" || ktg_tipe !== "dm_vilog" ? zone : "-",
          nickname:
            ktg_tipe !== "joki" || ktg_tipe !== "dm_vilog" ? nickname : "-",
          layanan: dataLayanan.dataValues.layanan,
          harga: dataLayanan.dataValues.harga,
          jumlah: quantity,
          profit:
            (dataLayanan.dataValues.harga * dataLayanan.dataValues.profit) /
            100,
          status:
            ktg_tipe !== "joki" ||
            ktg_tipe !== "dm_vilog" ||
            ktg_tipe !== "gift_skin"
              ? "Pending"
              : "-",
          provider_order_id: provider_order_id ? provider_order_id : "",
          log:
            ktg_tipe !== "joki" ||
            ktg_tipe !== "dm_vilog" ||
            ktg_tipe !== "gift_skin"
              ? JSON.stringify(order)
              : "",
          tipe_transaksi: tipe,
          is_review: "No",
        });

        await Pembayaran.create({
          order_id: order_id,
          harga: dataLayanan.dataValues.harga,
          no_pembayaran: "SALDO",
          no_pembeli: nomor,
          status: "Lunas",
          metode: payment_method,
          reference: reference,
        });
      } else {
        return res.status(500).json({
          message: "Server Error",
        });
      }
    }

    return res.status(200).json({
      order_id: order_id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
