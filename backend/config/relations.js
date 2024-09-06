import Layanan from "../models/LayananModel.js";
import Kategori from "../models/KategoriModel.js";
import Tipe from "../models/TipeModel.js";

Layanan.belongsTo(Kategori, { foreignKey: 'kategori_id' });
Kategori.hasMany(Layanan, { foreignKey: 'kategori_id' });
Kategori.belongsTo(Tipe, { foreignKey: 'tipe_id' });
Tipe.hasMany(Kategori, { foreignKey: 'tipe_id' });

export { Layanan, Kategori, Tipe };
