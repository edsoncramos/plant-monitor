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



  // =====================================================
  // MÁQUINAS
  // =====================================================

  const maquinas = [

    // CORTE

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



    // ESTAMPAGEM

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
      nome: "11300.301 - Hidráulica Schuller 500T",
      setor: "ESTAMPAGEM",
    },

    {
      id: 10,
      nome: "11300.305 - Hidráulica Dan-Press 100 - 1",
      setor: "ESTAMPAGEM",
    },

    {
      id: 11,
      nome: "11300.303 - Hidráulica 350T (Dinossauro)",
      setor: "ESTAMPAGEM",
    },

    {
      id: 12,
      nome: "11300.302 - Hidráulica Altametal 230T",
      setor: "ESTAMPAGEM",
    },

    {
      id: 13,
      nome: "11300.306 - Hidráulica Dan Press 100 - 2",
      setor: "ESTAMPAGEM",
    },

    {
      id: 14,
      nome: "11300.307 - Hidráulica Rolop 660T",
      setor: "ESTAMPAGEM",
    },

    {
      id: 15,
      nome: "11300.308 - Hidráulica Rolop 400T",
      setor: "ESTAMPAGEM",
    },

    {
      id: 16,
      nome: "11300.315 - Hidráulica Muller 250T",
      setor: "ESTAMPAGEM",
    },

    {
      id: 17,
      nome: "11300.309 - Hidráulica Muller 400T",
      setor: "ESTAMPAGEM",
    },

    {
      id: 18,
      nome: "11300.304 - Excêntrica Schuler 180T",
      setor: "ESTAMPAGEM",
    },

    {
      id: 19,
      nome: "11300.313 - Exêntrica Harlo 40T - Corte Calha",
      setor: "ESTAMPAGEM",
    },

    {
      id: 20,
      nome: "11300.314 - Exêntrica Jiangsu 40T - Chp Lambari",
      setor: "ESTAMPAGEM",
    },



    // CORTE CANTO/FURO MIOLO

    {
      id: 21,
      nome: "12100.101 - Exêntrica Calvi 160T - (Dedicada N4)",
      setor: "CORTE CANTO/FURO MIOLO",
    },

    {
      id: 22,
      nome: "12100.102 - Exêntrica Shuller 160T - (Gentil)",
      setor: "CORTE CANTO/FURO MIOLO",
    },

    {
      id: 23,
      nome: "12100.103 - Exêntrica Jiangsu 80T (Redonda)",
      setor: "CORTE CANTO/FURO MIOLO",
    },

    {
      id: 24,
      nome: "12100.104 - Hidráulica Corte Canto (Laiser)",
      setor: "CORTE CANTO/FURO MIOLO",
    },

    {
      id: 25,
      nome: "12100.108 - Hidrod. Corte Canto+Logo - 2 (Ibra)",
      setor: "CORTE CANTO/FURO MIOLO",
    },



    // DOBRA

    {
      id: 26,
      nome: "11400.401 - Dobradeira Newton PDM-2025-1",
      setor: "DOBRA",
    },

    {
      id: 27,
      nome: "11400.402 - Dobradeira Newton PDM-2025-2",
      setor: "DOBRA",
    },

    {
      id: 28,
      nome: "11400.403 - Dobradeira Newton PDM-2025-5",
      setor: "DOBRA",
    },

    {
      id: 29,
      nome: "11400.404 - Dobradeira Newton PDH-7030-4",
      setor: "DOBRA",
    },

    {
      id: 30,
      nome: "11400.405 - Dobradeira Hid. Hidrodinamica-1",
      setor: "DOBRA",
    },

    {
      id: 31,
      nome: "11400.406 - Dobradeira Hid. MCHD-1",
      setor: "DOBRA",
    },

    {
      id: 32,
      nome: "11400.407 - Dobradeira Daltec",
      setor: "DOBRA",
    },

    {
      id: 33,
      nome: "11400.408 - Ponteadeira Simples DRX-1",
      setor: "DOBRA",
    },

    {
      id: 34,
      nome: "11400.409 - Ponteadeira Dupla-1",
      setor: "DOBRA",
    },

    {
      id: 35,
      nome: "11400.410 - Ponteadeira Tripla-1",
      setor: "DOBRA",
    },

    {
      id: 36,
      nome: "11400.411 - Ponteadeira Lambari DRX-1",
      setor: "DOBRA",
    },

    {
      id: 37,
      nome: "11400.412 - Robô Solda Ponto",
      setor: "DOBRA",
    },



    // SOLDA

    {
      id: 38,
      nome: "11500.501 - Solda Apes-1",
      setor: "SOLDA",
    },

    {
      id: 39,
      nome: "11500.502 - Solda Apes DRX-2",
      setor: "SOLDA",
    },



    // LIXA/ACABAMENTO

    {
      id: 40,
      nome: "11600.601 - Acabamento Apes DRX-1",
      setor: "LIXA/ACABAMENTO",
    },

    {
      id: 41,
      nome: "11600.602 - Acabamento Lucson-1",
      setor: "LIXA/ACABAMENTO",
    },

    {
      id: 42,
      nome: "11600.606 - Acabamento Apes-2 (Franke)",
      setor: "LIXA/ACABAMENTO",
    },



    // TANQUES

    {
      id: 43,
      nome: "12200.201 - Excêntrica Walviwg 25T",
      setor: "TANQUES",
    },

    {
      id: 44,
      nome: "12200.202 - Excêntrica Jundiaí 40T",
      setor: "TANQUES",
    },

    {
      id: 45,
      nome: "12200.203 - Dobradeira IMAG TQ",
      setor: "TANQUES",
    },

    {
      id: 46,
      nome: "12200.204 - Hidrodinâmica 40T",
      setor: "TANQUES",
    },

    {
      id: 47,
      nome: "12200.205 - Ponteadeira Simples TQ-1",
      setor: "TANQUES",
    },

    {
      id: 48,
      nome: "12200.206 - Ponteadeira Dupla TQ-1",
      setor: "TANQUES",
    },

    {
      id: 49,
      nome: "12200.207 - Ponteadeira Dupla-3",
      setor: "TANQUES",
    },

    {
      id: 50,
      nome: "12200.208 - Solda Costura-1",
      setor: "TANQUES",
    },

    {
      id: 51,
      nome: "12200.209 - Solda Costura-2",
      setor: "TANQUES",
    },

    {
      id: 52,
      nome: "12200.210 - Exêntrica Harlo 40T - Sabonet.",
      setor: "TANQUES",
    },



    // REVESTIMENTO

    {
      id: 53,
      nome: "11700.701 - Aglomerado",
      setor: "REVESTIMENTO",
    },

    {
      id: 54,
      nome: "11700.702 - Cola/Montagem",
      setor: "REVESTIMENTO",
    },

    {
      id: 55,
      nome: "11700.703 - Argamassa",
      setor: "REVESTIMENTO",
    },

    {
      id: 56,
      nome: "11700.704 - Seccionadora/Aglomerado",
      setor: "REVESTIMENTO",
    },



    // EMBALAGEM

    {
      id: 57,
      nome: "11800.801 - Embaladeira Projepack - Arg.",
      setor: "EMBALAGEM",
    },

    {
      id: 58,
      nome: "11800.802 - Embaladeira Pack - Aglo",
      setor: "EMBALAGEM",
    },

    {
      id: 59,
      nome: "11800.803 - Embalagem Cubas Avulsas",
      setor: "EMBALAGEM",
    },

    {
      id: 60,
      nome: "11800.804 - Embalagem Calha Fogão Pia",
      setor: "EMBALAGEM",
    },



    // POLIMENTO

    {
      id: 61,
      nome: "11900.901 - Polimento Motores",
      setor: "POLIMENTO",
    },

    {
      id: 62,
      nome: "11900.902 - Polimento Lucson",
      setor: "POLIMENTO",
    },

    {
      id: 63,
      nome: "11900.903 - Robô 01",
      setor: "POLIMENTO",
    },

    {
      id: 64,
      nome: "11900.904 - Robô 02",
      setor: "POLIMENTO",
    },

    {
      id: 65,
      nome: "11900.905 - Robô 03",
      setor: "POLIMENTO",
    },

    {
      id: 66,
      nome: "11900.906 - Robô 04",
      setor: "POLIMENTO",
    },

    {
      id: 67,
      nome: "11900.907 - Robô 05",
      setor: "POLIMENTO",
    },

    {
      id: 68,
      nome: "11900.908 - Robô 06",
      setor: "POLIMENTO",
    },

    {
      id: 69,
      nome: "11900.909 - Robô 07",
      setor: "POLIMENTO",
    },

    {
      id: 70,
      nome: "11900.910 - Robô 08",
      setor: "POLIMENTO",
    },

    {
      id: 71,
      nome: "11900.911 - Robô 09",
      setor: "POLIMENTO",
    },

    {
      id: 72,
      nome: "11900.912 - Robô 10",
      setor: "POLIMENTO",
    },

    {
      id: 73,
      nome: "11900.913 - Robô 11",
      setor: "POLIMENTO",
    },

    {
      id: 74,
      nome: "11900.914 - Robô 12",
      setor: "POLIMENTO",
    },

    {
      id: 75,
      nome: "11900.915 - Robô 13",
      setor: "POLIMENTO",
    },

    {
      id: 76,
      nome: "11900.916 - Robô 14",
      setor: "POLIMENTO",
    },

    {
      id: 77,
      nome: "11900.925 - Maq. lavagem Cubas",
      setor: "POLIMENTO",
    },

    {
      id: 78,
      nome: "11900.926 - Hidráulica Altametal 40T",
      setor: "POLIMENTO",
    },

    {
      id: 79,
      nome: "11900.927 - Hidráulica Jiangsu 40T",
      setor: "POLIMENTO",
    },

  ];



  // =====================================================
  // AUTENTICAÇÃO
  // =====================================================

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, (user) => {

        setUsuario(user);

      });

    return () => unsubscribe();

  }, []);



  // =====================================================
  // FIREBASE REALTIME
  // =====================================================

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



  // =====================================================
  // LOGIN
  // =====================================================

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



  // =====================================================
  // LOGOUT
  // =====================================================

  async function sair() {

    await signOut(auth);

  }



  // =====================================================
  // STATUS ATUAL
  // =====================================================

  function getStatusAtual(nomeMaquina) {

    const ultimoEvento =
      historico.find(
        (item) =>
          item.maquina === nomeMaquina
      );

    return (
      ultimoEvento?.novoStatus ||
      "Funcionando"
    );
  }



  // =====================================================
  // CLASSE STATUS
  // =====================================================

  function getClasseStatus(status) {

    if (status === "Funcionando") {
      return "funcionando";
    }

    if (status === "Parado") {
      return "parado";
    }

    if (status === "Setup") {
      return "setup";
    }

    return "manutencao";
  }



  // =====================================================
  // ALTERAR STATUS
  // =====================================================

  async function alterarStatus(
    maquina,
    novoStatus
  ) {

    const ultimoEvento =
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
          ultimoEvento?.novoStatus ||
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



  // =====================================================
  // FILTROS
  // =====================================================

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



  // =====================================================
  // LOGIN SCREEN
  // =====================================================

  if (!usuario) {

    return (

      <div className="login-container">

        <div className="login-box">

          <h1>Plant Monitor</h1>

          <p>
            Controle manual de funcionamento dos equipamentos
          </p>

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

      </div>

    );
  }



  // =====================================================
  // DASHBOARD
  // =====================================================

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



      {/* FILTROS */}

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

          <option value="CORTE CANTO/FURO MIOLO">
            CORTE CANTO/FURO MIOLO
          </option>

          <option value="DOBRA">
            DOBRA
          </option>

          <option value="SOLDA">
            SOLDA
          </option>

          <option value="LIXA/ACABAMENTO">
            LIXA/ACABAMENTO
          </option>

          <option value="TANQUES">
            TANQUES
          </option>

          <option value="REVESTIMENTO">
            REVESTIMENTO
          </option>

          <option value="EMBALAGEM">
            EMBALAGEM
          </option>

          <option value="POLIMENTO">
            POLIMENTO
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



      {/* GRID */}

      <div className="grid">

        {maquinasFiltradas.map(
          (maquina) => {

            const statusAtual =
              getStatusAtual(
                maquina.nome
              );

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



                {/* STATUS */}

                <div
                  className={`status ${getClasseStatus(statusAtual)}`}
                >

                  <div className="status-circle"></div>

                  <span>
                    {statusAtual}
                  </span>

                </div>



                {/* BOTÕES */}

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



                {/* HISTÓRICO */}

                <div className="historico-maquina">

                  <h4>
                    Últimos eventos
                  </h4>

                  {historicoMaquina
                    .slice(0, 5)
                    .map((item) => (

                      <div
                        key={item.id}
                        className="evento-item"
                      >

                        <strong>
                          {item.novoStatus}
                        </strong>

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