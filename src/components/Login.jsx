import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, isAuthentication, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  useEffect(() => {
    if (isAuthentication) navigate("/bookmarks", { replace: true });
  }, [isAuthentication, navigate]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="px-4">
      <div className="bg-oxfordBlue-900 h-[calc(100vh_-_80px)] rounded-3xl flex items-center justify-center w-full px-4">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-center capitalize md:text-lg xl:text-xl font-thin mb-4 tracking-widest sm:mb-6 lg:mb-8">
            login
          </h2>

          <form
            action=""
            className="capitalize w-full max-w-md flex flex-col gap-y-3 mb-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-y-1.5">
              <label
                className="text-casper-400 text-xs sm:text-sm"
                htmlFor="email"
                ref={emailRef}
              >
                email :
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                required
                className="bg-shark-950 py-1 px-4 rounded-full focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-y-1.5 mb-4">
              <label
                className="text-casper-400 text-xs sm:text-sm"
                htmlFor="password"
              >
                password :
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                required
                className="bg-shark-950 py-1 px-4 rounded-full focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full text-center capitalize bg-saffron-300 text-oxfordBlue-900 font-bold shadow-md py-1.5 rounded-full text-sm sm:text-base"
            >
              login
            </button>
          </form>
          <p className="text-gray-600 text-sm">
            Email : user@gmail.com ; Password : 1234
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
