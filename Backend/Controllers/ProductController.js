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
            const createProduct = { 
                ProductName,
                ProductPrice,
                ProductDescription,
                ProductCategory,
                ProductImage : productLink
            }
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





module.exports = {createProduct}