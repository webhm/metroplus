let corteModel = {
    listado: [],
    secuencialCorte: '',
    informeId: '',
    letras: 'ABCDEFGHJKLMNPQRSTUVWXYZ',

    cargarListado: function(informeId) {
        m.request({
            method: "GET",
            url: "http://localhost:8000/api/v1/cortes?informeid=" + informeId,
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            if (result) {
                corteModel.listado = result.data;
            } else {
                corteModel.listado = [];
            }
            corteModel.secuencialCorte = '';
        })
        .catch(function(error) {
            corteModel.error = error;
            alert(corteModel.error);
        })
    },

    generarSecuencial: function() {
        if (corteModel.secuencialCorte.length === 0) {
            corteModel.secuencialCorte = corteModel.letras[0];
        } else {
            let indice = corteModel.letras.indexOf(corteModel.secuencialCorte);
            corteModel.secuencialCorte = corteModel.letras[indice + 1];
        }
    },

    guardar: (corte) => {
        m.request({
            method: 'POST',
            url: "http://localhost:8000/api/v1/cortes?informeid=" + corteModel.informeId,
            body:  corte,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            corteModel.cargarListado(corteModel.informeId);
            corteModel.secuencialCorte = '';
        })
        .catch(function(error) {
            corteModel.error = "Se produjo error guardando el corte: " + error.response.message;
            alert(corteModel.error);
        }) 
    },

    actualizar: (corte) => {
        m.request({
            method: 'PUT',
            url: "http://localhost:8000/api/v1/cortes/" + corte.id + "?informeid=" + corteModel.informeId,
            body:  corte,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            corteModel.cargarListado(corteModel.numeroPedido);
            corteModel.secuencialCorte = '';
        })
        .catch(function(error) {
            corteModel.error = "Se produjo error guardando el corte: " + error.response.message;
            alert(corteModel.error);
        }) 
    },  
}

export default corteModel;