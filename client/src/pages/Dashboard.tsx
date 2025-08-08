import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
 const { walletAddress } = useUser();

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }
    alert(`Donated ${amount} with message: "${message}"`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">Donate to Charity</h1>
      <form
        onSubmit={handleDonate}
        className="bg-white shadow-lg rounded p-8 w-full max-w-md flex flex-col space-y-4"
      >
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Amount (ETH)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter amount"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Message (optional)</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write a message..."
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
        >
          Donate
        </button>
      </form>
    </div>
  );
};

export default Dashboard;