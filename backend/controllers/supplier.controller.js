const Supplier = require('../models/supplier.model');

/**
 *  addSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier &
    deleteSupplier
    
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

// add new supplier
const addSupplier = async (req, res) => {
    try {
        const { name } = req.body;
        const supplier = new Supplier({
            name
        });
        await supplier.save();
        res.status(201).json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// get all suppliers
const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        if (!suppliers) {
            return res.status(404).json({ message: "No suppliers found" });
        }
        res.status(200).json(suppliers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}




module.exports = {
    addSupplier,
    getAllSuppliers
};

