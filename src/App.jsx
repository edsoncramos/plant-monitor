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
  const [filtroSetor, setFiltroSetor] = useState("TODOS");

  const maquinas = [
    {
      id: 1,
      nome: "11100.101 - Corte blank mesa - PR",
      setor: "CORTE",
      status: "Funcionando",
    },
    {
      id: 2,
      nome: "11100.102 - Corte blank cuba - PR",
      setor: "CORTE",
      status: "Funcionando",
    },
    {
      id: 3,
      nome: "11100.103 - Corte Blank Calha - PR",
      setor: "CORTE",
      status: "Funcionando",
    },
    {
      id: 4,
      nome: "11200.200 - Máquina Laser",
      setor: "CORTE",
      status: "Funcionando",
    },
    {
      id: 5,
      nome: "11200.201 - Laser LXSHOW - 6000W",
      setor: "CORTE",
      status: "Funcionando",
    },
    {
      id: 6,
      nome: "11300.319 - Hidráulica Yucel 800T",
      setor: "ESTAMPAGEM",
      status: "Funcionando",
    },
    {
      id: 7,
      nome: "11300.320 - Hidráulica Yucel 600T",
      setor: "ESTAMPAGEM",
export default App;
