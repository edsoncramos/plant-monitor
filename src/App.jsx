import { useState } from "react"

export default function App() {

  const [maquinas, setMaquinas] = useState([

    { id: 1, nome: "11100.101 - Corte blank mesa - PR", setor: "CORTE", status: "Funcionando", cor: "green" },
    { id: 2, nome: "11100.102 - Corte blank cuba - PR", setor: "CORTE", status: "Funcionando", cor: "green" },
    { id: 3, nome: "11100.103 - Corte Blank Calha - PR", setor: "CORTE", status: "Funcionando", cor: "green" },
    { id: 4, nome: "11200.200 - Máquina Laser", setor: "CORTE", status: "Funcionando", cor: "green" },
    { id: 5, nome: "11200.201 - Laser LXSHOW - 6000W", setor: "CORTE", status: "Funcionando", cor: "green" },

    { id: 6, nome: "11300.319 - Hidráulica Yucel 800T", setor: "ESTAMPAGEM", status: "Funcionando", cor: "green" },
    { id: 7, nome: "11300.320 - Hidráulica Yucel 600T", setor: "ESTAMPAGEM", status: "Funcionando", cor: "green" },
    { id: 8, nome: "11300.321 - Hidráulica Yucel 200T", setor: "ESTAMPAGEM", status: "Funcionando", cor: "green" },
    { id: 9, nome: "11300.301 - Hidráulica Schuller 500T", setor: "ESTAMPAGEM", status: "Funcionando", cor: "green" },
    { id: 10, nome: "11300.305 - Hidráulica Dan-Press 100 - 1", setor: "ESTAMPAGEM", status: "Funcionando", cor: "green" },

    { id: 11, nome: "11400.401 - Dobradeira Newton PDM-2025-1", setor: "DOBRA", status: "Funcionando", cor: "green" },
    { id: 12, nome: "11400.402 - Dobradeira Newton PDM-2025-2", setor: "DOBRA", status: "Funcionando", cor: "green" },
    { id: 13, nome: "11400.403 - Dobradeira Newton PDM-2025-5", setor: "DOBRA", status: "Funcionando", cor: "green" },

    { id: 14, nome: "11500.501 - Solda Apes-1", setor: "SOLDA", status: "Funcionando", cor: "green" },
    { id: 15, nome: "11500.502 - Solda Apes DRX-2", setor: "SOLDA", status: "Funcionando", cor: "green" },

    { id: 16, nome: "11600.601 - Acabamento Apes DRX-1", setor: "LIXA/ACABAMENTO", status: "Funcionando", cor: "green" },
    { id: 17, nome: "11600.602 - Acabamento Lucson-1", setor: "LIXA/ACABAMENTO", status: "Funcionando", cor: "green" },

    { id: 18, nome: "12200.201 - Excêntrica Walviwg 25T", setor: "TANQUES", status: "Funcionando", cor: "green" },
    { id: 19, nome: "12200.202 - Excêntrica Jundiaí 40T", setor: "TANQUES", status: "Funcionando", cor: "green" },

    { id: 20, nome: "11700.701 - Aglomerado", setor: "REVESTIMENTO", status: "Funcionando", cor: "green" },
    { id: 21, nome: "11700.702 - Cola/Montagem", setor: "REVESTIMENTO", status: "Funcionando", cor: "green" },

    { id: 22, nome: "11800.801 - Embaladeira Projepack - Arg.", setor: "EMBALAGEM", status: "Funcionando", cor: "green" },
    { id: 23, nome: "11800.802 - Embaladeira Pack - Aglo", setor: "EMBALAGEM", status: "Funcionando", cor: "green" },

    { id: 24, nome: "11900.901 - Polimento Motores", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 25, nome: "11900.902 - Polimento Lucson", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 26, nome: "11900.903 - Robô 01", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 27, nome: "11900.904 - Robô 02", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 28, nome: "11900.905 - Robô 03", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 29, nome: "11900.906 - Robô 04", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 30, nome: "11900.907 - Robô 05", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 31, nome: "11900.908 - Robô 06", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 32, nome: "11900.909 - Robô 07", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 33, nome: "11900.910 - Robô 08", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 34, nome: "11900.911 - Robô 09", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 35, nome: "11900.912 - Robô 10", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 36, nome: "11900.913 - Robô 11", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 37, nome: "11900.914 - Robô 12", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 38, nome: "11900.915 - Robô 13", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 39, nome: "11900.916 - Robô 14", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 40, nome: "11900.925 - Lavadora de Cubas", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 41, nome: "11900.926 - Altametal 40T", setor: "POLIMENTO", status: "Funcionando", cor: "green" },
    { id: 42, nome: "11900.927 - Jiangsu 40T", setor: "POLIMENTO", status: "Funcionando", cor: "green" },

  ])

  function alterarStatus(id, status, cor) {

    const novasMaquinas = maquinas.map((maquina) => {

      if (maquina.id === id) {
        return {
          ...maquina,
          status,
          cor
        }
      }

      return maquina
    })

    setMaquinas(novasMaquinas)
  }

  return (

    <div
      style={{
        padding: 30,
        fontFamily: "Arial",
        backgroundColor: "#f1f5f9",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          fontSize: 36
        }}
      >
        Plant Monitor
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: 30
        }}
      >
        Controle manual de funcionamento dos equipamentos
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20
        }}
      >

        {maquinas.map((maquina) => (

          <div
            key={maquina.id}
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >

            <h3>{maquina.nome}</h3>

            <p>
              <strong>Setor:</strong> {maquina.setor}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 15
              }}
            >

              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: maquina.cor
                }}
              />

              <strong>{maquina.status}</strong>

            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 20
              }}
            >

              <button onClick={() => alterarStatus(maquina.id, "Funcionando", "green")}>
                Funcionando
              </button>

              <button onClick={() => alterarStatus(maquina.id, "Parado", "red")}>
                Parado
              </button>

              <button onClick={() => alterarStatus(maquina.id, "Setup", "orange")}>
                Setup
              </button>

              <button onClick={() => alterarStatus(maquina.id, "Manutenção", "blue")}>
                Manutenção
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}
