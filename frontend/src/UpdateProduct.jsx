import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const UpdateProduct = () => {
  const [inputProduct, setInputProduct] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const { id } = useParams();
  // data fetching single
  const fetchSingleProduct = async () => {
    const res = await axios.get(`http://localhost:5000/read/${id}`);
    console.log(res);
    setInputProduct({
      name: res.data.name,
      quantity: res.data.quantity,
      price: res.data.price,
    });
  };
  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const handleChnage = (event) => {
    setInputProduct({
      ...inputProduct,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputProduct);
    const res = await axios.put(
      `http://localhost:5000/updateproduct/${id}`,
      inputProduct
    );
    console.log(res);
    if (res.status === 200) {
      window.location = "/home";
    }
    // fetchAllUser();
  };
  return (
    <>
    <Header/>
    <div class="container mx-auto my-8 text-center">
    <h1 class="text-3xl font-semibold mb-6 ">Update Product</h1>
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

        <div className="flex justify-center my-8">
          <button type="submit" className="text-xl w-48 h-12 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold cursor-pointer">
          Update Product
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default UpdateProduct;
