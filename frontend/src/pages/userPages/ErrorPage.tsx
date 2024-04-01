

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl mb-4">Oops! The page you are looking for could not be found.</p>
        <a href="/" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Go back to Home</a>
      </div>
    </div>
  );
}
