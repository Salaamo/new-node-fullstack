import React from 'react'

const Shopping = () => {
  return (
    <div className="">

        <h1 className="text-primary fs-2 text-center">Product Form</h1>
        <div className="col-10 col-md-8 col-lg-6 mx-auto">
        <form action="" method="post" className=" mx-auto shadow p-4 ml-5" style={{ width: "500px" }}>
            <input type="file" name="image" id="" className="form-control my-2 w-full" multiple/>
            <input type="text" name="name" placeholder='product name' className="form-control my-2 w-full"/>
            <input type="text" name="price" placeholder='product price' className="form-control my-2 w-full"/>
            <input type="text" name="description" placeholder='product description' className="form-control my-2 w-full"/>
        </form>
        </div>
    </div>
  )
}

export default Shopping



