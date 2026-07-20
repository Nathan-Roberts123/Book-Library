import { FiBookOpen, FiShield, FiCloud } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg border p-10">
          <h2 className="text-5xl font-bold text-gray-900">
            Create your account
          </h2>

          <p className="text-xl text-gray-500 mt-3">
            Fill in the details below to get started.
          </p>

          <SignUpForm />

          {/* Divider */}
          <div className="flex items-center my-10">
            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="px-5 text-gray-500">Or sign up with</span>

            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google */}
          <button className="w-full h-16 border rounded-xl flex justify-center items-center gap-4 hover:bg-gray-50 text-xl font-medium">
            <FcGoogle size={30} />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, subtitle, bg, color }) {
  return (
    <div className="flex gap-5 items-start mb-8">
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
