import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import {
  signOut,
} from "firebase/auth";

import {
  db,
  auth,
} from "../firebase";

import {
  maquinas,
} from "../data/maquinas";

import KPICards from "../components/KPICards";

import "../App.css";

function Dashboard() {

  const [
    historico,
    setHistorico,
  ] = useState([]);

  const [
    horaAtual,
    setHoraAtual,
  ] = useState(
    new Date()
  );

  const [
    filtroSetor,
    setFiltroSetor,
  ] = useState("");

  const [
    filtroCritica,
    setFiltroCritica,
  ] = useState(false);

  // =====================================================
  // RELÓGIO
  // =====================================================

  useEffect(() => {

    const intervalo =
      setInterval(() => {

        setHoraAtual(
          new Date()
        );

      }, 1000);

    return () =>
      clearInterval(
        intervalo
      );

  }, []);

  // =====================================================
  // FIREBASE
  // =====================================================

  useEffect(() => {

    const q = query(
      collection(
        db,
        "historico"
      ),
      orderBy(
        "timestamp",
        "desc"
      )
    );

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {

          const dados =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setHistorico(
            dados
          );

        }
      );

    return () =>
      unsubscribe();

  }, []);

  // =====================================================
  // STATUS
  // =====================================================

  function getStatusAtual(
    nomeMaquina
  ) {

    const ultimoEvento =
      historico.find(
        (item) =>
          item?.maquina ===
          nomeMaquina
      );

    return (
      ultimoEvento?.novoStatus ||
      "Funcionando"
    );

  }

  // =====================================================
  // MOTIVO
  // =====================================================

  function getMotivoAtual(
    nomeMaquina
  ) {

    const ultimoEvento =
      historico.find(
        (item) =>
          item?.maquina ===
          nomeMaquina
      );

    return (
      ultimoEvento?.motivo ||
      ""
    );

  }

  // =====================================================
  // TEMPO
  // =====================================================

  function getTempo(
    nomeMaquina
  ) {

    const ultimoEvento =
      historico.find(
        (item) =>
          item?.maquina ===
          nomeMaquina
      );

    if (
      !ultimoEvento ||
      !ultimoEvento.timestamp
    ) {

      return "há 0min";

    }

    const dataEvento =
      ultimoEvento.timestamp
        ?.toDate
        ? ultimoEvento.timestamp.toDate()
        : new Date(
            ultimoEvento.timestamp
          );

    const diferenca =
      Math.floor(
        (
          new Date() -
          dataEvento
        ) / 60000
      );

    const horas =
      Math.floor(
        diferenca / 60
      );

    const minutos =
      diferenca % 60;

    if (horas > 0) {

      return `há ${horas}h ${minutos}min`;

    }

    return `há ${minutos}min`;

  }

  // =====================================================
  // CLASSE STATUS
  // =====================================================

  function getClasse(
    status
  ) {

    switch (status) {

      case "Parado":
        return "parado";

      case "Setup":
        return "setup";

      case "Manutenção":
        return "manutencao";

      default:
        return "funcionando";

    }

  }

  // =====================================================
  // ALTERAR STATUS
  // =====================================================

  async function alterarStatusIndividual(
    maquina,
    novoStatus,
    motivo = ""
  ) {

    try {

      await addDoc(
        collection(
          db,
          "historico"
        ),
        {
          maquina,
          novoStatus,
          motivo,
          timestamp:
            new Date(),
        }
      );

    } catch (erro) {

      console.error(
        erro
      );

    }

  }

  // =====================================================
  // LOGOUT
  // =====================================================

  async function sair() {

    try {

      await signOut(
        auth
      );

    } catch (erro) {

      console.error(
        erro
      );

    }

  }

  // =====================================================
  // FILTROS
  // =====================================================

  const maquinasFiltradas =
    Array.isArray(
      maquinas
    )
      ? maquinas.filter(
          (maquina) => {

            const atendeSetor =
              filtroSetor === ""
                ? true
                : (
                    maquina?.setor || ""
                  ) === filtroSetor;

            const atendeCritica =
              filtroCritica
                ? maquina?.critica ===
                  true
                : true;

            return (
              atendeSetor &&
              atendeCritica
            );

          }
        )
      : [];

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="container">

      <div className="top-bar">

        <button
          onClick={sair}
          className="logout-btn"
        >
          Sair
        </button>

      </div>

      <h1>
        PLANT MONITOR
      </h1>

      <p className="subtitulo">
        Monitoramento industrial
        em tempo real
      </p>

      <div className="relogio">

        {horaAtual.toLocaleTimeString(
          "pt-BR"
        )}

      </div>

      <KPICards
        maquinas={
          maquinas
        }
        historico={
          historico
        }
      />

      {/* ===================================================== */}
      {/* FILTROS */}
      {/* ===================================================== */}

      <div className="filtros-dashboard">

        <select
          value={
            filtroSetor
          }
          onChange={(e) =>
            setFiltroSetor(
              e.target.value
            )
          }
          className="filtro-select"
        >

          <option value="">
            Todos setores
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

        <label className="filtro-checkbox">

          <input
            type="checkbox"
            checked={
              filtroCritica
            }
            onChange={(e) =>
              setFiltroCritica(
                e.target.checked
              )
            }
          />

          Apenas críticas

        </label>

      </div>

      {/* ===================================================== */}
      {/* GRID */}
      {/* ===================================================== */}

      <div className="maquinas-grid">

        {maquinasFiltradas.map(
          (maquina) => {

            const status =
              getStatusAtual(
                maquina?.nome
              );

            const motivo =
              getMotivoAtual(
                maquina?.nome
              );

            return (

              <div
                key={
                  maquina?.id
                }
                className={`tv-card ${getClasse(
                  status
                )}`}
              >

                <h2>
                  {maquina?.nome}
                </h2>

                <h3>
                  {status}
                </h3>

                {motivo && (

                  <p className="motivo">
                    {motivo}
                  </p>

                )}

                <span>

                  {getTempo(
                    maquina?.nome
                  )}

                </span>

                <div className="card-controls">

                  <select
                    onChange={(
                      e
                    ) =>
                      alterarStatusIndividual(
                        maquina?.nome,
                        e.target
                          .value,
                        ""
                      )
                    }
                    defaultValue=""
                  >

                    <option value="">
                      Status
                    </option>

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

                  {status ===
                    "Parado" && (

                    <select
                      onChange={(
                        e
                      ) =>
                        alterarStatusIndividual(
                          maquina?.nome,
                          "Parado",
                          e.target
                            .value
                        )
                      }
                      defaultValue=""
                    >

                      <option value="">
                        Motivo parada
                      </option>

                      <option value="Ferramenta">
                        Ferramenta
                      </option>

                      <option value="Qualidade">
                        Qualidade
                      </option>

                      <option value="Sem operador">
                        Sem operador
                      </option>

                      <option value="Sem demanda">
                        Sem demanda
                      </option>

                      <option value="Processo">
                        Processo
                      </option>

                    </select>

                  )}

                  {status ===
                    "Setup" && (

                    <select
                      onChange={(
                        e
                      ) =>
                        alterarStatusIndividual(
                          maquina?.nome,
                          "Setup",
                          e.target
                            .value
                        )
                      }
                      defaultValue=""
                    >

                      <option value="">
                        Tipo setup
                      </option>

                      <option value="Troca produto">
                        Troca produto
                      </option>

                      <option value="Ajuste">
                        Ajuste
                      </option>

                      <option value="Programação">
                        Programação
                      </option>

                    </select>

                  )}

                  {status ===
                    "Manutenção" && (

                    <select
                      onChange={(
                        e
                      ) =>
                        alterarStatusIndividual(
                          maquina?.nome,
                          "Manutenção",
                          e.target
                            .value
                        )
                      }
                      defaultValue=""
                    >

                      <option value="">
                        Tipo manutenção
                      </option>

                      <option value="Corretiva">
                        Corretiva
                      </option>

                      <option value="Preventiva">
                        Preventiva
                      </option>

                      <option value="Elétrica">
                        Elétrica
                      </option>

                      <option value="Mecânica">
                        Mecânica
                      </option>

                    </select>

                  )}

                </div>

              </div>

            );

          }
        )}

      </div>

    </div>

  );

}

export default Dashboard;