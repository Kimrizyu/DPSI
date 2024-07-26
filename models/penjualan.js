const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Barang = require('./barang');

const Penjualan = sequelize.define('Penjualan', {
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
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false // Menonaktifkan timestamps otomatis
});

Penjualan.belongsTo(Barang, { foreignKey: 'ID_barang' });
Barang.hasMany(Penjualan, { foreignKey: 'ID_barang' });

module.exports = Penjualan;
