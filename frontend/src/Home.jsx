import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import { FaPen, FaTrash } from 'react-icons/fa';

const Home = () => 
{
  const [productData, setproductData] = useState([]);

  const fetchAllProduct = async () => 
  {
    const res = await axios.get("http://localhost:5000/readallproduct");
    console.log(res);
    setproductData(res.data);
  };

  useEffect(() => 
  {
    fetchAllProduct();
  }, []);

  const handleDelete = async (id) => 
  {
    const res = await axios.delete(`http://localhost:5000/delete/${id}`);
    if (res.status === 200)
    {
      fetchAllProduct();
    }
  };

  function formatDate(timestamp) {
    if (!timestamp) return ''; // Handle case where timestamp is not available
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  }

  return(
    <>
      <Header />
        <div className="container mx-auto my-4 flex items-center justify-end">
          <NavLink
            to="/add-product"
            className="text-xl w-47 h-12 bg-purple-500 hover:bg-purple-600 text-black px-4 py-2 rounded-lg shadow-md font-semibold cursor-pointer"
          >
            + Add Product
          </NavLink>
        </div>
        <div className="container my-8 mx-auto">
        <div className="overflow-auto max-h-[500px]">
          <table className="text-center table-center w-full">
            <thead className="sticky top-0 bg-purple-500 bg-opacity-100 text-black">
              <tr>
                <th className="px-4 py-3 border-2 border-gray-700">Sr No.</th>
                <th className="px-4 py-3 border-2 border-gray-700">Name</th>
                <th className="px-4 py-3 border-2 border-gray-700">Arrival Date</th>
                <th className="px-4 py-3 border-2 border-gray-700">Quantity</th>
                <th className="px-4 py-3 border-2 border-gray-700">Price</th>
                <th className="px-4 py-3 border-2 border-gray-700">Total Price</th> 
                <th className="px-4 py-3 border-2 border-gray-700">Image</th>
                <th className="px-4 py-3 border-2 border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((item, i) => (
                <tr key={item._id}>
                  <td className="px-4 py-3 border-2 border-gray-700 font-semibold">{i + 1}</td>
                  <td className="px-4 py-3 border-2 border-gray-700 font-semibold">{item?.name}</td>
                  <td className="px-4 py-3 border-2 border-gray-700 font-semibold">{formatDate(item?.createdAt)}</td>
                  <td className="px-4 py-3 border-2 border-gray-700 font-semibold">{item?.quantity}</td>
                  <td className="px-4 py-3 border-2 border-gray-700 font-semibold">{item?.price}</td>
                  <td className="px-4 py-3 border-2 border-gray-700 font-semibold">{item?.quantity * item?.price}</td> 
                  <td className="px-4 py-3 border-2 border-gray-700 font-semibold">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {item?.imageUrl && <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.name} className="w-40 h-40 object-cover" />}
                  </div>
                  </td>
                  <td className="px-4 py-3 border-2 border-gray-700">
                    <div className="flex gap-x-4 justify-center">
                      <NavLink
                        to={`/updateproduct/${item._id}`}
                        className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                      >
                        <FaPen />
                      </NavLink>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="font-medium text-red-500  hover:underline"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    </>
  );
};

export default Home;
