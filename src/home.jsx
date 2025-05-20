import {React,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faCamera,
  faTriangleExclamation,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import "./home.css"; // Import the CSS file


function Home() {
    const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleMicClick = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      console.log("Listening...");
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      console.log("Transcript:", speechResult);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };
  return (
    <nav>
      <h1>Safe Lane</h1>
      <h4>Safe Navigation, Powered by You</h4>

      <div className="icons-large" onClick={handleMicClick}>
        <FontAwesomeIcon  icon={faMicrophone}className="mic"   />
      </div>
     {transcript && (
        <p style={{ marginTop: "20px", fontSize: "1rem", color: "#333" }}>
          You said: <strong>{transcript}</strong>
        </p>
      )}
      <div className="icons-row">
        <FontAwesomeIcon icon={faCamera} className="camera" />
        <FontAwesomeIcon icon={faTriangleExclamation} className="sos" />
        <FontAwesomeIcon icon={faQuestion} className="instructions" />
      </div>
    </nav>
  );
}

export default Home;
