import React, { useState, useEffect } from 'react';

// -------------------------
// Header Component with Navigation
// -------------------------
const Header = ({ onSelectReport }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Logo must be placed in the public folder or imported */}
        {/* <img src="/ClassReport.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
        <h1 className="text-xl font-bold">Student Class Report</h1>
      </div>
      <nav className="dropdown-container relative">
        <button 
          className="focus:outline-none bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          onClick={toggleDropdown}
        >
          Reports {showDropdown ? '↑' : '↓'}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded">
            <button 
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => { onSelectReport('daily'); setShowDropdown(false); }}
            >
              Daily Report
            </button>
            <button 
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => { onSelectReport('monthly'); setShowDropdown(false); }}
            >
              Monthly Report
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

// -------------------------
// Daily Report Components
// -------------------------

// DailyReportFilter Component: allows filtering by date
const DailyReportFilter = ({ onFilter }) => {
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(date);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 mb-1" htmlFor="date">Select Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button 
          type="submit" 
          className="mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </div>
    </form>
  );
};

// DailyReportDataDisplay Component: displays attendance data for the selected day
const DailyReportDataDisplay = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Teacher</th>
            <th className="px-4 py-2 border-b">Paper Code</th>
            <th className="px-4 py-2 border-b">Subject</th>
            <th className="px-4 py-2 border-b">Present</th>
            <th className="px-4 py-2 border-b">Absent</th>
            <th className="px-4 py-2 border-b">Attendance (%)</th>
            <th className="px-4 py-2 border-b">Performance</th>
            <th className="px-4 py-2 border-b">Comments</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="px-4 py-2 border-b">{item.date}</td>
              <td className="px-4 py-2 border-b">{item.teacher}</td>
              <td className="px-4 py-2 border-b">{item.paperCode}</td>
              <td className="px-4 py-2 border-b">{item.subject}</td>
              <td className="px-4 py-2 border-b">{item.presentCount}</td>
              <td className="px-4 py-2 border-b">{item.absentCount}</td>
              <td className="px-4 py-2 border-b">{item.attendancePercent}%</td>
              <td className="px-4 py-2 border-b">{item.performance}</td>
              <td className="px-4 py-2 border-b">{item.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// DailyReport Component: fetches daily attendance data
const DailyReport = () => {
  const [dailyData, setDailyData] = useState([]);

  const handleFilter = async (selectedDate) => {
    console.log('Filtering daily data for:', selectedDate);
    try {
      // Fetch data from the backend API endpoint. Adjust the URL and parameters as needed.
      const response = await fetch(`/api/attendance/daily?date=${selectedDate}`);
      if (!response.ok) throw new Error('Failed to fetch daily attendance');
      const data = await response.json();
      setDailyData(data);
    } catch (error) {
      console.error('Error fetching daily data:', error);
    }
  };

  return (
    <section className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Daily Report</h2>
      <DailyReportFilter onFilter={handleFilter} />
      <DailyReportDataDisplay data={dailyData} />
    </section>
  );
};

// -------------------------
// Monthly Report Components
// -------------------------

// MonthlyReportFilter Component: allows filtering by month
const MonthlyReportFilter = ({ onFilter }) => {
  const [month, setMonth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(month);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 mb-1" htmlFor="month">Select Month</label>
          <input
            id="month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button 
          type="submit" 
          className="mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </div>
    </form>
  );
};

// MonthlyReportDataDisplay Component: displays aggregated attendance data
const MonthlyReportDataDisplay = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Month</th>
            <th className="px-4 py-2 border-b">Teacher</th>
            <th className="px-4 py-2 border-b">Paper Code</th>
            <th className="px-4 py-2 border-b">Subject</th>
            <th className="px-4 py-2 border-b">Present</th>
            <th className="px-4 py-2 border-b">Absent</th>
            <th className="px-4 py-2 border-b">Attendance (%)</th>
            <th className="px-4 py-2 border-b">Avg. Performance</th>
            <th className="px-4 py-2 border-b">Comments</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="px-4 py-2 border-b">{item.month}</td>
              <td className="px-4 py-2 border-b">{item.teacher}</td>
              <td className="px-4 py-2 border-b">{item.paperCode}</td>
              <td className="px-4 py-2 border-b">{item.subject}</td>
              <td className="px-4 py-2 border-b">{item.presentCount}</td>
              <td className="px-4 py-2 border-b">{item.absentCount}</td>
              <td className="px-4 py-2 border-b">{item.attendancePercent}%</td>
              <td className="px-4 py-2 border-b">{item.avgPerformance}</td>
              <td className="px-4 py-2 border-b">{item.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// MonthlyReport Component: fetches monthly attendance data
const MonthlyReport = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  const handleFilter = async (selectedMonth) => {
    console.log('Filtering monthly data for:', selectedMonth);
    try {
      // Adjust the endpoint URL and query parameter as needed.
      const response = await fetch(`/api/attendance/monthly?month=${selectedMonth}`);
      if (!response.ok) throw new Error('Failed to fetch monthly attendance');
      const data = await response.json();
      setMonthlyData(data);
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  return (
    <section className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Monthly Report</h2>
      <MonthlyReportFilter onFilter={handleFilter} />
      <MonthlyReportDataDisplay data={monthlyData} />
    </section>
  );
};

// -------------------------
// Main Application Component
// -------------------------
const ClassReportApp = () => {
  const [reportType, setReportType] = useState('daily'); // default view

  return (
    <div className="container mx-auto p-4">
      <Header onSelectReport={setReportType} />
      <main>
        {reportType === 'daily' ? <DailyReport /> : <MonthlyReport />}
      </main>
    </div>
  );
};

export default ClassReportApp;
