import { useState } from "react";

const useFetch = (fn) => {
  const [loading, setLoading] = useState(false); // Initialize loading to false
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = async (params) => {
    setLoading(true); // Set loading to true when the function is called
    setError(null);
    try {
      const result = await fn(params);
      // Handle both direct data responses and success-wrapped responses
      if (result?.success === false) {
        throw new Error(result?.message || "Operation failed");
      }
      setData(result);
      return result;
    } catch (err) {
      console.error("Error in useFetch:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false); // Ensure loading is set to false after execution
    }
  };

  return { loading, data, error, fn: execute };
};

export default useFetch;
