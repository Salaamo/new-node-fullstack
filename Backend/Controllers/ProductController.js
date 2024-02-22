const { cloudinary } = require("../Config/Cloudinary");
const ProductModel = require("../Models/ProductModel") ;

// Create a new Product
const createProduct = async(req,res)=>{
    const {ProductName, ProductDescription, ProductPrice, ProductImage, ProductCategory} = req.body;

    if (!ProductName || !ProductDescription || !ProductPrice || !ProductImage || !ProductCategory) {
       res.status(400).send({message: "All Fields are required"})
    }else{
        try {
            const imageUpload = await cloudinary.uploader.upload(ProductImage, 
                {folder : "productImages",
            });

            const productLink = imageUpload.secure_url
                console.log("product link : ", productLink );
            const createProduct = await ProductModel.create({ 
                ProductName,
                ProductPrice,
                ProductDescription,
                ProductCategory,
                ProductImage : productLink
            })
            if (createProduct) {
                res.status(200).send({message: "Product created successfully", status : true})
            }else{
                res.status(400).send({message: "Error uploading Product"})
            }
        } catch (error) {
            res.status(400).send({message: "Server error", error})
        }
    }
} 

const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).send({ products, status: "success" });
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};
const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        if (deletedProduct) {
            res.status(200).send({ message: "Product deleted successfully", status: true });
        } else {
            res.status(404).send({ message: "Product not found", status: false });
        }
    } catch (error) {
        console.error("Error deleting product", error);
        res.status(500).send({ message: "Server error", error });
    }
};




module.exports = {createProduct, getProducts, deleteProduct}