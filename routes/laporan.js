var express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const Penjualan = require('../models/penjualan');
const Barang_rusak = require('../models/barang_rusak');
var router = express.Router();


//hanya manager yang dapat dapat melihat penjualan, barang rusak dan meng acc barang rusak
router.get('/penjualan',authenticate, authorize(['manager']), async (req, res, next) => {
    try {
        const Barangs = await Penjualan.findAll();
        res.json(Barangs);
    } catch (err) {
        next(err);
    }
});

router.get('/barangruasak',authenticate, authorize(['manager']), async (req, res, next) => {
    try {
        const Barangs = await Barang_rusak.findAll();
        res.json(Barangs);
    } catch (err) {
        next(err);
    }
});

router.put('/barangrusak/:ID_laporan', authenticate, authorize(['manager']), async (req, res, next) => {
    try {
        const statusNow = 'disetujui'
        const Barangrusaks = await Barang_rusak.findByPk(req.params.ID_laporan);
        if (Barangrusaks) {
            Barangrusaks.status = statusNow;
            await Barangrusaks.save();
            res.json(Barangrusaks);
        } else {
            res.status(404).json({ message: 'Laporan tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

   module.exports = router;

