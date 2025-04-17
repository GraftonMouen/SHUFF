import React, { useEffect, useState } from 'react';

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  // Check if Phantom is installed
  const isPhantomInstalled = () => {
    return window.solana && window.solana.isPhantom;
  };

  // Connect to wallet
  const connectWallet = async () => {
    if (isPhantomInstalled()) {
      try {
        const { publicKey } = await window.solana.connect();
        setWalletAddress(publicKey.toString());
      } catch (err) {
        console.error('Wallet connection error:', err);
      }
    } else {
      alert('Phantom Wallet not found. Please install it from https://phantom.app/');
    }
  };

  // Auto-connect if user already approved access
  useEffect(() => {
    if (isPhantomInstalled()) {
      window.solana.connect({ onlyIfTrusted: true })
        .then(({ publicKey }) => {
          setWalletAddress(publicKey.toString());
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <button
        onClick={connectWallet}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition duration-200"
      >
        {walletAddress ? `Connected: ${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect Phantom Wallet'}
      </button>
    </div>
  );
};

export default ConnectWallet;
