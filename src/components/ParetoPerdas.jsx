function ParetoPerdas({
  historico,
}) {

  const motivos = {};



  historico.forEach((evento) => {

    if (
      evento.novoStatus === "Parado" &&
      evento.motivoParada
    ) {

      const motivo =
        evento.motivoParada;

      motivos[motivo] =
        (motivos[motivo] || 0) + 1;
    }
  });



  const ranking =
    Object.entries(motivos)

      .sort((a, b) => b[1] - a[1]);



  return (

    <div className="pareto-box">

      <h2>
        Pareto de Perdas
      </h2>



      {ranking.length === 0 && (

        <p className="sem-dados">

          Sem dados de parada

        </p>
      )}



      {ranking.map(([motivo, total]) => (

        <div
          key={motivo}
          className="pareto-item"
        >

          <div className="pareto-topo">

            <span>
              {motivo}
            </span>

            <strong>
              {total}
            </strong>

          </div>

          <div className="pareto-barra-bg">

            <div
              className="pareto-barra"
              style={{
                width: `${total * 10}px`,
              }}
            />

          </div>

        </div>
      ))}

    </div>
  );
}

export default ParetoPerdas;