const { Product } = require("../models");

const Validator = require("fastest-validator");

const v = new Validator();

const getAll = async (req, res) => {
    const products = await Product.findAll();
    return res.json(products);
};

const getById = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "Product not found",
        });
    }
    return res.json(product);
};

const create = async (req, res) => {
    const schema = {
        name: "string",
        brand: "string",
        description: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    const product = await Product.create(req.body);
    return res.json(product);
};

const update = async (req, res) => {
    const id = req.params.id;

    let product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
        });
    }

    const schema = {
        name: "string|optional",
        brand: "string|optional",
        description: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    product = await product.update(req.body);
    return res.json(product);
};

const destroy = async (req, res) => {
    const id = req.params.id;

    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
        });
    }

    await product.destroy();
    return res.json({
        message: "Product deleted",
    });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy,
};
