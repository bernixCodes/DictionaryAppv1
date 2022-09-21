import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Index";

function Word() {
  const [wordDefinition, setWordDefinition] = useState([]);
  const [exist, SetExist] = useState(true);
  const [audio, SetAudio] = useState(null);

  const navigate = useNavigate();
  let { word } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchWordMeanings = async () => {
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        setWordDefinition(response.data);
        const phonetics = response.data[0].phonetics;
        if (!phonetics[0].audio) return;
        const url = phonetics[0].audio;
        SetAudio(new Audio(url));
        // console.log(response.data);
      } catch (error) {
        SetExist(false);
      }
    };
    fetchWordMeanings();
  }, [word]);

  if (!exist) {
    return (
      <div className="not-found">
        <p>Word not found.</p>
        <button onClick={goBack} className="backBtn">
          Go back
        </button>
      </div>
    );
  }
  if (!wordDefinition.length) return <Loader />;
  return (
    <>
      <div className="container">
        <div className="word-container">
          <div className="word-nav">
            <span
              className="material-icons-outlined back-arrow"
              onClick={goBack}
            >
              arrow_back
            </span>
            <span className="material-icons-outlined">bookmark_border</span>
          </div>

          <div className="word-details">
            <div>
              <h3>{word}</h3>
              <div className="pronounce">
                <p>{`${wordDefinition[0]?.phonetic}`}</p>
                {audio && (
                  <span
                    className="material-icons-outlined audio"
                    onClick={() => audio.play()}
                  >
                    volume_up
                  </span>
                )}
              </div>
            </div>
          </div>

          {wordDefinition.map((item, index) => {
            return (
              <>
                <div key={index} className="definition-container">
                  {item?.meanings?.map((meaning, idx) => (
                    <div key={idx} className="def-speech">
                      {/* {console.log(meaning.partOfSpeech)} */}
                      <h3
                        style={{
                          marginBottom: "10px",
                          textTransform: "capitalize",
                        }}
                      >
                        {meaning.partOfSpeech}
                      </h3>
                      {meaning.definitions.map((def, i) => {
                        return (
                          <div>
                            {i + 1}. {def.definition}
                          </div>
                        );
                      })}
                      {meaning?.synonyms.length > 0 && (
                        <h4 style={{ marginTop: "10px" }}>Synonyms</h4>
                      )}
                      {meaning.synonyms.map((synonym, i) => (
                        <div key={i} className="synonym">
                          <p>{synonym}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Word;
