import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
        onClick={onCancel}
      ></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md mx-auto my-6 animate-slide-up">
        <div className="relative flex flex-col w-full bg-white rounded-xl shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center p-6 border-b border-gray-200">
            <AlertTriangle className="h-8 w-8 text-yellow-500 mr-4" />
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          </div>
          
          {/* Body */}
          <div className="relative p-6">
            <p className="text-gray-600 text-base leading-relaxed">
              {message}
            </p>
          </div>
          
          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;