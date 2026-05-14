import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { db, auth } from "./firebase";

import "./App.css";

function App() {

  const [usuario, setUsuario] = useState(null);

  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  const [historico, setHistorico] = useState([]);

  const [filtroSetor, setFiltroSetor] =
    useState("TODOS");

  const [filtroMaquina, setFiltroMaquina] =
    useState("TODAS");

  const maquinas = [

    {
      id: 1,
      nome: "11100.101 - Corte blank mesa - PR",
      setor: "CORTE",
    },

    {
      id: 2,
      nome: "11100.102 - Corte blank cuba - PR",
      setor: "CORTE",
    },

    {
      id: 3,
      nome: "11100.103 - Corte Blank Calha - PR",
      setor: "CORTE",
    },

    {
      id: 4,
      nome: "11200.200 - Máquina Laser",
      setor: "CORTE",
    },

    {
      id: 5,
      nome: "11200.201 - Laser LXSHOW - 6000W",
      setor: "CORTE",
    },

    {
      id: 6,
      nome: "11300.319 - Hidráulica Yucel 800T",
      setor: "ESTAMPAGEM",
    },

    {
      id: 7,
      nome: "11300.320 - Hidráulica Yucel 600T",
      setor: "ESTAMPAGEM",
    },

    {
      id: 8,
      nome: "11300.321 - Hidráulica Yucel 200T",
      setor: "ESTAMPAGEM",
    },

    {
      id: 9,
      nome: "11400.401 - Dobradeira Newton PDM-2025-1",
      setor: "DOBRA",
    },

    {
      id: 10,
      nome: "11400.402 - Dobradeira Newton PDM-3020",
      setor: "DOBRA",
    },

    {
      id: 11,
      nome: "11500.501 - Solda Apes-1",
      setor: "SOLDA",
    },

    {
      id: 12,
      nome: "11500.502 - Solda Robotizada Fanuc",
      setor: "SOLDA",
    },

    {
      id: 13,
      nome: "11600.601 - Acabamento Apes DRX-1",
      setor: "POLIMENTO",
    },

    {
      id: 14,
      nome: "11600.602 - Politriz Manual",
      setor: "POLIMENTO",
    },

    {
      id: 15,
      nome: "11700.701 - Aglomerado",
      setor: "REVESTIMENTO",
    },

    {
      id: 16,
      nome: "11700.702 - Revestidora UV",
      setor: "REVESTIMENTO",
    },

    {
      id: 17,
      nome: "11800.801 - Embaladeira Projepack",
      setor: "EMBALAGEM",
    },

    {
      id: 18,
      nome: "11800.802 - Paletizadora",
      setor: "EMBALAGEM",
    },

    {
      id: 19,
      nome: "11900.901 - Polimento Motores",
      setor: "POLIMENTO",
    },

    {
      id: 20,
      nome: "11900.902 - Polimento Lucson",
      setor: "POLIMENTO",
    },

    {
      id: 21,
      nome: "11900.903 - Robô 01",
      setor: "POLIMENTO",
    },

    {
      id: 22,
      nome: "11900.904 - Robô 02",
      setor: "POLIMENTO",
    },

    {
      id: 23,
      nome: "11900.905 - Robô 03",
      setor: "POLIMENTO",
    },

    {
      id: 24,
      nome: "11900.906 - Robô 04",
      setor: "POLIMENTO",
    },

    {
      id: 25,
      nome: "11900.907 - Robô 05",
      setor: "POLIMENTO",
    },

    {
      id: 26,
      nome: "11900.908 - Robô 06",
      setor: "POLIMENTO",
    },

    {
      id: 27,
      nome: "11900.909 - Robô 07",
      setor: "POLIMENTO",
    },

    {
      id: 28,
      nome: "11900.910 - Robô 08",
      setor: "POLIMENTO",
    },

    {
      id: 29,
      nome: "11900.911 - Robô 09",
      setor: "POLIMENTO",
    },

    {
      id: 30,
      nome: "11900.912 - Robô 10",
      setor: "POLIMENTO",
    },

    {
      id: 31,
      nome: "11900.913 - Robô 11",
      setor: "POLIMENTO",
    },

    {
      id: 32,
      nome: "11900.914 - Robô 12",
      setor: "POLIMENTO",
    },

    {
      id: 33,
      nome: "11900.915 - Robô 13",
      setor: "POLIMENTO",
    },

    {
      id: 34,
      nome: "11900.916 - Robô 14",
      setor: "POLIMENTO",
    },

    {
      id: 35,
      nome: "11900.925 - Lavadora de Cubas",
      setor: "POLIMENTO",
    },

    {
      id: 36,
      nome: "11900.926 - Altametal 40T",
      setor: "POLIMENTO",
    },

    {
      id: 37,
      nome: "11900.927 - Jiangsu 40T",
      setor: "POLIMENTO",
    },

  ];

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, (user) => {

        setUsuario(user);

      });

    return () => unsubscribe();

  }, []);

  useEffect(() => {

    const q = query(
      collection(db, "historico"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {

        const dados =
          snapshot.docs.map((doc) => ({

            id: doc.id,
            ...doc.data(),

          }));

        setHistorico(dados);

      });

    return () => unsubscribe();

  }, []);

  const getStatusAtual = (nomeMaquina) => {

    const ultimoEvento =
      historico.find(
        (item) =>
          item.maquina === nomeMaquina
      );

    return (
      ultimoEvento?.novoStatus ||
      "Funcionando"
    );
  };

  const maquinasFiltradas =
    maquinas.filter((m) => {

      const setorOk =
        filtroSetor === "TODOS"
          ? true
          : m.setor === filtroSetor;

      const maquinaOk =
        filtroMaquina === "TODAS"
          ? true
          : m.nome === filtroMaquina;

      return setorOk && maquinaOk;

    });

  async function alterarStatus(
    maquina,
    novoStatus
  ) {

    const ultimoStatus =
      historico.find(
        (item) =>
          item.maquina === maquina.nome
      );

    await addDoc(
      collection(db, "historico"),
      {

        maquina: maquina.nome,

        setor: maquina.setor,

        statusAnterior:
          ultimoStatus?.novoStatus ||
          "Funcionando",

        novoStatus,

        operador:
          usuario?.email ||
          "Operador",

        dataHora:
          new Date().toLocaleString(
            "pt-BR"
          ),

        timestamp: Date.now(),

      }
    );
  }

  async function fazerLogin() {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

    } catch (error) {

      alert("Erro no login");

      console.log(error);

    }
  }

  async function sair() {

    await signOut(auth);

  }

  if (!usuario) {

    return (

      <div className="login-container">

        <h1>Plant Monitor</h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
        />

        <button onClick={fazerLogin}>
          Entrar
        </button>

      </div>

    );
  }

  return (

    <div className="container">

      <div className="topo">

        <div>

          <h1>Plant Monitor</h1>

          <p>
            Controle manual de funcionamento dos equipamentos
          </p>

        </div>

        <div className="usuario-box">

          <strong>
            {usuario.email}
          </strong>

          <button onClick={sair}>
            Sair
          </button>

        </div>

      </div>

      <div className="filtros">

        <select
          value={filtroSetor}
          onChange={(e) =>
            setFiltroSetor(
              e.target.value
            )
          }
        >

          <option value="TODOS">
            TODOS SETORES
          </option>

          <option value="CORTE">
            CORTE
          </option>

          <option value="ESTAMPAGEM">
            ESTAMPAGEM
          </option>

          <option value="DOBRA">
            DOBRA
          </option>

          <option value="SOLDA">
            SOLDA
          </option>

          <option value="POLIMENTO">
            POLIMENTO
          </option>

          <option value="REVESTIMENTO">
            REVESTIMENTO
          </option>

          <option value="EMBALAGEM">
            EMBALAGEM
          </option>

        </select>

        <select
          value={filtroMaquina}
          onChange={(e) =>
            setFiltroMaquina(
              e.target.value
            )
          }
        >

          <option value="TODAS">
            TODAS MÁQUINAS
          </option>

          {maquinas.map((maq) => (

            <option
              key={maq.id}
              value={maq.nome}
            >
              {maq.nome}
            </option>

          ))}

        </select>

      </div>

      <div className="grid">

        {maquinasFiltradas.map(
          (maquina) => {

            const historicoMaquina =
              historico.filter(
                (item) =>
                  item.maquina ===
                  maquina.nome
              );

            return (

              <div
                className="card"
                key={maquina.id}
              >

                <h2>
                  {maquina.nome}
                </h2>

                <p>

                  <strong>
                    Setor:
                  </strong>

                  {" "}

                  {maquina.setor}

                </p>

                <p
                  className={`status ${getStatusAtual(maquina.nome)
                    .toLowerCase()
                    .replace("ç", "c")
                    .replace("ã", "a")
                  }`}
                >

                  <span className="status-indicator"></span>

                  {getStatusAtual(maquina.nome)}

                </p>

                <div className="botoes">

                  <button
                    className="funcionando"
                    onClick={() =>
                      alterarStatus(
                        maquina,
                        "Funcionando"
                      )
                    }
                  >

                    Funcionando

                  </button>

                  <button
                    className="parado"
                    onClick={() =>
                      alterarStatus(
                        maquina,
                        "Parado"
                      )
                    }
                  >

                    Parado

                  </button>

                  <button
                    className="setup"
                    onClick={() =>
                      alterarStatus(
                        maquina,
                        "Setup"
                      )
                    }
                  >

                    Setup

                  </button>

                  <button
                    className="manutencao"
                    onClick={() =>
                      alterarStatus(
                        maquina,
                        "Manutenção"
                      )
                    }
                  >

                    Manutenção

                  </button>

                </div>

                <div className="historico-maquina">

                  <h4>
                    Últimos eventos
                  </h4>

                  {historicoMaquina
                    .slice(0, 5)
                    .map((item) => (

                      <div
                        className="evento-item"
                        key={item.id}
                      >

                        {item.novoStatus}

                        {" - "}

                        {item.dataHora}

                      </div>

                    ))}

                </div>

              </div>

            );
          }
        )}

      </div>

    </div>

  );
}

export default App;