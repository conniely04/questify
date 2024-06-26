import React, { useState } from "react";
import "./JoinBubble.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

export default function JoinBubble() {
  const [bubbleCode, setBubbleCode] = useState(""); // State to store the input value
  const nav = useNavigate();

  const handleChange = (event) => {
    setBubbleCode(event.target.value); // Update bubbleCode state with input value
  };
  const handleReturn = () => {
    // Handle returning to user home
    console.log("Returning to user home");

    // Clear bubbleCode and reset isCodeGenerated state
    //setIsCodeGenerated(false);
    nav(-1);
  };

  const handleSubmit = async (event) => {
    // Handle form submission, e.g., send bubbleCode to backend
    console.log("Bubble code submitted:", bubbleCode);
    const userId = localStorage.getItem("userId");

    let url = `http://localhost:5002/api/friend-groups/bubble-code/${bubbleCode}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Successfully got friend groups", result);

        if (result._id) {
          const url2 = `http://localhost:5002/api/friend-groups/join`;
          try {
            const response2 = await fetch(url2, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                groupId: result._id,
                userId: userId,
              }),
            });

            if (response2.ok) {
              console.log("Successfully joined group");
              toast.success("Successfully joined group");
              nav("/user-home");
            }
          } catch (error) {
            console.error("Error joining group:", error);
            toast.error("Failed to join group");
          }
        } else {
          toast.error("Already in group");
          throw new Error("No match with friend group");
        }
      } else {
        toast.error("Already in group");
        throw new Error("No match with friend group");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setBubbleCode("");
  };

  return (
    <div>
      <div>
        <h1>🔗Join Bubble🔗</h1>
      </div>
      <div>
        <div className="join-bubble-card">
          <h2>Enter your Friend's Bubble Code</h2>
          <input
            className="bubble-code-input"
            type="text"
            value={bubbleCode}
            onChange={handleChange}
            placeholder="Enter code"
          />
        </div>
        <br></br>
        <br></br>
        <div className="spacing-between">
          <button className="returnbutton" onClick={handleReturn}>
            Return Home
          </button>
          <button className="joinbutton" onClick={handleSubmit}>
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}
