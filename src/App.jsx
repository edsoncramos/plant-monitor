import { useState } from "react";
import "./App.css";

export default function App() {

  const [maquinas, setMaquinas] = useState([

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
      nome: "11200.200 - Máquina Laser",
      setor: "CORTE",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 4,
      nome: "11300.319 - Hidráulica Yucel 800T",
      setor: "ESTAMPAGEM",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 5,
      nome: "11300.320 - Hidráulica Yucel 600T",
      setor: "ESTAMPAGEM",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 6,
      nome: "11400.401 - Dobradeira Newton PDM-2025-1",
      setor: "DOBRA",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 7,
      nome: "11500.501 - Solda Apes-1",
      setor: "SOLDA",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 8,
      nome: "11600.601 - Acabamento Apes DRX-1",
      setor: "LIXA/ACABAMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 9,
      nome: "11700.701 - Aglomerado",
      setor: "REVESTIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 10,
      nome: "11800.801 - Embaladeira Projepack",
      setor: "EMBALAGEM",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 11,
      nome: "11900.903 - Robô 01",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 12,
      nome: "11900.904 - Robô 02",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

    {
      id: 13,
      nome: "11900.905 - Robô 03",
      setor: "POLIMENTO",
      status: "Funcionando",
      cor: "green",
    },

  ]);

  const [historico, setHistorico] = useState([]);

  function alterarStatus(id, novoStatus, novaCor) {

    const maquinaAtual = maquinas.find((m) => m.id === id);

    const evento = {

      maquina: maquinaAtual.nome,

      setor: maquinaAtual.setor,

      statusAnterior: maquinaAtual.status,

      novoStatus: novoStatus,

      dataHora: new Date().toLocaleString(),

      operador: "Edson",

    };

    setHistorico((prev) => [evento, ...prev]);

    const novasMaquinas = maquinas.map((maquina) => {

      if (maquina.id === id) {

        return {

          ...maquina,

          status: novoStatus,

          cor: novaCor,

        };

      }

      return maquina;

    });

    setMaquinas(novasMaquinas);

  }

  return (

    <div
      style={{
        padding: "30px",
        background: "#f0f2f5",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Plant Monitor
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "18px",
        }}
      >
        Controle manual de funcionamento dos equipamentos
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >

        {maquinas.map((maquina) => (

          <div
            key={maquina.id}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >

            <h2>{maquina.nome}</h2>

            <p>
              <strong>Setor:</strong> {maquina.setor}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >

              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: maquina.cor,
                }}
              />

              <strong>{maquina.status}</strong>

            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >

              <button
                onClick={() =>
                  alterarStatus(
                    maquina.id,
                    "Funcionando",
                    "green"
                  )
                }
              >
                Funcionando
              </button>

              <button
                onClick={() =>
                  alterarStatus(
                    maquina.id,
                    "Parado",
                    "red"
                  )
                }
              >
                Parado
              </button>

              <button
                onClick={() =>
                  alterarStatus(
                    maquina.id,
                    "Setup",
                    "orange"
                  )
                }
              >
                Setup
              </button>

              <button
                onClick={() =>
                  alterarStatus(
                    maquina.id,
                    "Manutenção",
                    "blue"
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
          marginTop: "50px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >

        <h2>Histórico de Eventos</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >

          <thead>

            <tr
              style={{
                background: "#eaeaea",
              }}
            >

              <th style={{ padding: "10px" }}>Máquina</th>

              <th style={{ padding: "10px" }}>Setor</th>

              <th style={{ padding: "10px" }}>Status Anterior</th>

              <th style={{ padding: "10px" }}>Novo Status</th>

              <th style={{ padding: "10px" }}>Data/Hora</th>

              <th style={{ padding: "10px" }}>Operador</th>

            </tr>

          </thead>

          <tbody>

            {historico.map((evento, index) => (

              <tr key={index}>

                <td style={{ padding: "10px" }}>
                  {evento.maquina}
                </td>

                <td style={{ padding: "10px" }}>
                  {evento.setor}
                </td>

                <td style={{ padding: "10px" }}>
                  {evento.statusAnterior}
                </td>

                <td style={{ padding: "10px" }}>
                  {evento.novoStatus}
                </td>

                <td style={{ padding: "10px" }}>
                  {evento.dataHora}
                </td>

                <td style={{ padding: "10px" }}>
                  {evento.operador}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}