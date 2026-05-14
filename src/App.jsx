import { useEffect, useState } from "react";
import "./App.css";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db, auth } from "./firebase";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [historico, setHistorico] = useState([]);

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
      nome: "11500.501 - Solda Apes-1",
      setor: "SOLDA",
    },
    {
      id: 11,
      nome: "11600.601 - Acabamento Apes DRX-1",
      setor: "LIXA/ACABAMENTO",
    },
    {
      id: 12,
      nome: "11700.701 - Aglomerado",
      setor: "REVESTIMENTO",
    },
    {
      id: 13,
      nome: "11800.801 - Embaladeira Projepack",
      setor: "EMBALAGEM",
    },
    {
      id: 14,
      nome: "11900.903 - Robô 01",
      setor: "POLIMENTO",
    },
    {
      id: 15,
      nome: "11900.904 - Robô 02",
      setor: "POLIMENTO",
    },
    {
      id: 16,
      nome: "11900.905 - Robô 03",
      setor: "POLIMENTO",
    },
  ];

  const [statusMaquinas, setStatusMaquinas] = useState(
    maquinas.reduce((acc, maquina) => {
      acc[maquina.id] = "Funcionando";
      return acc;
    }, {})
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "historico"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dados = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHistorico(dados);
    });

    return () => unsubscribe();
  }, []);

  async function alterarStatus(maquina, novoStatus) {
    const statusAnterior = statusMaquinas[maquina.id];

    setStatusMaquinas((prev) => ({
      ...prev,
      [maquina.id]: novoStatus,
    }));

    await addDoc(collection(db, "historico"), {
      maquina: maquina.nome,
      setor: maquina.setor,
      statusAnterior,
      novoStatus,
      operador: usuario.email,
      dataHora: new Date().toLocaleString("pt-BR"),
      timestamp: Date.now(),
    });
  }

  async function fazerLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (error) {
      alert("Erro ao fazer login");
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={fazerLogin}>Entrar</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="topo">
        <div>
          <h1>Plant Monitor</h1>
          <p>Controle manual de funcionamento dos equipamentos</p>
        </div>

        <div className="usuario-box">
          <span>{usuario.email}</span>
          <button onClick={sair}>Sair</button>
        </div>
      </div>

      <div className="grid">
        {maquinas.map((maquina) => (
          <div key={maquina.id} className="card">
            <h2>{maquina.nome}</h2>

            <p>
              <strong>Setor:</strong> {maquina.setor}
            </p>

            <p className="status">
              ● {statusMaquinas[maquina.id]}
            </p>

            <div className="botoes">
              <button
                className="funcionando"
                onClick={() =>
                  alterarStatus(maquina, "Funcionando")
                }
              >
                Funcionando
              </button>

              <button
                className="parado"
                onClick={() =>
                  alterarStatus(maquina, "Parado")
                }
              >
                Parado
              </button>

              <button
                className="setup"
                onClick={() =>
                  alterarStatus(maquina, "Setup")
                }
              >
                Setup
              </button>

              <button
                className="manutencao"
                onClick={() =>
                  alterarStatus(maquina, "Manutenção")
                }
              >
                Manutenção
              </button>
            </div>

            <div className="historico-maquina">
              <h4>Últimos eventos</h4>

              {historico
                .filter((item) => item.maquina === maquina.nome)
                .slice(0, 5)
                .map((item) => (
                  <div key={item.id} className="evento-item">
                    <small>
                      {item.novoStatus} - {item.dataHora}
                    </small>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="historico-geral">
        <h2>Histórico Geral</h2>

        <table>
          <thead>
            <tr>
              <th>Máquina</th>
              <th>Setor</th>
              <th>Status Anterior</th>
              <th>Novo Status</th>
              <th>Operador</th>
              <th>Data/Hora</th>
            </tr>
          </thead>

          <tbody>
            {historico.slice(0, 20).map((item) => (
              <tr key={item.id}>
                <td>{item.maquina}</td>
                <td>{item.setor}</td>
                <td>{item.statusAnterior}</td>
                <td>{item.novoStatus}</td>
                <td>{item.operador}</td>
                <td>{item.dataHora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;