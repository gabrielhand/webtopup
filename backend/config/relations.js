import Layanan from "../models/LayananModel.js";
import Kategori from "../models/KategoriModel.js";
import Tipe from "../models/TipeModel.js";
import Pembelian from "../models/PembelianModel.js";
import DataJoki from "../models/DataJokiModel.js";
import Pembayaran from "../models/PembayaranModel.js";
import SubKategori from "../models/SubKategoriModel.js";
import Method from "../models/MethodModel.js";

Layanan.belongsTo(Kategori, { foreignKey: "kategori_id" });
SubKategori.belongsTo(Kategori, { foreignKey: "category_id", targetKey: "id" });
Kategori.hasMany(Layanan, { foreignKey: "kategori_id" });
Kategori.belongsTo(Tipe, { foreignKey: "tipe_id" });
Tipe.hasMany(Kategori, { foreignKey: "tipe_id" });
Pembelian.belongsTo(SubKategori, {
  foreignKey: "layanan",
  as: "layananSubKat",
  targetKey: "name",
});
Pembelian.belongsTo(Layanan, {
  foreignKey: "layanan",
  as: "layananDetail",
  targetKey: "layanan",
});
Pembelian.belongsTo(Pembayaran, {
  foreignKey: "order_id",
  targetKey: "order_id",
});
Pembelian.hasOne(DataJoki, {
  foreignKey: "order_id",
  sourceKey: "order_id",
  as: "dataJoki",
});
DataJoki.belongsTo(Pembelian, {
  foreignKey: "order_id",
  targetKey: "order_id",
});
DataJoki.hasOne(Pembayaran, {
  foreignKey: "order_id",
  targetKey: "order_id",
});
Method.hasMany(Pembayaran, { foreignKey: "metode", sourceKey: "code" });
Pembayaran.belongsTo(Method, { foreignKey: "metode", targetKey: "code" });
export {
  Layanan,
  Kategori,
  Tipe,
  Pembelian,
  Pembayaran,
  Method,
  DataJoki,
  SubKategori,
};
