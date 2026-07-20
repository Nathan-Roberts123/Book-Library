import {
  BookOpen,
  Image,
  Search,
  Shield,
  Info,
  Database,
  Cloud,
  FileCode2,
  Braces,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <BookOpen size={30} />,
      title: "Manage Books",
      description:
        "Add, edit, delete and view books in your collection with ease.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Image size={30} />,
      title: "Cover Images",
      description:
        "Upload book cover images to Amazon S3 and view them seamlessly.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Search size={30} />,
      title: "Quick Search",
      description:
        "Search and sort your books by title, author or publication year.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Shield size={30} />,
      title: "Secure & Reliable",
      description:
        "Built with modern technologies to keep your data safe and accessible.",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const technologies = [
    {
      icon: <Braces size={30} />,
      title: ".NET 8",
      subtitle: "Backend API",
      color: "text-violet-600",
    },
    {
      icon: <FileCode2 size={30} />,
      title: "Entity Framework Core",
      subtitle: "ORM",
      color: "text-purple-600",
    },
    {
      icon: <Cloud size={30} />,
      title: "Amazon S3",
      subtitle: "Storage",
      color: "text-green-600",
    },
    {
      icon: <Database size={30} />,
      title: "SQL Server",
      subtitle: "Database",
      color: "text-red-500",
    },
    {
      icon: <BookOpen size={30} />,
      title: "Swagger",
      subtitle: "API Documentation",
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-slate-900">
            About Book Library
          </h1>

          <p className="text-xl text-slate-500 mt-3">
            A simple and elegant way to manage your book collection.
          </p>
        </div>

        {/* Hero */}
        <div className="bg-white rounded-2xl shadow-sm border p-10 mb-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Welcome to Book Library
              </h2>

              <p className="text-lg text-slate-600 leading-8 mb-5">
                Book Library is a lightweight web application that helps you
                organize, manage and explore your personal book collection.
              </p>

              <p className="text-lg text-slate-600 leading-8">
                You can add new books, upload cover images, update details and
                keep your library neatly organized.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}

        <h2 className="text-3xl font-bold mb-6">Features</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border rounded-2xl p-7 shadow-sm hover:shadow-md transition"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${feature.color}`}
              >
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mt-6">{feature.title}</h3>

              <p className="text-slate-500 mt-4 leading-8">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technologies */}

        <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>

        <div className="bg-white border rounded-2xl shadow-sm p-8 mb-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {technologies.map((tech) => (
              <div key={tech.title} className="flex items-center gap-4">
                <div className={tech.color}>{tech.icon}</div>

                <div>
                  <h3 className="font-semibold text-lg">{tech.title}</h3>

                  <p className="text-slate-500 text-sm">{tech.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Version */}

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4">
          <Info className="text-blue-600 mt-1" size={28} />

          <div>
            <h3 className="font-bold text-xl">Version 1.0.0</h3>

            <p className="text-slate-600 mt-2">
              Thank you for using Book Library! Happy reading!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
