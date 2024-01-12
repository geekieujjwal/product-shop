import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
    console.log(name, email, password);
    try {
      const result = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      console.log(data);
      if (data) {
        navigate("/");
        localStorage.setItem("user", JSON.stringify(data));
        // localStorage.setItem("token", JSON.stringify(data.auth));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-[700px] flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">Register</h1>
      <div className="flex flex-col gap-6 min-w-[80%] sm:min-w-[40%]">
        <input
          type="text"
          className="border-2 border-black px-2 py-1"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="border-2 border-black px-2 py-1"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border-2 border-black px-2 py-1"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={collectData}
          className="bg-blue-500 px-3 py-2 font-bold text-white rounded-3xl border-[1px] border-black"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
