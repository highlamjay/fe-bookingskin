const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/upload-middleware');

const { 
    createProduct, 
    fetchAllProducts, 
    fetchDetailProduct, 
    editProduct,
    deleteProduct
} = require('../controllers/product-controller'); 
const adminMiddleware = require('../middlewares/admin-middleware');

router.post('/create', uploadMiddleware.fields([{ name: "image" }, { name: "video" }]) , createProduct)
router.get('/fetch-all', fetchAllProducts)
router.get('/fetch-detail/:id', fetchDetailProduct)
router.put('/edit/:id', editProduct)
router.delete('/delete/:id', deleteProduct)

module.exports = router;