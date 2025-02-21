import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    college_email: "",
    college_roll_number: "",
    input: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    const formattedInput = formData.input.split(",").map((item) => item.trim());

    const payload = {
      ...formData,
      input: formattedInput,
    };

    try {
      const res = await fetch("https://bhavdeepsingh.onrender.com/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.is_success) {
        throw new Error(data.message || "API request failed");
      }

      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl mb-4 text-center font-semibold">
          Submit Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="dob"
            placeholder="Date of Birth (DDMMYYYY)"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="college_email"
            placeholder="College Email"
            value={formData.college_email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="college_roll_number"
            placeholder="College Roll Number"
            value={formData.college_roll_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="input"
            placeholder="Enter values (comma separated)"
            value={formData.input}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {response && (
          <div className="mt-6 p-4 bg-gray-50 rounded shadow">
            <h3 className="text-lg font-semibold">Response</h3>
            <pre className="text-sm mt-2 bg-gray-200 p-2 rounded">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
