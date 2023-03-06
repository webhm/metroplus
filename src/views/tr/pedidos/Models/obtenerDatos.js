import m from "mithril";

const terapiaRespiratoriaController = {
  lista: [],
  error: "",
  listaDeFrecuenciaCardiaca: [],
  listaDeFrecuenciaRespiratoria: [],
  listaDePeso: [],
  listaEscalaDelDolor: [],

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
};

export default terapiaRespiratoriaController;
