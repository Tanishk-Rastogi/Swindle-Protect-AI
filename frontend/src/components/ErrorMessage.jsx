function ErrorMessage({
  message = "Something went wrong",
}) {

  return (

    <div className="border border-red-300 bg-red-100 rounded-lg p-4">

      <p className="text-red-700">

        {message}

      </p>

    </div>

  );
}

export default ErrorMessage;