import "./App.css";
import { useState, useEffect } from "react";

function App() {

  const maquinasIniciais = [
    {
      id: 1,
      nome: "11100.101 - Corte blank mesa - PR",
      setor: "CORTE",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 2,
      nome: "11100.102 - Corte blank cuba - PR",
      setor: "CORTE",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 3,
      nome: "11100.103 - Corte Blank Calha - PR",
      setor: "CORTE",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 4,
      nome: "11200.200 - Máquina Laser",
      setor: "CORTE",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 5,
      nome: "11200.201 - Laser LXSHOW - 6000W",
      setor: "CORTE",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 6,
      nome: "11300.319 - Hidráulica Yucel 800T",
      setor: "ESTAMPAGEM",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 7,
      nome: "11300.320 - Hidráulica Yucel 600T",
      setor: "ESTAMPAGEM",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 8,
      nome: "11300.321 - Hidráulica Yucel 200T",
      setor: "ESTAMPAGEM",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 9,
      nome: "11400.401 - Dobradeira Newton PDM-2025-1",
      setor: "DOBRA",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 10,
      nome: "11400.402 - Dobradeira Newton PDM-2025-2",
      setor: "DOBRA",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 11,
      nome: "11500.501 - Solda Apes-1",
      setor: "SOLDA",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 12,
      nome: "11500.502 - Solda Apes DRX-2",
      setor: "SOLDA",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 13,
      nome: "11600.601 - Acabamento Apes DRX-1",
      setor: "LIXA/ACABAMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 14,
      nome: "11600.602 - Acabamento Lucson -1",
      setor: "LIXA/ACABAMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 15,
      nome: "11700.701 - Aglomerado",
      setor: "REVESTIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 16,
      nome: "11700.702 - Cola/Montagem",
      setor: "REVESTIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 17,
      nome: "11800.801 - Embaladeira Projepack",
      setor: "EMBALAGEM",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 18,
      nome: "11800.802 - Embaladeira Pack",
      setor: "EMBALAGEM",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 19,
      nome: "11900.901 - Polimento Motores",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 20,
      nome: "11900.902 - Polimento Lucson",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 21,
      nome: "11900.903 - Robô 01",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 22,
      nome: "11900.904 - Robô 02",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 23,
      nome: "11900.905 - Robô 03",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 24,
      nome: "11900.906 - Robô 04",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 25,
      nome: "11900.907 - Robô 05",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 26,
      nome: "11900.908 - Robô 06",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 27,
      nome: "11900.909 - Robô 07",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 28,
      nome: "11900.910 - Robô 08",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 29,
      nome: "11900.911 - Robô 09",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 30,
      nome: "11900.912 - Robô 10",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 31,
      nome: "11900.913 - Robô 11",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 32,
      nome: "11900.914 - Robô 12",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 33,
      nome: "11900.915 - Robô 13",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 34,
      nome: "11900.916 - Robô 14",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 35,
      nome: "11900.925 - Lavadora de Cubas",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 36,
      nome: "11900.926 - Altametal 40T",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 37,
      nome: "11900.927 - Jiangsu 40T",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },
  ];

  const [maquinas, setMaquinas] = useState(() => {
    const dadosSalvos = localStorage.getItem("maquinas");
    return dadosSalvos
      ? JSON.parse(dadosSalvos)
      : maquinasIniciais;
  });

  const [historico, setHistorico] = useState(() => {
    const historicoSalvo = localStorage.getItem("historico");
    return historicoSalvo
      ? JSON.parse(historicoSalvo)
      : [];
  });

  useEffect(() => {
    localStorage.setItem("maquinas", JSON.stringify(maquinas));
  }, [maquinas]);

  useEffect(() => {
    localStorage.setItem("historico", JSON.stringify(historico));
  }, [historico]);

  const alterarStatus = (id, novoStatus, novaCor) => {

    const maquinaAtual = maquinas.find((maq) => maq.id === id);

    const novasMaquinas = maquinas.map((maq) =>
      maq.id === id
        ? { ...maq, status: novoStatus, cor: novaCor }
        : maq
    );

    setMaquinas(novasMaquinas);

    const novoEvento = {
      maquina: maquinaAtual.nome,
      setor: maquinaAtual.setor,
      statusAnterior: maquinaAtual.status,
      novoStatus: novoStatus,
      operador: "Edson",
      dataHora: new Date().toLocaleString("pt-BR"),
    };

    setHistorico((prev) => [
      novoEvento,
      ...prev,
    ]);
  };

  return (
    <div className="container">

      <h1>Plant Monitor</h1>

      <p className="subtitulo">
        Controle manual de funcionamento dos equipamentos
      </p>

      <div className="grid">

        {maquinas.map((maq) => (

          <div className="card" key={maq.id}>

            <h2>{maq.nome}</h2>

            <p>
              <strong>Setor:</strong> {maq.setor}
            </p>

            <p
              className="status"
              style={{ color: maq.cor }}
            >
              ● {maq.status}
            </p>

            <div className="botoes">

              <button
                className="funcionando"
                onClick={() =>
                  alterarStatus(
                    maq.id,
                    "Funcionando",
                    "green"
                  )
                }
              >
                Funcionando
              </button>

              <button
                className="parado"
                onClick={() =>
                  alterarStatus(
                    maq.id,
                    "Parado",
                    "red"
                  )
                }
              >
                Parado
              </button>

              <button
                className="setup"
                onClick={() =>
                  alterarStatus(
                    maq.id,
                    "Setup",
                    "orange"
                  )
                }
              >
                Setup
              </button>

              <button
                className="manutencao"
                onClick={() =>
                  alterarStatus(
                    maq.id,
                    "Manutenção",
                    "gray"
                  )
                }
              >
                Manutenção
              </button>

            </div>

          </div>

        ))}

      </div>

      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Histórico de Eventos
        </h2>

        <div style={{ overflowX: "auto" }}>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>

              <tr
                style={{
                  background: "#f1f1f1",
                }}
              >
                <th>Máquina</th>
                <th>Setor</th>
                <th>Status Anterior</th>
                <th>Novo Status</th>
                <th>Data/Hora</th>
                <th>Operador</th>
              </tr>

            </thead>

            <tbody>

              {historico.map((evento, index) => (

                <tr key={index}>

                  <td>{evento.maquina}</td>
                  <td>{evento.setor}</td>
                  <td>{evento.statusAnterior}</td>
                  <td>{evento.novoStatus}</td>
                  <td>{evento.dataHora}</td>
                  <td>{evento.operador}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default App;