import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const result = await fetch("http://localhost:3000/products");
    const data = await result.json();
    setProducts(data);
  };

  const deleteButton = async (_id) => {
    const result = await fetch(`http://localhost:3000/product/${_id}`, {
      method: "DELETE",
    });
    const data = await result.json();
    if (data) {
      getProducts();
    } else {
      alert("something failed at delete button");
    }
  };

  const searchHandle = async (e) => {
    const key = e.target.value;
    if (key) {
      const result = await fetch(`http://localhost:3000/search/${key}`);
      const data = await result.json();
      if (data) {
        setProducts(data);
      }
    } else {
      getProducts();
    }
  };

  return (
    //
    <div className="p-3 flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-5">Product List</h1>
      <input
        className="border-2 border-black outline-none rounded-lg px-2 py-1 mb-6 w-[275px]"
        type="text"
        onChange={searchHandle}
        placeholder="Search Product..."
      />
      <ul className="flex ">
        <li className="border-[1px] border-blue-700 px-5 py-1 w-[150px]">
          S No.
        </li>
        <li className="border-[1px] border-blue-700 px-5 py-1 w-[150px]">
          Name
        </li>
        <li className="border-[1px] border-blue-700 px-5 py-1 w-[150px]">
          Price
        </li>
        <li className="border-[1px] border-blue-700 px-5 py-1 w-[150px]">
          Category
        </li>
        <li className="border-[1px] border-blue-700 px-5 py-1 w-[150px]">
          Operation
        </li>
      </ul>
      {products.length ? (
        products.map(({ name, price, category, _id }, i) => {
          return (
            <ul className="flex " key={_id}>
              <li className="border-[1px] border-blue-700 px-5 py-1 w-[150px]">
                {i + 1}
              </li>
              <li className="border-[1px] border-blue-700 px-5 py-1 w-[150px]">
                {name}
              </li>
              <li className="border-[1px] border-blue-700 px-5 py-1 w-[150px]">
                ₹ {price}
              </li>
              <li className="border-[1px] border-blue-700 px-5 py-1 w-[150px]">
                {category}
              </li>
              <li className="flex gap-2 justify-center border-[1px] border-blue-700 px-5 py-1 w-[150px]">
                <button
                  onClick={() => deleteButton(_id)}
                  className="border-[1px] border-black px-2 bg-gray-300 rounded-md"
                >
                  Delete
                </button>
                <Link to={`/update/${_id}`} className="text-sky-500 underline">
                  Update
                </Link>
              </li>
            </ul>
          );
        })
      ) : (
        <h2 className="text-3xl font-bold mt-4">No Product Found</h2>
      )}
    </div>
    //
  );
};

export default ProductList;
