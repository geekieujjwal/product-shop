import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(email, password);
    const result = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    console.log(data);
    if (data.auth) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.auth));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  return (
    //
    <div className="w-screen h-[700px] flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">LOGIN</h1>
      <div className="flex flex-col gap-6 min-w-[80%] sm:min-w-[40%]">
        <input
          type="email"
          className="border-2 border-black px-2 py-1"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter Email"
        />
        <input
          type="password"
          className="border-2 border-black px-2 py-1"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter Password"
        />
        <button
          type="submit"
          onClick={handleLogin}
          className="bg-blue-500 px-3 py-2 font-bold text-white rounded-3xl border-[1px] border-black"
        >
          Submit
        </button>
      </div>
    </div>
    //
  );
};

export default Login;
