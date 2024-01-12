import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params);
    getData();
  }, []);

  const getData = async () => {
    const result = await fetch(`http://localhost:3000/update/${params.id}`);
    const data = await result.json();
    setName(data.name);
    setPrice(data.price);
    setCategory(data.category);
    setCompany(data.company);
  };

  const handleUpdate = async () => {
    const result = await fetch(`http://localhost:3000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (data) {
      navigate("/");
    }
  };

  return (
    <div className="w-screen h-[80vh] flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">Update Product</h1>
      <div className="flex flex-col gap-6 min-w-[80%] sm:min-w-[40%]">
        <input
          type="text"
          className="border-2 border-blue-700 px-2 py-1"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter product name"
        />
        <input
          type="number"
          className="border-2 border-blue-700 px-2 py-1"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder="Enter product price"
        />
        <input
          type="text"
          className="border-2 border-blue-700 px-2 py-1"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          placeholder="Enter category"
        />
        <input
          type="text"
          className="border-2 border-blue-700 px-2 py-1"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
          placeholder="Enter company"
        />
        <button
          type="submit"
          onClick={handleUpdate}
          className="bg-blue-500 px-3 py-2 font-bold text-white rounded-3xl border-[1px] border-black"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
