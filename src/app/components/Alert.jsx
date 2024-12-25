import React from 'react';

function Alert({ status, message, emp }) {
  return (
    <div className={`mt-6 ${status === 200 ? 'text-green-600' : 'text-red-600'}`}>
    {emp && <p className="mt-1 text-1xl">รหัสพนักงาน: {emp}</p>}
      {status === 200 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-32 mx-auto" // Significantly increased size to 32
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-32 mx-auto" // Significantly increased size to 32
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      <p className="mt-1 text-2xl font-bold">{message}</p>
    </div>
  );
}

export default Alert;
