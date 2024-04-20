import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import AddProduct from "./AddProduct";
import Page from "./page"
import ReadProduct from "./ReadProduct";
import UpdateProduct from "./UpdateProduct";

function App() 
{
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Page />} />
        <Route path="/readproduct/:id" element={<ReadProduct />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
