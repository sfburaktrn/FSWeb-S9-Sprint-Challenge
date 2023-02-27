import React, { useState } from "react";
import axios from "axios";
// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const [userKonum, setUserKonum] = useState([2, 2]);
  const [userMove, setUserMove] = useState(0);
  const [mesaj, setMesaj] = useState("");
  const [mail, setMail] = useState("");

  const bPrimeLocation = (userKonum[1] - 1) * 3 + userKonum[0] - 1;

  function moveRight() {
    if (userKonum[0] < 3) {
      setUserKonum([userKonum[0] + 1, userKonum[1]]);
      setUserMove(userMove + 1);
    } else {
      setMesaj("sağa gidemezsin");
    }
  }

  function moveLeft() {
    if (userKonum[0] > 1) {
      setUserKonum([userKonum[0] - 1, userKonum[1]]);
      setUserMove(userMove + 1);
    } else {
      setMesaj("sola gidemezsin.");
    }
  }

  function moveDown() {
    if (userKonum[1] < 3) {
      setUserKonum([userKonum[0], userKonum[1] + 1]);
      setUserMove(userMove + 1);
    } else {
      setMesaj("aşağı gidemezsin");
    }
  }
  function moveUp() {
    if (userKonum[1] > 1) {
      setUserKonum([userKonum[0], userKonum[1] - 1]);
      setUserMove(userMove + 1);
    } else {
      setMesaj("yukarı gidemezsin");
    }
  }

  function reset() {
    setUserKonum([2, 2]);
    setUserMove(0);
    setMesaj("");
    setMail("");
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  const userSubmit = (event) => {
    event.preventDefault();

    const pushla = {
      x: konum[0],
      y: konum[1],
      steps: userMove,
      email: mail,
    };
    console.log(pushla);
    axios
      .post("http://localhost:9000/api/result", pushla)
      .then((res) => {
        console.log(res.data);
        reset();
      })
      .catch((error) => {
        console.log("Hata", error);
      });
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({userKonum.join(",")})</h3>
        <h3 id="steps">{userMove} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === bPrimeLocation ? " active" : ""}`}
          >
            {idx === bPrimeLocation ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{mesaj}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={moveLeft}>
          SOL
        </button>
        <button id="up" onClick={moveUp}>
          YUKARI
        </button>
        <button id="right" onClick={moveRight}>
          SAĞ
        </button>
        <button id="down" onClick={moveDown}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={userSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
