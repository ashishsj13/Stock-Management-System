import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";

const Home = () => 
{
  const [inputProduct, setInputProduct] = useState(
  {
    name: "",
    quantity: "",
    price: "",
    image: null,
  });

  const handleChnage = (event) => 
  {
    setInputProduct({
      ...inputProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => 
  {
    setInputProduct(
    {
      ...inputProduct,
      image: event.target.files[0], // Store the selected file
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
      const res = await axios.post("http://localhost:5000/createproduct", formData, 
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
        <div class="container mx-auto my-8 text-center">
          <h1 class="text-3xl font-semibold mb-6 ">Add Product</h1>
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
                  onChange={handleChnage}
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
                  onChange={handleChnage}
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
                  onChange={handleChnage}
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
                  onChange={handleImageChange}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="flex justify-center my-8">
              <button type="submit" className="text-xl w-48 h-12 bg-purple-500 hover:bg-purple-600 text-black px-4 py-2 rounded-lg shadow-md font-semibold cursor-pointer">
                +Add Product
              </button>
            </div>
            </form>
        </div>
    </>
  );
};

export default Home;
