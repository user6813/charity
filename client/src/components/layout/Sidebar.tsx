import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="bg-gray-100 h-full min-h-screen flex flex-col p-6 w-full max-w-xs">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
        onClick={() => navigate('/dashboard')}
      >
        Home
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
        onClick={() => navigate('/campaigns')}
      >
        Campaign
      </button>
    </aside>
  );
};

export default Sidebar;
