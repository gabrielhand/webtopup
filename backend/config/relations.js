import Layanan from "../models/LayananModel.js";
import Kategori from "../models/KategoriModel.js";
import Tipe from "../models/TipeModel.js";
import Pembelian from "../models/PembelianModel.js";
import SubKategori from "../models/SubKategoriModel.js";

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
export { Layanan, Kategori, Tipe, Pembelian, SubKategori };
