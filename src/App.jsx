import { useEffect, useMemo, useState } from "react";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import ParetoPerdas from "./components/ParetoPerdas";
import KPICards from "./components/KPICards";

import { db, auth } from "./firebase";
import { maquinas } from "./data/maquinas";

import "./App.css";

const motivosParada = [
  "Falta material",
  "Setup",
  "Qualidade",
  "Ferramenta",
  "Sem operador",
  "Manutenção",
  "Processo",
];

function App() {

  // =====================================================
  // STATES
  // =====================================================

  const [usuario, setUsuario] =
    useState(null);

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [historico, setHistorico] =
    useState([]);

  const [filtroSetor, setFiltroSetor] =
    useState("TODOS");

  const [filtroMaquina, setFiltroMaquina] =
    useState("TODAS");

  const [filtroCritica, setFiltroCritica] =
    useState("TODAS");

  const [modoTV, setModoTV] =
    useState(false);

  const [popupAberto, setPopupAberto] =
    useState(false);

  const [maquinaSelecionada,
    setMaquinaSelecionada] =
    useState(null);

  // =====================================================
  // FIREBASE AUTH
  // =====================================================

  useEffect(() => {

    const unsubscribeAuth =
      onAuthStateChanged(
        auth,
        (user) => {

          setUsuario(user);

        }
      );

    return () =>
      unsubscribeAuth();

  }, []);

  // =====================================================
  // FIRESTORE REALTIME
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

    return () =>
      unsubscribe();

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

    } catch {

      alert("Erro no login");

    }
  }

  // =====================================================
  // LOGOUT
  // =====================================================

  async function sair() {

    await signOut(auth);

  }

  // =====================================================
  // RESET HISTÓRICO
  // =====================================================

  async function resetarHistorico() {

    const confirmar =
      window.confirm(
        "Deseja apagar todo o histórico?"
      );

    if (!confirmar) return;

    const snapshot =
      await getDocs(
        collection(db, "historico")
      );

    const deletar =
      snapshot.docs.map((item) =>
        deleteDoc(
          doc(
            db,
            "historico",
            item.id
          )
        )
      );

    await Promise.all(deletar);

    alert("Histórico resetado");

  }

  // =====================================================
  // STATUS
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

  function calcularTempo(timestamp) {

    if (!timestamp) return "";

    const agora = Date.now();

    const diferenca =
      agora - timestamp;

    const minutos =
      Math.floor(diferenca / 60000);

    const horas =
      Math.floor(minutos / 60);

    const minutosRestantes =
      minutos % 60;

    if (horas > 0) {

      return `${horas}h ${minutosRestantes}min`;

    }

    return `${minutos}min`;
  }

  // =====================================================
  // ALTERAR STATUS
  // =====================================================

  async function alterarStatus(
    maquina,
    novoStatus,
    motivo = ""
  ) {

    try {

      const ultimoEvento =
        historico.find(
          (item) =>
            item.maquina ===
            maquina.nome
        );

      if (
        ultimoEvento?.novoStatus ===
        novoStatus
      ) {
        return;
      }

      await addDoc(
        collection(
          db,
          "historico"
        ),
        {

          maquina:
            maquina.nome,

          setor:
            maquina.setor,

          motivo,

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

          timestamp:
            Date.now(),

        }
      );

    } catch (erro) {

      console.log(erro);

      alert(
        "Erro ao alterar status"
      );

    }
  }

  // =====================================================
  // SELECIONAR MOTIVO
  // =====================================================

  async function selecionarMotivo(
    motivo
  ) {

    if (!maquinaSelecionada)
      return;

    await alterarStatus(
      maquinaSelecionada,
      "Parado",
      motivo
    );

    setPopupAberto(false);

    setMaquinaSelecionada(null);

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

      const criticaOk =
        filtroCritica === "TODAS"
          ? true
          : filtroCritica === "CRITICAS"
          ? m.critica === true
          : m.critica === false;

      return (
        setorOk &&
        maquinaOk &&
        criticaOk
      );

    });

  // =====================================================
  // ORDENAÇÃO
  // =====================================================

  const maquinasOrdenadas =
    useMemo(() => {

      return [...maquinasFiltradas]
        .sort((a, b) => {

          const statusA =
            getStatusAtual(a.nome);

          const statusB =
            getStatusAtual(b.nome);

          if (
            statusA === "Parado" &&
            statusB !== "Parado"
          ) {
            return -1;
          }

          if (
            statusB === "Parado" &&
            statusA !== "Parado"
          ) {
            return 1;
          }

          return 0;
        });

    }, [
      maquinasFiltradas,
      historico,
    ]);

  // =====================================================
  // LOGIN SCREEN
  // =====================================================

  if (!usuario) {

    return (

      <div className="login-container">

        <div className="login-box">

          <h1>
            Plant Monitor
          </h1>

          <p>
            Controle industrial em tempo real
          </p>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(
                e.target.value
              )
            }
          />

          <button
            onClick={fazerLogin}
          >
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

    <div
      className={`container ${
        modoTV
          ? "tv-mode"
          : ""
      }`}
    >

      {/* TOPO */}

      <div className="topo">

        <div>

          <h1>
            Plant Monitor
          </h1>

          <p>
            Controle manual de funcionamento dos equipamentos
          </p>

        </div>

        <div className="usuario-box">

          <strong className="usuario-email">
            {usuario.email}
          </strong>

          <div className="acoes-topo">

            <button
              className="tv-btn"
              onClick={() =>
                setModoTV(
                  !modoTV
                )
              }
            >
              {modoTV
                ? "Modo Normal"
                : "Modo TV"}
            </button>

            <button
              className="resetar"
              onClick={
                resetarHistorico
              }
            >
              Reset Histórico
            </button>

            <button
              className="sair-btn"
              onClick={sair}
            >
              Sair
            </button>

          </div>

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

          {[...new Set(
            maquinas.map(
              (m) => m.setor
            )
          )].map((setor) => (

            <option
              key={setor}
              value={setor}
            >
              {setor}
            </option>

          ))}

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

        <select
          value={filtroCritica}

          onChange={(e) =>
            setFiltroCritica(
              e.target.value
            )
          }
        >

          <option value="TODAS">
            TODAS
          </option>

          <option value="CRITICAS">
            SOMENTE CRÍTICAS
          </option>

          <option value="NORMAIS">
            SOMENTE NORMAIS
          </option>

        </select>

      </div>

      {/* KPI */}

      <KPICards
        maquinas={maquinas}
        historico={historico}
      />

      {/* PARETO */}

      <ParetoPerdas
        historico={historico}
      />

      {/* GRID */}

      <div className="grid">

        {maquinasOrdenadas.map(
          (maquina) => {

            const ultimoEvento =
              historico.find(
                (item) =>
                  item.maquina ===
                  maquina.nome
              );

            const statusAtual =
              ultimoEvento?.novoStatus ||
              "Funcionando";

            const tempoStatus =
              calcularTempo(
                ultimoEvento?.timestamp
              );

            const historicoMaquina =
              historico.filter(
                (item) =>
                  item.maquina ===
                  maquina.nome
              );

            return (

              <div
                key={maquina.id}
                className={`maquina-card ${
                  maquina.critica
                    ? "critica"
                    : ""
                }`}
              >

                <div className="titulo-maquina">

                  <h3 className="maquina-nome">
                    {maquina.nome}
                  </h3>

                  {maquina.critica && (
                    <span className="badge-critica">
                      CRÍTICA
                    </span>
                  )}

                </div>

                <p className="maquina-setor">
                  {maquina.setor}
                </p>

                {/* STATUS */}

                <div
                  className={`status-box ${getClasseStatus(statusAtual)}`}
                >

                  <div className="status-linha">

                    <div className="status-circle"></div>

                    <span className="status-texto">
                      {statusAtual}
                    </span>

                  </div>

                  <div className="tempo-status">
                    há {tempoStatus}
                  </div>

                </div>

                {/* SELECT STATUS */}

                <div className="status-select-box">

                  <select
                    className={`status-select ${getClasseStatus(statusAtual)}`}

                    value={statusAtual}

                    onChange={(e) => {

                      const novoStatus =
                        e.target.value;

                      if (novoStatus === "Parado") {

                        setMaquinaSelecionada(
                          maquina
                        );

                        setPopupAberto(true);

                        return;
                      }

                      alterarStatus(
                        maquina,
                        novoStatus
                      );
                    }}
                  >

                    <option value="Funcionando">
                      Funcionando
                    </option>

                    <option value="Parado">
                      Parado
                    </option>

                    <option value="Setup">
                      Setup
                    </option>

                    <option value="Manutenção">
                      Manutenção
                    </option>

                  </select>

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

                        {item.motivo && (
                          <>
                            {" "}
                            | Motivo:
                            {" "}
                            {item.motivo}
                          </>
                        )}

                      </div>

                    ))}

                </div>

              </div>

            );
          }
        )}

      </div>

      {/* POPUP */}

      {popupAberto && (

        <div className="popup-overlay">

          <div className="popup-box">

            <h2>
              Motivo da parada
            </h2>

            <div className="popup-motivos">

              {motivosParada.map(
                (motivo) => (

                  <button
                    key={motivo}

                    onClick={() =>
                      selecionarMotivo(
                        motivo
                      )
                    }
                  >
                    {motivo}
                  </button>

                )
              )}

            </div>

            <button
              className="fechar-popup"

              onClick={() => {

                setPopupAberto(
                  false
                );

                setMaquinaSelecionada(
                  null
                );

              }}
            >
              Cancelar
            </button>

          </div>

        </div>

      )}

    </div>

  );
}

export default App;