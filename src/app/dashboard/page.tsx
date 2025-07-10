import { FaChalkboardTeacher, FaUserFriends, FaChartLine, FaCog, FaBell, FaSignOutAlt } from "react-icons/fa";

export default function DashboardPage() {
  // Sample data
  const attendanceStats = [
    { class: "Grade 7A", present: 28, absent: 2, percentage: 93 },
    { class: "Grade 8B", present: 25, absent: 5, percentage: 83 },
    { class: "Grade 9C", present: 30, absent: 0, percentage: 100 },
    { class: "Grade 10D", present: 26, absent: 4, percentage: 87 },
  ];

  const recentActivity = [
    { student: "John Doe", class: "7A", status: "Late", time: "08:15 AM" },
    { student: "Sarah Smith", class: "8B", status: "Absent", time: "08:30 AM" },
    { student: "Mike Johnson", class: "9C", status: "Present", time: "08:05 AM" },
    { student: "Emily Davis", class: "10D", status: "Present", time: "08:10 AM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white min-h-screen p-4">
        <div className="flex items-center space-x-3 p-4 border-b border-indigo-700 pb-6">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FaChalkboardTeacher className="text-xl" />
          </div>
          <h2 className="text-xl font-bold">AcademyPlus</h2>
        </div>
        
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-3 p-3 bg-indigo-700 rounded-lg">
                <FaChalkboardTeacher />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 p-3 hover:bg-indigo-700 rounded-lg transition">
                <FaUserFriends />
                <span>Students</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 p-3 hover:bg-indigo-700 rounded-lg transition">
                <FaChartLine />
                <span>Reports</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 p-3 hover:bg-indigo-700 rounded-lg transition">
                <FaCog />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-indigo-700">
          <a href="#" className="flex items-center space-x-3 p-3 hover:bg-indigo-700 rounded-lg transition">
            <FaSignOutAlt />
            <span>Logout</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Attendance Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <FaBell className="text-xl" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="font-medium text-indigo-800">AD</span>
              </div>
              <span className="font-medium">Admin User</span>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-indigo-500">
            <h3 className="text-gray-600 text-sm mb-2">Total Students</h3>
            <p className="text-3xl font-bold">1,240</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
            <h3 className="text-gray-600 text-sm mb-2">Today's Attendance</h3>
            <p className="text-3xl font-bold">94%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
            <h3 className="text-gray-600 text-sm mb-2">Late Arrivals</h3>
            <p className="text-3xl font-bold">32</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-red-500">
            <h3 className="text-gray-600 text-sm mb-2">Absences</h3>
            <p className="text-3xl font-bold">18</p>
          </div>
        </div>

        {/* Class Attendance */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Class Attendance Today</h2>
            <button className="text-indigo-600 hover:text-indigo-800 font-medium">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="pb-4">Class</th>
                  <th className="pb-4">Present</th>
                  <th className="pb-4">Absent</th>
                  <th className="pb-4">Percentage</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceStats.map((stat, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="py-4 font-medium">{stat.class}</td>
                    <td className="py-4 text-green-600">{stat.present}</td>
                    <td className="py-4 text-red-600">{stat.absent}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-indigo-600 h-2.5 rounded-full" 
                            style={{ width: `${stat.percentage}%` }}
                          ></div>
                        </div>
                        <span>{stat.percentage}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-full mr-3 ${
                    activity.status === 'Present' ? 'bg-green-100 text-green-600' : 
                    activity.status === 'Absent' ? 'bg-red-100 text-red-600' : 
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {activity.status === 'Present' ? 'P' : activity.status === 'Absent' ? 'A' : 'L'}
                  </div>
                  <div>
                    <p className="font-medium">{activity.student}</p>
                    <p className="text-gray-600 text-sm">Class {activity.class} • {activity.time}</p>
                  </div>
                  <div className="ml-auto text-gray-500 text-sm">
                    Just now
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Attendance Overview</h2>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
          </div>
        </div>
      </div>
    </div>
  );
}