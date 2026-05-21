import { useEffect, useState } from "react";

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

import ParetoPerdas from "../components/ParetoPerdas.jsx";
import KPICards from "../components/KPICards.jsx";

import { db, auth } from "../firebase.js";

import { maquinas } from "../data/maquinas.js";

import {
  calcularTempoProdutivo,
} from "../utils/tempoprodutivo.js";

import "../App.css";

const motivosParada = [
  "Sem demanda",
  "Setup",
  "Qualidade",
  "Ferramenta",
  "Sem operador",
  "Manutenção",
  "Processo",
];

function Dashboard() {

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
  // PARADA ALMOÇO
  // =====================================================

  async function paradaAlmoco() {

    for (const maquina of maquinas) {

      const statusAtual =
        getStatusAtual(
          maquina.nome
        );

      if (
        statusAtual ===
        "Funcionando"
      ) {

        await alterarStatus(
          maquina,
          "Almoço",
          "Parada almoço"
        );

      }

    }
  }

  // =====================================================
  // RETORNO TRABALHO
  // =====================================================

  async function retornoTrabalho() {

    for (const maquina of maquinas) {

      const statusAtual =
        getStatusAtual(
          maquina.nome
        );

      if (
        statusAtual ===
        "Almoço"
      ) {

        await alterarStatus(
          maquina,
          "Funcionando",
          "Retorno almoço"
        );

      }

    }
  }

  // =====================================================
  // ENCERRAR TURNO
  // =====================================================

  async function encerrarTurno() {

    for (const maquina of maquinas) {

      const statusAtual =
        getStatusAtual(
          maquina.nome
        );

      if (
        statusAtual !==
        "Fim Turno"
      ) {

        await alterarStatus(
          maquina,
          "Fim Turno",
          "Encerramento turno"
        );

      }

    }
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

    if (status === "Almoço") {
      return "almoco";
    }

    if (status === "Fim Turno") {
      return "fimturno";
    }

    if (status === "Manutenção") {
      return "manutencao";
    }

    return "parado";

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
        ultimoEvento &&
        ultimoEvento?.novoStatus ===
        novoStatus &&
        novoStatus !== "Funcionando"
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

 return (

  <div className="container">

    <div className="top-bar">

      <h1>
        Plant Monitor
      </h1>

      <div className="acoes-topo">

        <button
          className="btn-topo"
          onClick={paradaAlmoco}
        >
          Almoço
        </button>

        <button
          className="btn-topo"
          onClick={retornoTrabalho}
        >
          Retorno
        </button>

        <button
          className="btn-topo"
          onClick={encerrarTurno}
        >
          Encerrar Turno
        </button>

        <button
          className="btn-topo btn-danger"
          onClick={resetarHistorico}
        >
          Reset
        </button>

        <button
          className="btn-topo"
          onClick={sair}
        >
          Sair
        </button>

      </div>

    </div>

    <KPICards
      maquinas={maquinas}
      historico={historico}
    />

    <ParetoPerdas
      historico={historico}
    />

    <div className="grid-maquinas">

      {maquinasFiltradas.map((maquina) => {

        const status =
          getStatusAtual(
            maquina.nome
          );

        const ultimoEvento =
          historico.find(
            (item) =>
              item.maquina ===
              maquina.nome
          );

        return (

          <div
            key={maquina.nome}
            className={
              `card-maquina ${getClasseStatus(status)}`
            }
          >

            <div className="card-header">

              <h3>
                {maquina.nome}
              </h3>

              {maquina.critica && (
                <span className="tag-critica">
                  CRÍTICA
                </span>
              )}

            </div>

            <div className="setor">
              {maquina.setor}
            </div>

            <div className="status-maquina">
              {status}
            </div>

            <div className="tempo-produtivo">

              Tempo produtivo:

              {" "}

              {
                calcularTempoProdutivo(
                  ultimoEvento?.timestamp
                )
              }

            </div>

            <div className="acoes-status">

              <button
                className="btn-status funcionando"
                onClick={() =>
                  alterarStatus(
                    maquina,
                    "Funcionando"
                  )
                }
              >
                Rodando
              </button>

              <button
                className="btn-status parado"
                onClick={() =>
                  alterarStatus(
                    maquina,
                    "Parado",
                    "Sem demanda"
                  )
                }
              >
                Parado
              </button>

              <button
                className="btn-status setup"
                onClick={() =>
                  alterarStatus(
                    maquina,
                    "Setup",
                    "Setup"
                  )
                }
              >
                Setup
              </button>

              <button
                className="btn-status manutencao"
                onClick={() =>
                  alterarStatus(
                    maquina,
                    "Manutenção",
                    "Manutenção"
                  )
                }
              >
                Manutenção
              </button>

            </div>

          </div>

        );

      })}

    </div>

  </div>

);