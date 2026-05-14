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
      orderBy("dataHora", "desc")
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h1>Plant Monitor</h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
          }}
        />

        <button
          onClick={fazerLogin}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1>Plant Monitor</h1>
          <p>Controle manual de funcionamento dos equipamentos</p>
        </div>

        <div>
          <p>{usuario.email}</p>

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

            <p
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
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
          </div>
        ))}
      </div>

      <div className="historico">
        <h2>Histórico de Eventos</h2>

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
            {historico.map((item) => (
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
