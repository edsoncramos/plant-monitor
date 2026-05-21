function ParetoPerdas({ historico = [] }) {

  const perdas = {};

  historico.forEach((item) => {

    if (
      item.novoStatus === "Parado" &&
      item.motivo
    ) {

      if (!perdas[item.motivo]) {
        perdas[item.motivo] = 0;
      }

      perdas[item.motivo]++;

    }

  });

  const dados =
    Object.entries(perdas)
      .map(([motivo, total]) => ({
        motivo,
        total,
      }))
      .sort(
        (a, b) =>
          b.total - a.total
      );

  if (dados.length === 0) {

    return (
      <div className="pareto-container">

        <h2>
          Pareto de Perdas
        </h2>

        <p>
          Nenhuma parada registrada.
        </p>

      </div>
    );
  }

  return (

    <div className="pareto-container">

      <h2>
        Pareto de Perdas
      </h2>

      <div className="pareto-list">

        {dados.map((item) => (

          <div
            key={item.motivo}
            className="pareto-item"
          >

            <span>
              {item.motivo}
            </span>

            <strong>
              {item.total}
            </strong>

          </div>

        ))}

      </div>

    </div>

  );
}

export default ParetoPerdas;