function KPICards({
  maquinas,
  historico,
}) {

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

  const disponibilidade =
    (
      (funcionando /
        maquinas.length) *
      100
    ).toFixed(1);

  return (

    <div className="kpi-grid">

      <div className="kpi-card funcionando">

        <h3>Funcionando</h3>

        <span>
          {funcionando}
        </span>

      </div>

      <div className="kpi-card parado">

        <h3>Paradas</h3>

        <span>
          {paradas}
        </span>

      </div>

      <div className="kpi-card setup">

        <h3>Setup</h3>

        <span>
          {setup}
        </span>

      </div>

      <div className="kpi-card manutencao">

        <h3>Manutenção</h3>

        <span>
          {manutencao}
        </span>

      </div>

      <div className="kpi-card disponibilidade">

        <h3>Disponibilidade</h3>

        <span>
          {disponibilidade}%
        </span>

      </div>

    </div>

  );
}

export default KPICards;