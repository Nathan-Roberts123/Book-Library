import { FiBookOpen, FiShield, FiCloud } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-50 to-white border-r p-14 flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <FiBookOpen className="text-blue-600 text-3xl" />
            <h1 className="text-3xl font-bold text-gray-900">Book Library</h1>
          </div>

          {/* Heading */}
          <div className="mt-20">
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              Create Your Account
            </h2>

            <p className="mt-6 text-2xl text-gray-600 leading-relaxed max-w-md">
              Join Book Library and start organizing and managing your book
              collection effortlessly.
            </p>
          </div>
        </div>

        {/* Features */}
        <div>
          <Feature
            icon={<FiBookOpen />}
            title="Organize Your Books"
            subtitle="Add, edit and keep your collection up to date."
            bg="bg-blue-100"
            color="text-blue-600"
          />

          <Feature
            icon={<FiShield />}
            title="Secure & Private"
            subtitle="Your data is safe and secure with us."
            bg="bg-green-100"
            color="text-green-600"
          />

          <Feature
            icon={<FiCloud />}
            title="Access Anywhere"
            subtitle="Manage your library from any device."
            bg="bg-purple-100"
            color="text-purple-600"
          />

          <div className="mt-10 text-lg">
            <span className="text-gray-600">Already have an account?</span>

            <button
              onClick={() => navigate("/auth/signin")}
              className="ml-3 text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
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
