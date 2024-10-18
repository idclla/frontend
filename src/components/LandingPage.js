import React, { useState, useEffect } from 'react';
import LCCBImage from './img/LCCB.png';

const LandingPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [days, setDays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dateFiled, setDateFiled] = useState(''); // Date Filed
  const [dateOfEvent, setDateOfEvent] = useState(''); // Date of Event

  // Get the current month and year
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  useEffect(() => {
    const daysInMonth = getDaysInMonth(currentDate.getMonth(), year);
    const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();

    // Create an array to store the day numbers
    const daysArray = [];

    // Fill empty slots for the previous month's days
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push('');
    }

    // Fill the array with day numbers
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setDays(daysArray);
  }, [currentDate, year]);

  // Handler to go to the previous month
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  // Handler to go to the next month
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  // Handler for when a day is clicked
  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day);
      setDateFiled(`${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`); // Set Date Filed
      setDateOfEvent(`${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`); // Set Date of Event
      setIsModalOpen(true);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
    setDateFiled('');
    setDateOfEvent('');
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process form data here
    console.log('Form submitted');
    handleCloseModal(); // Close the modal after submission
  };

  // Format the time
  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white border-b md:border-r flex flex-col items-center py-10">
        <img
          src={LCCBImage}
          alt="Logo"
          className="h-24 mb-10"
        />
        <nav className="text-gray-600 font-medium">
          <ul>
            <li className="mb-5 text-2xl">Calendar</li>
            <li className="mb-5 text-2xl">Events</li>
            <li className="mb-5 text-2xl">Logout</li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white relative">
        <header className="text-3xl font-bold p-10">Calendar</header>

        {/* Real-time Clock */}
        <div className="absolute top-0 right-0 mt-4 mr-4 bg-gray-100 p-2 rounded-lg shadow-lg text-lg font-semibold">
          {formatTime(currentTime)}
        </div>

        {/* Custom Calendar */}
        <div className="mx-4 md:mx-10 bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col h-auto">
          {/* Month and year header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handlePreviousMonth}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Previous
            </button>
            <div className="text-lg font-bold">
              {month} {year}
            </div>
            <button
              onClick={handleNextMonth}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Next
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-2 text-center font-bold">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-2 text-center mt-4 flex-grow">
            {days.map((day, index) => (
              <div
                key={index}
                className={`bg-white rounded shadow flex items-center justify-center ${day ? 'border' : ''}`}
                style={{ height: '105px', cursor: day ? 'pointer' : 'default' }}
                onClick={() => handleDayClick(day)} // Handle day click
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">Booking Form for {month} {selectedDay}, {year}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              
              {/* Left Side */}
              <div>
                <div className="mb-4">
                  <label className="block font-medium">Address to (Serving Dept/Office/Unit):</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Purpose of the Request:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Facility to Use:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Booking Specifications:</label>
                  <textarea
                    className="w-full border border-gray-300 p-2 rounded"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Requested by:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Approved by:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
              </div>

              {/* Right Side */}
              <div>
                <div className="mb-4">
                  <label className="block font-medium">Date Filed:</label>
                  <input
                    type="date"
                    value={dateFiled} // Set value from state
                    onChange={(e) => setDateFiled(e.target.value)} // Update state on change
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Date of Event:</label>
                  <input
                    type="date"
                    value={dateOfEvent} // Set value from state
                    onChange={(e) => setDateOfEvent(e.target.value)} // Update state on change
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Start Time:</label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">End Time:</label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">No. of Participants:</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Noted by:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Date Accomplished:</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Received and to be accomplished by:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Approved by (VPGS and School President):</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
