const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Barang = require('./barang');

const Barang_rusak = sequelize.define('Barang_rusak', {
    ID_laporan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ID_barang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Barang,
            key: 'ID_barang'
        }
    },
    tanggal: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('belum disetujui', 'disetujui'),
        allowNull: false
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false // Menonaktifkan timestamps otomatis
});

Barang_rusak.belongsTo(Barang, { foreignKey: 'ID_barang' });
Barang.hasMany(Barang_rusak, { foreignKey: 'ID_barang' });

module.exports = Barang_rusak;
