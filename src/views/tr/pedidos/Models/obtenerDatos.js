import m from "mithril";

const terapiaRespiratoriaController = {
  lista: [],
  error: "",
  listaDeFrecuenciaCardiaca: [],
  listaDeFrecuenciaRespiratoria: [],
  listaDePeso: [],
  listaEscalaDelDolor: [],
  fechaActual: "",
  horaActual: "",
  habilitarCampos: false,
  datosEnviadosDelFormulario: [],
  datosGuardados: [],
  bloquearCamposCuandoSeGuarda: false,

  cargarPrescripcion: function (numeroDeAtendimiento) {
    m.request({
      method: "GET",
      url: `https://api.hospitalmetropolitano.org/t/v1/tr/formularios/sv?PARAM=PRESC&&CD_ATENDIMENTO=${numeroDeAtendimiento}`,
      body: {},
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: localStorage.accessToken,
      },
    })
      .then(function (resultado) {
        if (resultado.status && resultado.data.length > 0) {
          terapiaRespiratoriaController.lista = resultado;
          //terapiaRespiratoriaController.habilitarCampos = true;
        } else {
          terapiaRespiratoriaController.error = resultado.error;
          terapiaRespiratoriaController.habilitarCampos = true;
          return m("div", {class: "modal"}, "La lista está vacía");
          //alert(terapiaRespiratoriaController.error);
        }
      })
      .catch(function (error) {
        terapiaRespiratoriaController.error = error;
        terapiaRespiratoriaController.habilitarCampos = true;
        //alert(terapiaRespiratoriaController.error);
      });
  },

  cargarFrecuenciaCardiaca: function (numeroDeAtendimiento) {
    m.request({
      method: "GET",
      url: `https://api.hospitalmetropolitano.org/t/v1/tr/formularios/sv?PARAM=FRECUENCIA_CARDIACA&CD_ATENDIMENTO=${numeroDeAtendimiento}`,
      body: {},
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: localStorage.accessToken,
      },
    })
      .then(function (resultado) {
        if (resultado.status) {
          terapiaRespiratoriaController.listaDeFrecuenciaCardiaca = resultado;
        } else {
          terapiaRespiratoriaController.error = resultado.error;
          alert(terapiaRespiratoriaController.error);
        }
      })
      .catch(function (error) {
        terapiaRespiratoriaController.error = error;
        alert(terapiaRespiratoriaController.error);
      });
  },
  cargarFrecuenciaRespiratoria: function (numeroDeAtendimiento) {
    m.request({
      method: "GET",
      url: `https://api.hospitalmetropolitano.org/t/v1/tr/formularios/sv?PARAM=FRECUENCIA_RESPIRATORIA&CD_ATENDIMENTO=${numeroDeAtendimiento}`,
      body: {},
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: localStorage.accessToken,
      },
    })
      .then(function (resultado) {
        if (resultado.status) {
          terapiaRespiratoriaController.listaDeFrecuenciaRespiratoria =
            resultado;
        } else {
          terapiaRespiratoriaController.error = resultado.error;
          alert(terapiaRespiratoriaController.error);
        }
      })
      .catch(function (error) {
        terapiaRespiratoriaController.error = error;
        alert(terapiaRespiratoriaController.error);
      });
  },

  cargarPeso: function (numeroDeAtendimiento) {
    m.request({
      method: "GET",
      url: `https://api.hospitalmetropolitano.org/t/v1/tr/formularios/sv?PARAM=PESO&CD_ATENDIMENTO=${numeroDeAtendimiento}`,
      body: {},
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: localStorage.accessToken,
      },
    })
      .then(function (resultado) {
        if (resultado.status) {
          terapiaRespiratoriaController.listaDePeso = resultado;
        } else {
          terapiaRespiratoriaController.error = resultado.error;
          alert(terapiaRespiratoriaController.error);
        }
      })
      .catch(function (error) {
        terapiaRespiratoriaController.error = error;
        alert(terapiaRespiratoriaController.error);
      });
  },

  cargarEscalaDelDolor: function (numeroDeAtendimiento) {
    m.request({
      method: "GET",
      url: `https://api.hospitalmetropolitano.org/t/v1/tr/formularios/sv?PARAM=ESCALA_DOLOR&CD_ATENDIMENTO=${numeroDeAtendimiento}`,
      body: {},
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: localStorage.accessToken,
      },
    })
      .then(function (resultado) {
        if (resultado.status) {
          terapiaRespiratoriaController.listaEscalaDelDolor = resultado;
        } else {
          terapiaRespiratoriaController.error = resultado.error;
          alert(terapiaRespiratoriaController.error);
        }
      })
      .catch(function (error) {
        terapiaRespiratoriaController.error = error;
        alert(terapiaRespiratoriaController.error);
      });
  },

  cargarFechaActual: function () {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${anio}`;
    terapiaRespiratoriaController.fechaActual = fechaFormateada;
  },

  cargarHoraActual: function () {
    const fechaActual = new Date();
    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();
    
    const horaFormateada = `${hora}:${minutos}:${segundos}`;
    terapiaRespiratoriaController.horaActual = horaFormateada;
  },

  guardar: (formularioTerapiaRespiratoria) => {
    m.request({
        method: 'POST',
        url: "https://api.hospitalmetropolitano.org/t/v1/tr/formularios",
        body:  formularioTerapiaRespiratoria,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json",
            "Authorization": localStorage.accessToken,
        },
    })
    .then(function(result) {
        //resultado = result;
        /* if (result.status) {
          terapiaRespiratoriaController.datosEnviadosDelFormulario = result;
        }else{
          terapiaRespiratoriaController.error = result.error;
          alert(terapiaRespiratoriaController.error);
        } */
        terapiaRespiratoriaController.datosGuardados = result;
        terapiaRespiratoriaController.bloquearCamposCuandoSeGuarda = true;
        window.location.href = window.location.href;
    })
    .catch(function(error) {
      //terapiaRespiratoriaController.error = `No se pudo enviar los datos ${error}`;
      alert(error);
      console.log(error);
    }) 
},

};

export default terapiaRespiratoriaController;
