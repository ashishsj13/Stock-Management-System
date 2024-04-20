import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const UpdateProduct = () => 
{
  const [inputProduct, setInputProduct] = useState(
  {
    name: "",
    quantity: "",
    price: "",
    image: null, 
  });

  const { id } = useParams();
  const fetchSingleProduct = async () => 
  {
    const res = await axios.get(`http://localhost:5000/read/${id}`);
    console.log(res);
    setInputProduct(
    {
      name: res.data.name,
      quantity: res.data.quantity,
      price: res.data.price,
    });
  };

  useEffect(() => 
  {
    fetchSingleProduct();
  }, []);

  const handleInputChange = (event) => 
  {
    setInputProduct(
    {
      ...inputProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => 
  {
    setInputProduct(
    {
      ...inputProduct,
      image: event.target.files[0], 
    });
  };

  const handleSubmit = async (event) => 
  {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", inputProduct.name);
    formData.append("quantity", inputProduct.quantity);
    formData.append("price", inputProduct.price);
    formData.append("image", inputProduct.image);
    try 
    {
      const res = await axios.put(`http://localhost:5000/updateproduct/${id}`, formData, 
      {
        headers: 
        {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 200) 
      {
        window.location = "/home";
      }
      fetchAllProduct();
    } 
    catch (error) 
    {
      console.error(error);
    }
  };

  const [productData, setProductData] = useState([]);
  const fetchAllProduct = async () => 
  {
    const res = await axios.get("http://localhost:5000/readallproduct");
    console.log(res);
    setProductData(res.data);
  };
  useEffect(() => 
  {
    fetchAllProduct();
  }, []);

  return (
    <>
      <Header/>
        <div className="container mx-auto my-8 text-center">
          <h1 className="text-3xl font-semibold mb-6">Update Product</h1>
            <form onSubmit={handleSubmit}>
            <div class="text-lg font-semibold mb-4 grid grid-cols-3 items-center"> 
              <label class="block mb-2 mx-80">Name: </label>
              <div class="col-span-1"> 
                  <input
                    type="text"
                    name="name"
                    class="w-full rounded-lg border border-gray-300 px-4 py-2"
                    placeholder="Enter Name"
                    required
                    value={inputProduct.name}
                    onChange={handleInputChange}
                    autocomplete="off"
                  />
                </div>
            </div>
            <div class="text-lg font-semibold mb-4 grid grid-cols-3 items-center"> 
              <label class="block mb-2 mx-80">Quantity: </label>
              <div class="col-span-1"> 
                  <input
                    type="number"
                    name="quantity"
                    class="w-full rounded-lg border border-gray-300 px-4 py-2"
                    placeholder="Enter Quantity"
                    required
                    value={inputProduct.quantity}
                    onChange={handleInputChange}
                    autocomplete="off"                    
                  />
                </div>
            </div>
            <div class="text-lg font-semibold mb-4 grid grid-cols-3 items-center"> 
              <label class="block mb-2 mx-80">Price: </label>
              <div class="col-span-1"> 
                  <input
                    type="number"
                    name="price"
                    class="w-full rounded-lg border border-gray-300 px-4 py-2"
                    placeholder="Enter Price"
                    required
                    value={inputProduct.price}
                    onChange={handleInputChange}
                    autocomplete="off"
                  />
              </div>
            </div>
            <div className="text-lg font-semibold mb-4 grid grid-cols-3 items-center">
              <label className="block mb-2 mx-80">Image: </label>
              <div className="col-span-1">
                <input
                  type="file"
                  name="image"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  accept="image/*"
                  onChange={handleFileChange}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-lg w-48 h-12 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold cursor-pointer"
              >
                Update Product
              </button>
            </div>
            </form>
        </div>
    </>
  );
};

export default UpdateProduct;
