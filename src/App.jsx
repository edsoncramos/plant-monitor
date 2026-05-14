import { useState } from "react";
import "./App.css";

export default function App() {

  function obterTurno() {

    const hora = new Date().getHours();

    if (hora >= 5 && hora < 15) {
      return "Turno A";
    }

    if (hora >= 15 && hora < 24) {
      return "Turno B";
    }

    return "Turno C";

  }

  function classificarEvento(status) {

    if (status === "Funcionando") {
      return "Produção";
    }

    if (status === "Setup") {
      return "Setup";
    }

    if (status === "Manutenção") {
      return "Manutenção";
    }

    return "Parada";

  }

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

  ]);

  const [historico, setHistorico] = useState([]);

  function alterarStatus(id, novoStatus, novaCor) {

    const maquinaAtual = maquinas.find((m) => m.id === id);

    const agora = new Date();

    const evento = {

      maquina: maquinaAtual.nome,

      setor: maquinaAtual.setor,

      operador: "Edson",

      turno: obterTurno(),

      data: agora.toLocaleDateString(),

      hora: agora.toLocaleTimeString(),

      statusAnterior: maquinaAtual.status,

      novoStatus: novoStatus,

      tipo: classificarEvento(novoStatus),

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

      <h1 style={{ textAlign: "center" }}>
        Plant Monitor Industrial
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "18px",
        }}
      >
        Monitoramento produtivo com histórico para OEE
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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

        <h2>Histórico para OEE</h2>

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
                background: "#dddddd",
              }}
            >

              <th style={{ padding: "10px" }}>Máquina</th>

              <th style={{ padding: "10px" }}>Setor</th>

              <th style={{ padding: "10px" }}>Turno</th>

              <th style={{ padding: "10px" }}>Tipo</th>

              <th style={{ padding: "10px" }}>Anterior</th>

              <th style={{ padding: "10px" }}>Novo</th>

              <th style={{ padding: "10px" }}>Data</th>

              <th style={{ padding: "10px" }}>Hora</th>

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
                  {evento.turno}
                </td>

                <td style={{ padding: "10px" }}>
                  {evento.tipo}
                </td>

                <td style={{ padding: "10px" }}>
                  {evento.statusAnterior}
                </td>

                <td style={{ padding: "10px" }}>
                  {evento.novoStatus}
                </td>

                <td style={{ padding: "10px" }}>
                  {evento.data}
                </td>

                <td style={{ padding: "10px" }}>
                  {evento.hora}
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