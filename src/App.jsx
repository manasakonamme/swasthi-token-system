import { useState } from "react";
import { db } from "./firebase";
import { doc, updateDoc, increment, getDoc, addDoc, collection } from "firebase/firestore";
import "./App.css";

function App() {

  const [name, setName] = useState("");
  const [token, setToken] = useState(null);

  const generateToken = async () => {

    const ref = doc(db, "tokens", "clinic");

    await updateDoc(ref, {
      currentToken: increment(1)
    });

    const snap = await getDoc(ref);
    const newToken = snap.data().currentToken;

    setToken(newToken);
    await addDoc(collection(db, "patients"), {
      name: name,
      token: newToken,
      createdAt: new Date()
    });   

  };
  return (
    <div className="container">

      {token === null ? (

        <div className="card">

          <div className="top-box">
            <div className="icon">👤</div>
            <p>PATIENT REGISTRATION</p>
          </div>

          <h1 className="title">Join the Queue</h1>

          <p className="subtitle">
            Welcome to Swasthi Health Consultants.  
            Please enter your full name to generate your token.
          </p>

          <label className="label">FULL NAME</label>

          <input
            className="input"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="info">
            By registering, you will get your token number. Please wait for your turn.
          </div>

          <button className="btn" onClick={generateToken}  disabled={!name.trim()}>
            Generate Token 🎟
          </button>

        </div>

      ) : (

        <div className="card confirm">

          <h2>Token Confirmation</h2>

          <h1 className="success">Token Generated Successfully</h1>

          <p>Swasthi Health Consultants</p>

          <div className="token-box">
            <p>YOUR TOKEN NUMBER IS</p>
            <h1>#{token}</h1>
          </div>

          <div className="name-card">
            <p>PATIENT NAME</p>
            <h2>{name}</h2>
          </div>

          <p className="doctor">
            This token is generated for  
            <strong> Dr. Shreerama KV</strong>
          </p>

        </div>

      )}

    </div>
  );
}
export default App;
