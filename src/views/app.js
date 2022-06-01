import Auth from '../models/auth';
import Loader from './loader';


const App = {
    title: "Metrovirtual Admin v1.0.0",
    oninit: () => {

        document.title = "Cargando...";
    },
    oncreate: () => {
        document.title = "Bienvenido | " + App.title;

    },
    isAuth: () => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
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