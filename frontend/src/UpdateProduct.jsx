import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="w-2/3 mx-auto mt-5">
      <form onSubmit={handleSubmit}>
        <h1>Update User</h1>
        <div className="">
          <label className=" text-sm text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={inputProduct.name}
            onChange={handleChnage}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter Quantity "
            required
            value={inputProduct.quantity}
            onChange={handleChnage}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Price</label>
          <input
            type="number"
            name="price"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter Price "
            required
            value={inputProduct.price}
            onChange={handleChnage}
          />
        </div>

        <div className="flex justify-center my-4">
          <button type="submit" className="w-40 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold cursor-pointer">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
