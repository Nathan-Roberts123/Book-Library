import { FiBookOpen, FiShield, FiCloud } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import SiginInForm from "../../components/auth/SiginInForm";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="">
      {/* Left Side */}

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-lg border w-full max-w-2xl p-14">
          <h2 className="text-5xl font-bold text-gray-900">
            Sign in to your account
          </h2>

          <p className="mt-4 text-xl text-gray-500">
            Welcome back! Please enter your details.
          </p>

          <SiginInForm />

          {/* Divider */}
          <div className="flex items-center my-10">
            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="px-5 text-gray-500">Or continue with</span>

            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google */}
          <button className="w-full h-16 border rounded-xl hover:bg-gray-50 flex items-center justify-center gap-4 text-xl font-medium">
            <FcGoogle size={28} />
            Sign in with Google
          </button>

          {/* Bottom */}
          <p className="text-center mt-10 text-gray-600 text-lg">
            Don't have an account?
            <button
              onClick={() => navigate("/auth/signup")}
              className="ml-2 text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, subtitle, bg, color }) {
  return (
    <div className="flex items-start gap-5">
      <div
        className={`${bg} ${color} w-14 h-14 rounded-xl flex items-center justify-center text-2xl`}
      >
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>

        <p className="text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
