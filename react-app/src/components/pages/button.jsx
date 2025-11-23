import React from "react";

const Button = ({ text, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 rounded-lg transition ${
        disabled
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white`}
    >
      {text}
    </button>
  );
};

export default Button;
