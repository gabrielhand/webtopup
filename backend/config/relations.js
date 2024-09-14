import Layanan from "../models/LayananModel.js";
import Kategori from "../models/KategoriModel.js";
import Tipe from "../models/TipeModel.js";
import Pembelian from "../models/PembelianModel.js";

Layanan.belongsTo(Kategori, { foreignKey: 'kategori_id' });
Kategori.hasMany(Layanan, { foreignKey: 'kategori_id' });
Kategori.belongsTo(Tipe, { foreignKey: 'tipe_id' });
Tipe.hasMany(Kategori, { foreignKey: 'tipe_id' });
Pembelian.belongsTo(Layanan, { foreignKey: 'layanan', as: 'layananDetail', targetKey: 'layanan' });
export { Layanan, Kategori, Tipe, Pembelian };
