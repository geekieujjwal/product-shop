import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const result = await fetch("http://localhost:3000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    console.log(data);
  };

  return (
    <div className="w-screen h-[80vh] flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">Add Product</h1>
      <div className="flex flex-col gap-6 min-w-[80%] sm:min-w-[40%]">
        <input
          type="text"
          className="border-2 border-blue-700 px-2 py-1"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter product name"
        />
        {error && !name && (
          <span className="mt-[-20px] text-red-500">Enter valid Name</span>
        )}
        <input
          type="number"
          className="border-2 border-blue-700 px-2 py-1"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder="Enter product price"
        />
        {error && !price && (
          <span className="mt-[-20px] text-red-500">Enter valid Price</span>
        )}
        <input
          type="text"
          className="border-2 border-blue-700 px-2 py-1"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          placeholder="Enter category"
        />
        {error && !category && (
          <span className="mt-[-20px] text-red-500">Enter valid Cateogory</span>
        )}
        <input
          type="text"
          className="border-2 border-blue-700 px-2 py-1"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
          placeholder="Enter company"
        />
        {error && !company && (
          <span className="mt-[-20px] text-red-500">Enter valid Company</span>
        )}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 px-3 py-2 font-bold text-white rounded-3xl border-[1px] border-black"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
