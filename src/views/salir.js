const Salir = {
    oncreate: () => {
        window.localStorage.removeItem('accessToken');
        return m.route.set('/laboratorio');
    },

    view: () => {

    },
};

export default Salir;