// import React from 'react'
// import { useSnackbar } from './contexts/SnackbarContext'; // Assuming this is your custom hook for snackbar context
import { useSnackbarContext } from '@/contexts/SnackbarContext'


export default function Snackbar() {
  const { snackbar, openSnackbar } = useSnackbarContext(); // Assuming this hook returns an object with the snackbar data and a function to open the snackbar

  const { message, type, ...snackbarData } = snackbar; // Destructuring the snackbar data

  function closeSnackBar() {
    openSnackbar({ open: false }); // Calling the openSnackbar function with the 'open' property false to close the snackbar
  }

  return (
    snackbarData.open && (
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center px-4 py-3 border rounded shadow-lg bg-white ${type === 'success' ? 'border-green-400 text-green-700' : type === 'error' ? 'border-red-400 text-red-700' : 'border-gray-400 text-gray-700'}`}
        role="alert"
        aria-describedby="message-id"
        onClick={closeSnackBar}
      >
        <div className="flex-1">
          <p id="message-id" className="text-sm">{message}</p>
        </div>
        <button onClick={closeSnackBar} className="ml-4 text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    )
  )
}
