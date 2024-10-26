import SettingWeb from "../models/SettingWebModel.js";
import path from "path";
import fs from "fs";

export const getSettingWeb = async (req, res) => {
  try {
    const response = await SettingWeb.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveKonfigurasiWebsite = async (req, res) => {
  try {
    const {
      judul_web,
      deskripsi_web,
      keyword,
      url_wa,
      url_ig,
      url_tiktok,
      url_yt,
      url_fb,
    } = req.body;

    const settingWeb = await SettingWeb.findOne({
      where: {
        id: 1,
      },
    });

    let ogImageFileName = "";
    let logoHeaderFileName = "";
    let logoFooterFileName = "";
    let logoFaviconFileName = "";
    let bannerLoginRegFileName = "";
    if (req.files === null) {
      ogImageFileName = settingWeb.og_image_filename;
      logoHeaderFileName = settingWeb.logo_header_filename;
      logoFooterFileName = settingWeb.logo_footer_filename;
      logoFaviconFileName = settingWeb.logo_favicon_filename;
      bannerLoginRegFileName = settingWeb.banner_login_register_filename;
    } else {
      const ogImageFile = req.files.og_image ? req.files.og_image : null;
      const logoHeaderFile = req.files.logo_header
        ? req.files.logo_header
        : null;
      const logoFooterFile = req.files.logo_footer
        ? req.files.logo_footer
        : null;
      const logoFaviconFile = req.files.logo_favicon
        ? req.files.logo_favicon
        : null;
      const bannerLoginRegFile = req.files.banner_login_register
        ? req.files.banner_login_register
        : null;

      const allowedType = [".png", ".jpg", ".jpeg"];

      if (ogImageFile) {
        const ogImageFileSize = ogImageFile.data.length;
        const ogImageExt = path.extname(ogImageFile.name);
        ogImageFileName = ogImageFile.md5 + "-" + Date.now() + ogImageExt;

        if (
          !allowedType.includes(ogImageExt.toLocaleLowerCase()) ||
          ogImageFileSize > 5000000
        ) {
          return res.status(422).json({
            msg: "File header image tidak valid atau ukuran terlalu besar!",
          });
        }

        if (settingWeb.og_image_filename) {
          const filepath = `./public/assets/logo/${settingWeb.og_image_filename}`;
          fs.unlinkSync(filepath);
        }

        ogImageFile.mv(`./public/assets/logo/${ogImageFileName}`, (err) => {
          if (err) return res.status(500).json({ msg: err.message });
        });
      } else {
        ogImageFileName = settingWeb.og_image_filename;
      }

      if (logoHeaderFile) {
        const logoHeaderFileSize = logoHeaderFile.data.length;
        const logoHeaderExt = path.extname(logoHeaderFile.name);
        logoHeaderFileName =
          logoHeaderFile.md5 + "-" + Date.now() + logoHeaderExt;

        if (
          !allowedType.includes(logoHeaderExt.toLocaleLowerCase()) ||
          logoHeaderFileSize > 5000000
        ) {
          return res.status(422).json({
            msg: "File logo footer tidak valid atau ukuran terlalu besar!",
          });
        }

        if (settingWeb.logo_header_filename) {
          const filepath = `./public/assets/logo/${settingWeb.logo_header_filename}`;
          fs.unlinkSync(filepath);
        }

        logoHeaderFile.mv(
          `./public/assets/logo/${logoHeaderFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      } else {
        logoHeaderFileName = settingWeb.logo_header_filename;
      }

      if (logoFooterFile) {
        const logoFooterFileSize = logoFooterFile.data.length;
        const logoFooterExt = path.extname(logoFooterFile.name);
        logoFooterFileName =
          logoFooterFile.md5 + "-" + Date.now() + logoFooterExt;

        if (
          !allowedType.includes(logoFooterExt.toLocaleLowerCase()) ||
          logoFooterFileSize > 5000000
        ) {
          return res.status(422).json({
            msg: "File logo footer tidak valid atau ukuran terlalu besar!",
          });
        }

        if (settingWeb.logo_footer_filename) {
          const filepath = `./public/assets/logo/${settingWeb.logo_footer_filename}`;
          fs.unlinkSync(filepath);
        }

        logoFooterFile.mv(
          `./public/assets/logo/${logoFooterFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      } else {
        logoFooterFileName = settingWeb.logo_footer_filename;
      }

      if (logoFaviconFile) {
        const logoFaviconFileSize = logoFaviconFile.data.length;
        const logoFaviconExt = path.extname(logoFaviconFile.name);
        logoFaviconFileName =
          logoFaviconFile.md5 + "-" + Date.now() + logoFaviconExt;

        if (
          !allowedType.includes(logoFaviconExt.toLocaleLowerCase()) ||
          logoFaviconFileSize > 5000000
        ) {
          return res.status(422).json({
            msg: "File logo favicon tidak valid atau ukuran terlalu besar!",
          });
        }

        if (settingWeb.logo_favicon_filename) {
          const filepath = `./public/assets/logo/${settingWeb.logo_favicon_filename}`;
          fs.unlinkSync(filepath);
        }

        logoFaviconFile.mv(
          `./public/assets/logo/${logoFaviconFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      } else {
        logoFaviconFileName = settingWeb.logo_favicon_filename;
      }

      if (bannerLoginRegFile) {
        const bannerLoginRegFileSize = bannerLoginRegFile.data.length;
        const bannerLoginRegExt = path.extname(bannerLoginRegFile.name);
        bannerLoginRegFileName =
          bannerLoginRegFile.md5 + "-" + Date.now() + bannerLoginRegExt;

        if (
          !allowedType.includes(bannerLoginRegExt.toLocaleLowerCase()) ||
          bannerLoginRegFileSize > 5000000
        ) {
          return res.status(422).json({
            msg: "File banner login register tidak valid atau ukuran terlalu besar!",
          });
        }

        if (settingWeb.banner_login_register_filename) {
          const filepath = `./public/assets/banner/${settingWeb.banner_login_register_filename}`;
          fs.unlinkSync(filepath);
        }

        bannerLoginRegFile.mv(
          `./public/assets/banner/${bannerLoginRegFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      } else {
        bannerLoginRegFileName = settingWeb.banner_login_register_filename;
      }
    }

    const ogImageUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/logo/${ogImageFileName}`;
    const logoHeaderUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/logo/${logoHeaderFileName}`;
    const logoFooterUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/logo/${logoFooterFileName}`;
    const logoFaviconUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/logo/${logoFaviconFileName}`;
    const bannerLoginRegUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/banner/${bannerLoginRegFileName}`;

    await SettingWeb.update(
      {
        judul_web: judul_web,
        deskripsi_web: deskripsi_web,
        keyword: keyword,
        og_image: ogImageUrl,
        og_image_filename: ogImageFileName,
        logo_header: logoHeaderUrl,
        logo_header_filename: logoHeaderFileName,
        logo_footer: logoFooterUrl,
        logo_footer_filename: logoFooterFileName,
        logo_favicon: logoFaviconUrl,
        logo_favicon_filename: logoFaviconFileName,
        banner_login_register: bannerLoginRegUrl,
        banner_login_register_filename: bannerLoginRegFileName,
        url_wa: url_wa,
        url_ig: url_ig,
        url_tiktok: url_tiktok,
        url_youtube: url_yt,
        url_fb: url_fb,
      },
      {
        where: {
          id: 1,
        },
      }
    );

    return res.status(200).json({
      msg: "Berhasil mengedit website!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const saveSloganWebsite = async (req, res) => {
  try {
    const sloganWeb = req.body.slogan_web;

    if (!sloganWeb) {
      return res.status(401).json({
        msg: "Slogan website tidak boleh kosong!",
      });
    } else {
      await SettingWeb.update(
        {
          slogan_web: sloganWeb,
        },
        {
          where: {
            id: 1,
          },
        }
      );

      return res.status(200).json({ msg: "Berhasil mengedit slogan website!" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const saveWarnaWebsite = async (req, res) => {
  try {
    const warna1 = req.body.warna1;
    const warna2 = req.body.warna2;
    const warna3 = req.body.warna3;
    const warna4 = req.body.warna4;
    const warna5 = req.body.warna5;

    if (!warna1 || !warna2 || !warna3 || !warna4 || !warna5) {
      return res.status(401).json({
        msg: "Warna tidak boleh kosong, pastikan semua warna terisi!",
      });
    } else {
      await SettingWeb.update(
        {
          warna1: warna1,
          warna2: warna2,
          warna3: warna3,
          warna4: warna4,
          warna5: warna5,
        },
        {
          where: {
            id: 1,
          },
        }
      );

      return res.status(200).json({ msg: "Berhasil mengedit warna website!" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const saveHargaMembership = async (req, res) => {
  try {
    const hargaGold = req.body.harga_gold;
    const hargaPlatinum = req.body.harga_platinum;

    if (!hargaGold || !hargaPlatinum) {
      return res.status(401).json({
        msg: "Harga membership tidak boleh kosong, pastikan semua harga terisi!",
      });
    } else {
      await SettingWeb.update(
        {
          harga_gold: hargaGold,
          harga_platinum: hargaPlatinum,
        },
        {
          where: {
            id: 1,
          },
        }
      );

      return res
        .status(200)
        .json({ msg: "Berhasil mengedit harga membership!" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const saveMutasiEWallet = async (req, res) => {
  try {
    const ovoAdmin = req.body.ovo_admin;
    const ovo1Admin = req.body.ovo1_admin;
    const gopayAdmin = req.body.gopay_admin;
    const gopay1Admin = req.body.gopay1_admin;
    const danaAdmin = req.body.dana_admin;
    const shoopePayAdmin = req.body.shoopepay_admin;
    const bcaAdmin = req.body.bca_admin;

    if (
      !ovoAdmin ||
      !ovo1Admin ||
      !gopayAdmin ||
      !gopay1Admin ||
      !danaAdmin ||
      !shoopePayAdmin ||
      !bcaAdmin
    ) {
      return res.status(401).json({
        msg: "Mutasi e-wallet/bank tidak boleh kosong, pastikan semua mutasi e-wallet/bank terisi!",
      });
    } else {
      await SettingWeb.update(
        {
          ovo_admin: ovoAdmin,
          ovo1_admin: ovo1Admin,
          gopay_admin: gopayAdmin,
          gopay1_admin: gopay1Admin,
          dana_admin: danaAdmin,
          shopeepay_admin: shoopePayAdmin,
          bca_admin: bcaAdmin,
        },
        {
          where: {
            id: 1,
          },
        }
      );

      return res
        .status(200)
        .json({ msg: "Berhasil mengedit mutasi e-wallet/bank!" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
