import Button from "./Button";
import "./ImcTable.css";

const ImcTable = ({
  data,
  name,
  height,
  weight,
  gender,
  imc,
  info,
  infoClass,
  message,
  resetCalc,
  openHistory,
}) => {
  return (
    <div
      id="result-container"
      className={gender === "masculino" ? "theme-masculine" : "theme-feminine"}
    >
      <h2>Resultado</h2>

      <p id="imc-number">
        Seu IMC:
        <span className={infoClass}> {imc}</span>
      </p>

      <p id="imc-info">
        Situação atual:
        <span className={infoClass}> {info}</span>
      </p>

      <p>
        Olá, <strong>{name}</strong>!
      </p>

      <div className="result-details">
        <p>
          Altura: <strong>{height} m</strong>
        </p>

        <p>
          Peso: <strong>{weight} kg</strong>
        </p>
      </div>

      <div className="result-message">
        <h3>Mensagem</h3>

        <p>{message}</p>
      </div>

      <div className="complementary-info">
        <h3>Informação complementar</h3>

        <p>
          Esta tela apresenta o valor calculado, a classificação correspondente
          e os dados utilizados no cálculo.
        </p>
      </div>

      <h3>Confira as classificações:</h3>

      <div id="imc-table">
        <div className="table-header">
          <h4>IMC</h4>
          <h4>Classificação</h4>
          <h4>Obesidade</h4>
        </div>

        {data.map((item) => (
          <div className="table-data" key={item.info}>
            <p>{item.classification}</p>
            <p>{item.info}</p>
            <p>{item.obesity}</p>
          </div>
        ))}
      </div>

      <div id="result-actions">
        <Button id="back-btn" text="Novo cálculo" action={resetCalc} />

        <Button id="history-btn" text="Histórico" action={openHistory} />
      </div>
    </div>
  );
};

export default ImcTable;
