import React, { useState, useEffect } from 'react';

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check if Phantom is installed
  const isPhantomInstalled = () => {
    return window.solana && window.solana.isPhantom;
  };

  // Connect wallet handler
  const connectWallet = async () => {
    if (!isPhantomInstalled()) {
      setError('Phantom Wallet not found. Please install it first.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const { publicKey } = await window.solana.connect();
      setWalletAddress(publicKey.toString());
      localStorage.setItem('shuffWallet', publicKey.toString());
    } catch (err) {
      setError(`Connection failed: ${err.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  // Auto-connect on component mount
  useEffect(() => {
    if (isPhantomInstalled() && localStorage.getItem('shuffWallet')) {
      window.solana.connect({ onlyIfTrusted: true })
        .then(({ publicKey }) => {
          setWalletAddress(publicKey.toString());
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="wallet-connector">
      {error && (
        <div className="error-message">
          {error} <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer">Download Phantom</a>
        </div>
      )}

      <button
        onClick={connectWallet}
        disabled={isConnecting || walletAddress}
        className={`connect-button ${walletAddress ? 'connected' : ''}`}
      >
        {isConnecting ? (
          <>
            <span className="spinner"></span> Connecting...
          </>
        ) : walletAddress ? (
          `Connected: ${walletAddress.slice(0,4)}...${walletAddress.slice(-4)}`
        ) : (
          'Connect Phantom Wallet'
        )}
      </button>

      <style jsx>{`
        .wallet-connector {
          margin: 20px 0;
          text-align: center;
        }
        
        .error-message {
          color: #e74c3c;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .error-message a {
          color: #3498db;
          text-decoration: underline;
        }
        
        .connect-button {
          background: #3498db;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 200px;
        }
        
        .connect-button:hover:not(:disabled) {
          background: #2980b9;
        }
        
        .connect-button:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }
        
        .connect-button.connected {
          background: #2ecc71;
        }
        
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ConnectWallet;
