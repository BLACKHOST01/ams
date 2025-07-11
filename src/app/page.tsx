import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <h1 className="text-2xl font-bold text-indigo-800">AcademyPlus</h1>
        </div>
        <div className="flex space-x-4">
          <Link href="/dashboard" className="text-indigo-700 hover:text-indigo-900 font-medium">
            Demo
          </Link>
          <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Admin Login
          </Link>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            <span className="text-indigo-600">Smart Attendance</span> Management System
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Revolutionize how your school tracks student attendance. Our AI-powered system provides real-time monitoring, 
            automated reports, and seamless integration with existing school platforms.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/register" 
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-center font-medium hover:bg-indigo-700 transition shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              href="/features" 
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-center font-medium hover:bg-indigo-50 transition"
            >
              View Features
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 md:h-96" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {title: "Real-time Tracking", desc: "Monitor attendance as it happens with live updates"},
              {title: "Automated Reports", desc: "Generate daily/weekly/monthly reports with one click"},
              {title: "Parent Portal", desc: "Instant notifications to parents about student attendance"},
              {title: "Biometric Integration", desc: "Support for fingerprint and facial recognition"},
              {title: "Classroom Analytics", desc: "Identify attendance patterns and trends"},
              {title: "Mobile App", desc: "Teachers can mark attendance from anywhere on campus"}
            ].map((feature, index) => (
              <div key={index} className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">AcademyPlus Attendance</h3>
              <p className="text-gray-400 mt-2">Streamlining school management since 2023</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                  <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© 2023 AcademyPlus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}