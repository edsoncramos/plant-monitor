function KPICards({
  maquinas = [],
  historico = [],
}) {

  function getStatusAtual(
    nomeMaquina
  ) {

    if (
      !Array.isArray(historico)
    ) {
      return "Funcionando";
    }

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

  const funcionando =
    maquinas.filter(
      (m) =>
        getStatusAtual(m.nome) ===
        "Funcionando"
    ).length;

  const paradas =
    maquinas.filter(
      (m) =>
        getStatusAtual(m.nome) ===
        "Parado"
    ).length;

  const setup =
    maquinas.filter(
      (m) =>
        getStatusAtual(m.nome) ===
        "Setup"
    ).length;

  const manutencao =
    maquinas.filter(
      (m) =>
        getStatusAtual(m.nome) ===
        "Manutenção"
    ).length;

  return (

    <div className="kpi-grid">

      <div className="kpi-card funcionando">

        <h3>
          FUNCIONANDO
        </h3>

        <span>
          {funcionando}
        </span>

      </div>

      <div className="kpi-card parado">

        <h3>
          PARADAS
        </h3>

        <span>
          {paradas}
        </span>

      </div>

      <div className="kpi-card setup">

        <h3>
          SETUP
        </h3>

        <span>
          {setup}
        </span>

      </div>

      <div className="kpi-card manutencao">

        <h3>
          MANUTENÇÃO
        </h3>

        <span>
          {manutencao}
        </span>

      </div>

    </div>

  );
}

export default KPICards;