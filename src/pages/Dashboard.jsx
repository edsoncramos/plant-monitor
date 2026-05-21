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

import ParetoPerdas from "../components/ParetoPerdas";
import KPICards from "../components/KPICards";

import { db, auth } from "../firebase";
import { maquinas } from "../data/maquinas";

import {
  calcularTempoProdutivo,
} from "../utils/calculoTurno";

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

      <h1>
        Plant Monitor
      </h1>

      <KPICards
        maquinas={maquinas}
        historico={historico}
      />

      <ParetoPerdas
        historico={historico}
      />

    </div>

  );
}

export default Dashboard;