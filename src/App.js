import "./App.css";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [searchtext, setSearchtext] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "RGAPI-6709223a-4bf4-4f59-ab83-ddff38c1f2b3";

  function searchPlayer(event) {
    var APICall =
      "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      searchtext +
      "?api_key=" +
      API_KEY;

    axios
      .get(APICall)
      .then(function (response) {
        setPlayerData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <div className="container">
        <h5>League of Legends Player Tracker</h5>
        <input
          type="text"
          placeholder="Summoner Name"
          onChange={(e) => setSearchtext(e.target.value)}
        />
        <button onClick={(e) => searchPlayer(e)}>Search</button>
      </div>
      {JSON.stringify(playerData) != "{}" ? (
        <>
          <p>{playerData.name}</p>
          <img
            width="100px"
            height="100px"
            src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${playerData.profileIconId}.png`}
          />
          <p>Summoner Level: {playerData.summonerLevel}</p>
        </>
      ) : (
        <>
          <p>{playerData.name ? playerData.name : "Player not found"}</p>
        </>
      )}
    </div>
  );
}

export default App;
