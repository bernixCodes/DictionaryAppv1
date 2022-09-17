import React, { useState } from "react";
import logo from "../../assets/logo.jpg";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [input, SetInput] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    SetInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedWord = input.trim().toLowerCase();
    if (!trimmedWord || trimmedWord.split(" ").length > 1) return;
    navigate(`/search/${trimmedWord}`);
  };

  return (
    <div className={styles.homeContainer}>
      <img src={logo} alt="logo" />
      <p>Enter word to search and save for future reference</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.search}>
          <span className="material-icons-outlined">search</span>
          <input
            type="text"
            className={styles.searchInput}
            onChange={handleInput}
            value={input}
            placeholder="Enter word"
          />
        </div>
      </form>
      <div className={styles.bookmark}>
        <span className="material-icons-outlined">bookmark</span>
      </div>
    </div>
  );
}

export default Home;
