import React, { useState } from 'react';

const BankNoteClassifier = () => {
  const [formData, setFormData] = useState({
    variance: '',
    skewness: '',
    curtosis: '',
    entropy: ''
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      // Validate inputs are numbers
      const numericData = {
        variance: parseFloat(formData.variance),
        skewness: parseFloat(formData.skewness),
        curtosis: parseFloat(formData.curtosis),
        entropy: parseFloat(formData.entropy)
      };

      // Check if all inputs are valid numbers
      if (Object.values(numericData).some(isNaN)) {
        setError('Please enter valid numeric values for all fields');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(numericData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-2xl mt-12">
    <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Bank Note Classifier</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {['variance', 'skewness', 'curtosis', 'entropy'].map((field) => (
        <div key={field} className="mb-4">
          <label 
            htmlFor={field} 
            className="block text-xl font-semibold text-gray-700 capitalize mb-2"
          >
            {field}
          </label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Enter ${field}`}
          />
        </div>
      ))}
      
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-4 px-6 text-xl rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-lg"
      >
        Predict Bank Note
      </button>
    </form>

    {error && (
      <div className="mt-6 p-5 bg-red-100 text-red-700 text-lg rounded-xl text-center">
        {error}
      </div>
    )}

    {prediction && (
      <div className="mt-6 p-5 bg-green-100 text-green-800 text-xl rounded-xl text-center font-bold">
        Prediction: {prediction}
      </div>
    )}
  </div>
  );
};

export default BankNoteClassifier;
