import m from 'mithril';

var informeModel = {
    listado: [],
    error: '',
    numeroPedido: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    muestraId: '',
    
    cargarListado: function(numeropedidomv) {
        m.request({
            method: "GET",
            url: "http://localhost:8000/api/v1/muestras?nopedidomv=" + numeropedidomv,
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            informeModel.listado = result.data;
        })
        .catch(function(error) {
            informeModel.error = error;
            alert(informeModel.error);
        })
    },

    guardar: (informe) => {
        m.request({
            method: 'POST',
            url: "http://localhost:8000/api/v1/informe",
            body:  informe,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            resultado = result;
        })
        .catch(function(error) {
            informeModel.error = "Se produjo error guardando la muestra: " + error.response.message;
            alert(informeModel.error);
        }) 
    },

    generarSecuencial: function() {
        m.request({
            method: "GET",
            url: "http://localhost:8000/api/v1/informe/generarsecuencial",
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            informeModel.secuencialInforme = result.id + 1;
        })
        .catch(function(error) {
            muestraModel.error = error;
            alert(muestraModel.error);
        })   
    },    

    actualizar: (informe) => {
        m.request({
            method: 'PUT',
            url: "http://localhost:8000/api/v1/muestras/" + muestra.id + "?nopedidomv=" + informeModel.numeroPedido,
            body:  muestra,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            informeModel.cargarListado(informeModel.numeroPedido);
        })
        .catch(function(error) {
            informeModel.error = "Se produjo error guardando la muestra: " + error.response.message;
            alert(informeModel.error);
        }) 
    },  
}

export default informeModel;