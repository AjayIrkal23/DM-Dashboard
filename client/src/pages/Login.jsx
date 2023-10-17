import React, { useContext, useState } from "react";
import { AccountContext } from "../context/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { mainData, user, setUser } = useContext(AccountContext);

  console.log(user);

  const loginDets = {
    username: "admin",
    password: "admin123",
  };
  const [see, setSee] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  console.log(username, password);
  console.log(user);

  const handleSubmit = () => {
    if (username == loginDets.username && password == loginDets.password) {
      setUser("admin");
      toast.success("Login Success");
      navigate("/");
    } else {
      toast.success("Incorrect Login Details");
    }
  };
  return (
    <div className="md:bg-[rgb(245,245,245)] w-screen h-screen bg-[#1ae4b2]">
      <div className="flex w-full h-full md:flex-row flex-col md:px-0 px-1">
        <div className="bg-[#1ae4b2] flex-[0.4] md:pt-32 pt-16  md:inline-block hidden">
          <div className=" w-[300px] bg-white/40 h-[500px] border  shadow-black/30 md:ml-auto mx-auto md:mx-0 justify-center items-center flex flex-col shadow-lg  border-r-0">
            <img
              src="/jsw.png"
              alt=""
              className="w-[250px] h-[150px] bg-white rounded-md p-5 mb-4"
            />
            <div className=" text-center">
              <p className="font-semibold text-lg">DM Dashboard</p>
              <p className="text-sm text-gray-600">CKPI & MKPI Analytics</p>
            </div>

            <div className=" italic my-4 font-semibold">
              <p>Welcome Back</p>
            </div>
          </div>
        </div>
        <div className="md:bg-[white] flex-[0.6] md:pt-32 pt-16">
          <div className=" md:w-[550px] bg-white md:h-[500px] h-[450px]   border  shadow-black/30 md:mr-auto mx-auto md:mx-0 justify-center items-center flex flex-col shadow-lg border-l-0">
            <div className=" text-center mb-6">
              <img
                src="/jsw.png"
                alt=""
                className="w-[80px] md:hidden h-[40px] mb-5 mx-auto mt-4 rounded-md "
              />
              <p className="font-semibold text-lg">Log In </p>
              <p className="text-sm text-gray-600 italic">
                Please Login To Continue
              </p>
            </div>

            <div className=" italic h-[300px] w-full px-12 flex flex-col gap-6">
              <div className="flex flex-col gap-1 ">
                <div className="font-semibold">
                  <h1>Email :</h1>
                </div>
                <div className="ml-2">
                  <input
                    type="text"
                    placeholder="Username"
                    className="md:w-[398px] w-full border rounded-md shadow-md border-black/30 py-1 px-3 outline-none text-gray-600 text-sm placeholder:text-gray-600 placeholder:text-sm placeholder:italic"
                    onChange={(e) => setUsername(e.target.value)}
                    name=""
                    id=""
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 ">
                <div className="font-semibold">
                  <h1>Password :</h1>
                </div>
                <div className="ml-2 relative">
                  <input
                    type={see ? "text" : "password"}
                    placeholder="Password"
                    className="md:w-[398px] w-full border rounded-md shadow-md border-black/30 py-1 px-3 outline-none text-gray-600 text-sm placeholder:text-gray-600 placeholder:text-sm placeholder:italic"
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id=""
                  />
                  <div
                    className="absolute top-[25%] md:right-[60px] right-3"
                    onMouseDown={() => setSee(true)}
                    onMouseUp={() => setSee(false)}
                  >
                    {see ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 cursor-pointer text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 cursor-pointer text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-xs underline text-end md:w-[398px] w-full px-4 my-1 hover:text-black cursor-pointer">
                  Forgot Password ?
                </p>
              </div>
              <div className="flex flex-col gap-1 ">
                <button
                  className="bg-[#1ae4b2] md:w-[398px] w-full px-3 py-1.5 text-sm font-semibold text-black rounded-md shadow-md shadow-black/20  "
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
