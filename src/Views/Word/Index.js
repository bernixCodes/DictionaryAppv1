import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import TabComponent from "../../component/Tab/Index";

function Word() {
  const [wordDefinition, setWordDefinition] = useState([]);

  const navigate = useNavigate();
  let { word } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchWordMeanings = async () => {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setWordDefinition(response.data);
      console.log(response.data);
    };
    fetchWordMeanings();
  }, [word]);

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
                <span className="material-icons-outlined audio">volume_up</span>
              </div>
            </div>
          </div>

          {wordDefinition.map((item, index) => {
            return (
              <>
                <div key={index} className="definition-container">
                  {item?.meanings?.map((meaning, idx) => (
                    <div key={idx}>
                      {console.log(meaning.partOfSpeech)}
                      <h5>{meaning.partOfSpeech}</h5>
                      {meaning.definitions.map((def, i) => {
                        return (
                          <div>
                            {i + 1}. {def.definition}
                          </div>
                        );
                      })}
                      {meaning.synonyms.map((synonym, i) => (
                        <div key={i}>
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
