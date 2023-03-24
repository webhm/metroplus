let informeModel = {
    listado: [],
    muestras: [],
    muestrasAsociadas: [],
    error: '',
    secuencialInforme: '',
    consecutivo: '',
    numeroPedido: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '', 
    medico:'',   
    
    cargarListado: function(numeropedidomv) {
        m.request({
            method: "GET",
            url: "http://localhost:8000/api/v1/informe?nopedidomv=" + numeropedidomv,
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

    cargarMuestras: (numeropedidomv) => {
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
            informeModel.muestras = result.data;
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
            informeModel.informecreaddo = result.data;
        })
        .catch(function(error) {
            informeModel.error = "Se produjo error guardando el Informe: " + error;
            alert(informeModel.error);
        }) 
    },

    generarSecuencial: function(year, idtipoinforme) {
        m.request({
            method: "GET",
            url: "http://localhost:8000/api/v1/informe/generarsecuencial/" + year + "/" + idtipoinforme,
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            informeModel.secuencialInforme = result.secuencialinforme;
            informeModel.consecutivo = result.consecutivo;
        })
        .catch(function(error) {
            informeModel.error = error;
            alert(informeModel.error);
        })   
    },    

    actualizar: (informe) => {
        m.request({
            method: 'PUT',
            url: "http://localhost:8000/api/v1/informe/" + muestra.id + "?nopedidomv=" + informeModel.numeroPedido,
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
            informeModel.error = "Se produjo error guardando la muestra: " + error;
            alert(informeModel.error);
        }) 
    },  
}

export default informeModel;