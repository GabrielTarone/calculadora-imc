import "./App.css";
import ImcCalc from "./components/ImcCalc";
import ImcTable from "./components/ImcTable";
import ImcHistory from "./components/ImcHistory";
import { data } from "./data/data";
import { useEffect, useState } from "react";

function App() {
  const [imc, setImc] = useState("");
  const [info, setInfo] = useState("");
  const [infoClass, setInfoClass] = useState("");
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [message, setMessage] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [gender, setGender] = useState("");

  // Carrega o histórico salvo no navegador
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("imcHistory");

    if (savedHistory) {
      return JSON.parse(savedHistory);
    }

    return [];
  });

  // Salva o histórico sempre que ele for alterado
  useEffect(() => {
    localStorage.setItem("imcHistory", JSON.stringify(history));
  }, [history]);

  const getMessage = (classification) => {
    switch (classification) {
      case "Magreza":
        return "Seu resultado está abaixo da faixa classificada como normal nesta calculadora.";

      case "Normal":
        return "Seu resultado está dentro da faixa classificada como normal nesta calculadora.";

      case "Sobrepeso":
        return "Seu resultado está acima da faixa classificada como normal nesta calculadora.";

      case "Obesidade":
        return "Seu resultado está na faixa classificada como obesidade nesta calculadora.";

      case "Obesidade grave":
        return "Seu resultado está na faixa classificada como obesidade grave nesta calculadora.";

      default:
        return "";
    }
  };

  const calcImc = (e, nameValue, heightValue, weightValue, genderValue) => {
    e.preventDefault();

    const cleanName = nameValue.trim();

    if (!cleanName || !heightValue || !weightValue || !genderValue) {
      alert("Preencha nome, altura, peso e selecione o gênero.");
      return;
    }

    const weightFloat = +weightValue.replace(",", ".");
    const heightFloat = +heightValue.replace(",", ".");

    if (!Number.isFinite(weightFloat) || !Number.isFinite(heightFloat)) {
      return;
    }

    if (weightFloat <= 0 || heightFloat <= 0) {
      return;
    }

    const imcNumber = weightFloat / (heightFloat * heightFloat);
    const imcResult = imcNumber.toFixed(1);

    const resultData = data.find(
      (item) => imcResult >= item.min && imcResult <= item.max,
    );

    if (!resultData) return;

    const resultMessage = getMessage(resultData.info);

    setName(cleanName);
    setHeight(heightValue);
    setWeight(weightValue);
    setImc(imcResult);
    setInfo(resultData.info);
    setInfoClass(resultData.infoclass);
    setMessage(resultMessage);
    setGender(genderValue);

    // Cria um novo registro para o histórico
    const newRecord = {
      id: Date.now(),
      name: cleanName,
      height: heightValue,
      weight: weightValue,
      imc: imcResult,
      info: resultData.info,
      message: resultMessage,
      gender: genderValue,
    };

    setHistory((previousHistory) => [newRecord, ...previousHistory]);
  };

  const resetCalc = (e) => {
    e.preventDefault();

    setImc("");
    setInfo("");
    setInfoClass("");
    setName("");
    setHeight("");
    setWeight("");
    setMessage("");
    setGender("");
  };

  const openHistory = (e) => {
    e.preventDefault();
    setShowHistory(true);
  };

  const closeHistory = (e) => {
    e.preventDefault();
    setShowHistory(false);
  };

  // Se showHistory for true, mostra a tela de histórico
  if (showHistory) {
    return <ImcHistory history={history} onBack={closeHistory} />;
  }

  return (
    <div className="container">
      {!imc ? (
        <ImcCalc calcImc={calcImc} openHistory={openHistory} />
      ) : (
        <ImcTable
          data={data}
          name={name}
          height={height}
          weight={weight}
          gender={gender}
          imc={imc}
          info={info}
          infoClass={infoClass}
          message={message}
          resetCalc={resetCalc}
          openHistory={openHistory}
        />
      )}
    </div>
  );
}

export default App;
