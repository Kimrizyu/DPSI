const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Barang = sequelize.define('Barang', {
    ID_barang: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nama_barang: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Jumlah_barang: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Harga: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false // Menonaktifkan timestamps otomatis
});

module.exports = Barang;
