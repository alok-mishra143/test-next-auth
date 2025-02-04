"use client";

import React from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-red-800 p-6">
      <div className=" shadow-lg rounded-lg p-6 max-w-md text-center border border-red-400">
        <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-lg">{error.message}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
