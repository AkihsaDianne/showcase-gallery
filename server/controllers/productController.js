
import Product from '../models/Product.js';

// GET - Retrieve all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Retrieve a single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST - Create a product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - Update a product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, image },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Remove a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
