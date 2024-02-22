import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Dashboard = () => {
    const [ProductName, setProductName] = useState("");
    const [ProductPrice, setProductPrice] = useState("");
    const [ProductImage, setProductImage] = useState("");
    const [ProductDescription, setProductDescription] = useState("");
    const [ProductCategory, setProductCategory] = useState("");
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token") || ""
    useEffect(() => {
        if (token === "") {
            alert("You are not authorized to view this page")
            navigate("/sign-in")
        } else {
            fetchProducts()
        }
    }, [])

    const navigate = useNavigate()

    const handleLogout = () => {
        const verifyLogout = window.confirm("Are You Sure You Want To Logout?")
        if (verifyLogout) {
            localStorage.removeItem("token")
            navigate("/")
        }
    }
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/Api/product/getProducts");
            console.log("Products response:", response.data); // Log the response data

            if (response.data.status === "success") {
                setProducts(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };
    const handleEdit = async () => {
        navigate("/editProfile")

    }

    const handleImageChange = (ev) => {
        const file = ev.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const ProductDetails = {
            ProductName,
            ProductPrice,
            ProductImage,
            ProductDescription,
            ProductCategory,
        };

        console.log("ProductDetails", ProductDetails);

        try {
            const response = await axios.post("http://localhost:4000/Api/product/uploadProduct", ProductDetails, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);

            if (response.data.status === "success") {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error Making post request", error);
            alert("Error posting Product, try again later");
        }
    };
    const groupProductsByCategory = () => {
        const groupedProducts = {};

        products.forEach((product) => {
            const category = product.ProductCategory || "Uncategorized";
            if (!groupedProducts[category]) {
                groupedProducts[category] = [];
            }
            groupedProducts[category].push(product);
        });

        return groupedProducts;
    };

    const groupedProducts = groupProductsByCategory();
    const deleteProduct = async (productId) => {
        try {
            // Add your delete request logic here
            const response = await axios.delete(`http://localhost:4000/Api/product/deleteProduct/${productId}`);
            if (response.data.status === "success") {
                
            }
        } catch (error) {
            console.error("Error fetching products", error);
        }
       
    };


    return (
        <div>
            <div className="w-100 d-flex align-items-center justify-content-between my-2 px-4">
                <h1>Dashboard</h1>
                <div>
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                    <button onClick={handleEdit} className="btn btn-primary mx-3">Edit Profile</button>
                    <button onClick={handleEdit} className="btn btn-danger mx-3">Delete Account</button>
                </div>
            </div>

            <div className="">

                <h1 className="text-primary fs-2 text-center">Product Form</h1>
                <div className="col-10 col-md-8 col-lg-6 mx-auto">
                    <form action="" method="post" onSubmit={handleSubmit} className=" mx-auto shadow p-4 ml-5" style={{ width: "500px" }}>
                        <input onChange={handleImageChange} type="file" name="ProductImage" id="" className="form-control my-2 w-full" />
                        <input onChange={(ev) => setProductName(ev.target.value)} type="text" name="ProductName" placeholder='product name' className="form-control my-2 w-full" />
                        <input onChange={(ev) => setProductPrice(ev.target.value)} type="text" name="ProductPrice" placeholder='product price' className="form-control my-2 w-full" />
                        <input onChange={(ev) => setProductDescription(ev.target.value)} type="text" name="ProductDescription" placeholder='product description' className="form-control my-2 w-full" />
                        <input onChange={(ev) => setProductCategory(ev.target.value)} type="text" name="ProductCategory" placeholder='product Category' className="form-control my-2 w-full" />
                        <button type="submit" className="btn btn-primary">Upload Product</button>

                    </form>
                </div>
            </div>
            <div>
                {/* Display the list of uploaded products */}
                <h2>Uploaded Products</h2>
                <ul>
                {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <ul className="display">
                        {categoryProducts.map((product) => (
                            <li key={product._id} style={{ margin: "0 10px", position: "relative" }}>
                                <img src={product.ProductImage} width="200px" alt={product.ProductName} />
                                <div style={{ position: "absolute", top: 0, right: 0 }}>
                                    <button className="btn btn-success" onClick={() => deleteProduct(product._id)}>Delete</button>
                                    <button className="btn btn-danger" onClick={() => editProduct(product._id)}>Edit</button>
                                </div>
                                <div>
                                    <h3>{product.ProductName}</h3>
                                    {/* Add additional information as needed */}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
                </ul>

            </div>
        </div>

    )
}

export default Dashboard