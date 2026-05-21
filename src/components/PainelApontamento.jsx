function PainelApontamento({
  maquinas,
  maquinaSelecionada,
  setMaquinaSelecionada,
  motivoParada,
  setMotivoParada,
  registrarEvento,
}) {

  return (

    <div className="painel-apontamento">

      <select
        value={maquinaSelecionada}
        onChange={(e) =>
          setMaquinaSelecionada(
            e.target.value
          )
        }
      >

        <option value="">
          Selecione uma máquina
        </option>

        {maquinas.map((maquina) => (

          <option
            key={maquina.id}
            value={maquina.nome}
          >

            {maquina.nome}

          </option>

        ))}

      </select>

      <select
        value={motivoParada}
        onChange={(e) =>
          setMotivoParada(
            e.target.value
          )
        }
      >

        <option value="">
          Motivo da parada
        </option>

        <option value="Sem demanda">
          Sem demanda
        </option>

        <option value="Ferramenta">
          Ferramenta
        </option>

        <option value="Qualidade">
          Qualidade
        </option>

        <option value="Processo">
          Processo
        </option>

        <option value="Manutenção">
          Manutenção
        </option>

      </select>

      <button
        className="btn-funcionando"
        onClick={() =>
          registrarEvento(
            "Funcionando"
          )
        }
      >
        Funcionando
      </button>

      <button
        className="btn-parada"
        onClick={() =>
          registrarEvento(
            "Parado"
          )
        }
      >
        Parada
      </button>

      <button
        className="btn-setup"
        onClick={() =>
          registrarEvento(
            "Setup"
          )
        }
      >
        Setup
      </button>

      <button
        className="btn-manutencao"
        onClick={() =>
          registrarEvento(
            "Manutenção"
          )
        }
      >
        Manutenção
      </button>

    </div>

  );
}

export default PainelApontamento;