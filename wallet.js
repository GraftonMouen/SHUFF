let provider = null;
let userAddress = null;

document.getElementById("walletBtn").onclick = async () => {
  if ("solana" in window) {
    provider = window.solana;

    if (provider.isPhantom) {
      try {
        const res = await provider.connect();
        userAddress = res.publicKey.toString();
        alert("Connected to wallet: " + userAddress);
      } catch (err) {
        alert("Connection failed");
      }
    }
  } else {
    alert("Install Phantom Wallet");
  }
};
