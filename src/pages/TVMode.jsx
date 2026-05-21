import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

import { db } from "../firebase";

import { maquinas } from "../data/maquinas";

import {
  calcularTempoProdutivo,
} from "../utils/calculoturno.js";

import "../App.css";

function TVMode() {

  const [historico,
    setHistorico] =
    useState([]);

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

    return "manutencao";
  }

  // =====================================================
  // KPI
  // =====================================================

  const maquinasCriticas =
    maquinas.filter(
      (maquina) =>
        maquina.critica === true
    );

  const funcionando =
    maquinasCriticas.filter(
      (maquina) =>
        getStatusAtual(
          maquina.nome
        ) === "Funcionando"
    ).length;

  const paradas =
    maquinasCriticas.filter(
      (maquina) =>
        getStatusAtual(
          maquina.nome
        ) === "Parado"
    ).length;

  const setup =
    maquinasCriticas.filter(
      (maquina) =>
        getStatusAtual(
          maquina.nome
        ) === "Setup"
    ).length;

  // =====================================================
  // RELÓGIO
  // =====================================================

  const horaAtual =
    new Date().toLocaleTimeString(
      "pt-BR"
    );

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="tv-container">

      {/* TOPO */}

      <div className="tv-topo">

        <div>

          <h1 className="tv-titulo">
            PLANT MONITOR LIVE
          </h1>

          <p className="tv-subtitulo">
            Monitoramento industrial em tempo real
          </p>

        </div>

        <div className="tv-hora">

          {horaAtual}

        </div>

      </div>

      {/* KPI */}

      <div className="tv-kpis">

        <div className="tv-kpi funcionando">

          <h3>
            FUNCIONANDO
          </h3>

          <strong>
            {funcionando}
          </strong>

        </div>

        <div className="tv-kpi parado">

          <h3>
            PARADAS
          </h3>

          <strong>
            {paradas}
          </strong>

        </div>

        <div className="tv-kpi setup">

          <h3>
            SETUP
          </h3>

          <strong>
            {setup}
          </strong>

        </div>

      </div>

      {/* GRID */}

      <div className="tv-grid">

        {maquinasCriticas.map(
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

            const motivoAtual =
              ultimoEvento?.motivo || "";

            const tempoStatus =
              calcularTempoProdutivo(
                ultimoEvento?.timestamp
              );

            return (

              <div
                key={maquina.id}
                className={`tv-card ${getClasseStatus(statusAtual)}`}
              >

                <div className="tv-card-topo">

                  <h2>
                    {maquina.nome}
                  </h2>

                </div>

                <div className="tv-status">

                  {statusAtual}

                </div>

                {motivoAtual && (

                  <div className="tv-motivo">

                    {motivoAtual}

                  </div>

                )}

                <div className="tv-tempo">

                  há {tempoStatus}

                </div>

              </div>

            );
          }
        )}

      </div>

    </div>

  );
}

export default TVMode;