import { useUser } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { walletAddress, setWalletAddress } = useUser();
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const connectWallet = async () => {
    if ((window as any)?.ethereum) {
      try {
        const accounts = await (window as any)?.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (err) {
        alert('Wallet connection failed!');
      }
    } else {
      alert('MetaMask is not installed!');
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">
        Charity DApp
      </div>

      {/* Wallet Connect Section */}
      <div>
        {walletAddress ? (
          <span className="px-5 py-2 bg-gray-100 text-blue-800 rounded font-mono border border-blue-200">
            {walletAddress}
          </span>
        ) : (
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
            onClick={connectWallet}
          >
            Connect With Wallet
          </button>
        )}
          <button
            className={`${isLoggedIn ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} ml-5 px-5 py-2 text-white rounded  transition font-medium`}
            onClick={isLoggedIn ? logout : () => navigate("/auth")}
          >
            {isLoggedIn ? "Logout" : "SignIn"}
          </button>
      </div>
    </header>
  )
}

export default Header