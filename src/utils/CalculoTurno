export function calcularTempoProdutivo(timestampInicial) {

  if (!timestampInicial) {
    return "0min";
  }

  const agora = new Date();

  let inicio =
    new Date(timestampInicial);

  let minutosProdutivos = 0;

  while (inicio < agora) {

    const diaSemana =
      inicio.getDay();

    // Domingo = 0
    // Sábado = 6

    if (
      diaSemana !== 0 &&
      diaSemana !== 6
    ) {

      const hora =
        inicio.getHours();

      const minuto =
        inicio.getMinutes();

      const minutosAtual =
        hora * 60 + minuto;

      // Segunda a quinta
      const inicioManha =
        6 * 60 + 50;

      const fimManha =
        11 * 60 + 20;

      const inicioTarde =
        12 * 60 + 50;

      let fimTarde =
        17 * 60 + 20;

      // Sexta
      if (diaSemana === 5) {

        fimTarde =
          16 * 60 + 20;

      }

      const dentroTurno = (

        (
          minutosAtual >= inicioManha &&
          minutosAtual < fimManha
        )

        ||

        (
          minutosAtual >= inicioTarde &&
          minutosAtual < fimTarde
        )

      );

      if (dentroTurno) {

        minutosProdutivos++;

      }

    }

    inicio =
      new Date(
        inicio.getTime() + 60000
      );
  }

  const horas =
    Math.floor(
      minutosProdutivos / 60
    );

  const minutos =
    minutosProdutivos % 60;

  if (horas > 0) {

    return `${horas}h ${minutos}min`;

  }

  return `${minutos}min`;
}