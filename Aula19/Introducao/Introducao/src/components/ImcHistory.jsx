import Button from "./Button";
import "./ImcHistory.css";

const ImcHistory = ({ history, onBack }) => {
  return (
    <div className="container history-container">
      <h2>Histórico de cálculos</h2>

      {history.length === 0 ? (
        <p>Nenhum cálculo foi registrado ainda.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div className="history-item" key={item.id}>
              <h3>{item.name}</h3>

              <p>
                Gênero:{" "}
                <strong>
                  {item.gender === "masculino" ? "Masculino" : "Feminino"}
                </strong>
              </p>

              <p>
                IMC: <strong>{item.imc}</strong>
              </p>

              <p>
                Altura: <strong>{item.height} m</strong>
              </p>

              <p>
                Peso: <strong>{item.weight} kg</strong>
              </p>

              <p>
                Situação: <strong>{item.info}</strong>
              </p>
            </div>
          ))}
        </div>
      )}

      <Button id="back-btn" text="Voltar" action={onBack} />
    </div>
  );
};

export default ImcHistory;
