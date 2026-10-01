import Button from "./Button";
import "./ImcCalc.css";
import { useState } from "react";

const ImcCalc = ({ calcImc, openHistory }) => {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");

  const clearForm = (e) => {
    e.preventDefault();

    setName("");
    setHeight("");
    setWeight("");
    setGender("");
  };

  const validDigits = (text) => {
    return text.replace(/[^0-9,]/g, "");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleHeightChange = (e) => {
    const updatedValue = validDigits(e.target.value);
    setHeight(updatedValue);
  };

  const handleWeightChange = (e) => {
    const updatedValue = validDigits(e.target.value);
    setWeight(updatedValue);
  };

  return (
    <div id="calc-container">
      <h2>Calculadora de IMC</h2>

      <form id="imc-form">
        <div className="form-inputs">
          <div className="form-control">
            <label htmlFor="name">Nome</label>

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Digite seu nome"
              onChange={handleNameChange}
              value={name}
            />
          </div>

          <div className="form-control">
            <label htmlFor="height">Altura</label>

            <input
              type="text"
              name="height"
              id="height"
              placeholder="Exemplo 1,75"
              onChange={handleHeightChange}
              value={height}
            />
          </div>

          <div className="form-control">
            <label htmlFor="weight">Peso</label>

            <input
              type="text"
              name="weight"
              id="weight"
              placeholder="Exemplo 70,5"
              onChange={handleWeightChange}
              value={weight}
            />
          </div>
        </div>

        <div className="gender-control">
          <label>Gênero</label>

          <div className="gender-buttons">
            <button
              type="button"
              className={
                gender === "masculino" ? "gender-selected masculine" : ""
              }
              onClick={() => setGender("masculino")}
            >
              Masculino
            </button>

            <button
              type="button"
              className={
                gender === "feminino" ? "gender-selected feminine" : ""
              }
              onClick={() => setGender("feminino")}
            >
              Feminino
            </button>
          </div>
        </div>

        <div className="action-control">
          <Button
            id="calc-btn"
            text="Calcular"
            action={(e) => calcImc(e, name, height, weight, gender)}
          />

          <Button id="clear-btn" text="Limpar" action={clearForm} />
        </div>

        <Button id="history-btn" text="Ver histórico" action={openHistory} />
      </form>
    </div>
  );
};

export default ImcCalc;
