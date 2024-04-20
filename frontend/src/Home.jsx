import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import { FaPen, FaTrash } from 'react-icons/fa';

const Home = () => 
{
  const [inputUser, setInputUser] = useState(
  {
    name: "",
    quantity: "",
    price: "",
  });

  const [productData, setproductData] = useState([]);

  const fetchAllUser = async () => 
  {
    const res = await axios.get("http://localhost:5000/readallproduct");
    console.log(res);
    setproductData(res.data);
  };

  useEffect(() => 
  {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => 
  {
    const res = await axios.delete(`http://localhost:5000/delete/${id}`);
    if (res.status === 200)
    {
      fetchAllUser();
    }
  };

  return(
    <>
      <Header />
        <div className="container mx-auto my-8 flex items-center justify-end">
          <NavLink
            to="/add-product"
            className="text-xl w-48 h-12 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold cursor-pointer"
          >
            +Add Product
          </NavLink>
        </div>
        <div className="container my-8 mx-auto">
          <table className="text-center table-center w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-800 text-white">Sr No.</th>
                <th className="px-4 py-2 bg-gray-800 text-white">Name</th>
                <th className="px-4 py-2 bg-gray-800 text-white">Quantity</th>
                <th className="px-4 py-2 bg-gray-800 text-white">Price</th>
                <th className="px-4 py-2 bg-gray-800 text-white">Total Price</th> 
                <th className="px-4 py-2 bg-gray-800 text-white">Image</th>
                <th className="px-4 py-2 bg-gray-800 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((item, i) => (
                <tr key={item._id}> {/* Added key prop */}
                  <td className="border px-4 py-2">{i + 1}</td>
                  <td className="border px-4 py-2">{item?.name}</td>
                  <td className="border px-4 py-2">{item?.quantity}</td>
                  <td className="border px-4 py-2">{item?.price}</td>
                  <td className="border px-4 py-2">{item?.quantity * item?.price}</td> 
                  <td className="border px-4 py-2">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {item?.imageUrl && <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.name} className="w-40 h-40 object-cover" />}
                  </div>
                  </td>
                  <td className="border px-4 py-2">
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
    </>
  );
};

export default Home;
