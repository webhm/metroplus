import Auth from '../models/auth';
import Loader from './loader';
import Encrypt from '../models/encrypt';



const App = {
    title: "MetroPlus v1.0.0",
    oninit: () => {

        document.title = "Cargando...";
    },
    oncreate: () => {
        document.title = "Bienvenido | " + App.title;

    },
    isAuth: (modulo = "", idModulo = 0) => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }


        let _user = Encrypt.getDataUser();
        Auth.user = _user.user;
        Auth.rol = _user.user.rol;
        Auth.modulesAccess = _user.modulesAccess;

        if (idModulo !== 0) {
            let _ac = 0;
            return [
                Auth.modulesAccess[modulo].map(function (_v, _i, _contentData) {
                    if (_v.idModulo == idModulo) {
                        _ac = (_ac + 1);
                    }

                }),
                (_ac == 0) ? m.route.set('/inicio') : true,
                (Auth.rol)
            ]
        }

    },
    view: () => {
        return [
            m(Loader),
            setTimeout(function () {
                App.isAuth()
                m.route.set('/inicio');
            }, 300)
        ];
    },
};







export default App;