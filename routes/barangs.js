var express = require('express');
var router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
var Barang = require('../models/barang');
const Penjualan = require('../models/penjualan');
const Barang_rusak = require('../models/barang_rusak');

router.get('/',authenticate, authorize(['gudang']), async (req, res, next) => {
    try {
        const Barangs = await Barang.findAll();
        res.json(Barangs);
    } catch (err) {
        next(err);
    }
});

router.post('/',authenticate, authorize(['gudang']), async (req, res, next) => {
    try {
        const { Nama_barang, Jumlah_barang , Harga} = req.body;
        const newBarang = await Barang.create({ Nama_barang, Jumlah_barang, Harga });
        res.status(201).json(newBarang);
    } catch (err) {
        next(err);
    }
});

router.post('/barangrusak', authenticate, authorize(['gudang']),async (req, res, next) => {
    try {
        const { ID_barang, deskripsi} = req.body;
        const statusNow = "belum disetujui"
        const newBarang = await Barang_rusak.create({ ID_barang, deskripsi, status : statusNow});
        res.status(201).json(newBarang);
    } catch (err) {
        next(err);
    }
});

router.put('/Jual', authenticate, authorize(['kasir']), async (req, res, next) => {
    try {
        const { ID_barang, dijual } = req.body;
        const Barangs = await Barang.findByPk(ID_barang);
        if (Barangs) {
            const IDnyabarang = Barangs.ID_barang; // Pastikan nama kolom benar
            const jumlahlama = Barangs.Jumlah_barang;
            const jumlah_baru = jumlahlama - dijual; // Kurangi jumlah lama dengan jumlah yang dijual

            if (jumlah_baru < 0) {
                return res.status(400).json({ message: 'Jumlah barang tidak mencukupi' });
            }

            const harga = Barangs.Harga;
            const hargatotal = dijual * harga;

            Barangs.Jumlah_barang = jumlah_baru;
            await Penjualan.create({ ID_barang: IDnyabarang, total: hargatotal });
            await Barangs.save();

            res.json(Barangs);
        } else {
            res.status(404).json({ message: 'Barang tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});


   router.put('/:ID_barang', authenticate, authorize(['gudang']), async (req, res, next) => {
    try {
        const { Nama_barang, Jumlah_barang , Harga } = req.body;
        const Barangs = await Barang.findByPk(req.params.ID_barang);
        if (Barangs) {
            Barangs.Nama_barang = Nama_barang;
            Barangs.Jumlah_barang = Jumlah_barang;
            Barangs.Harga = Harga;
            await Barangs.save();
            res.json(Barangs);
        } else {
            res.status(404).json({ message: 'Barang tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });



router.delete('/:ID_barang',authenticate, authorize(['gudang']), async (req, res, next) => {
    try {
        const Barangs = await Barang.findByPk(req.params.ID_barang);
        if (Barangs) {
            await Barangs.destroy();
            res.json({ message: 'barang dihapus' });
        } else {
            res.status(404).json({ message: 'Barang tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;