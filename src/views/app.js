import Auth from '../models/auth';
import Loader from './loader';
import ls from 'localstorage-slim';
import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';


const App = {
    title: "Metrovirtual v4.0",
    oninit: () => {
        document.title = "Cargando...";
    },
    oncreate: () => {
        document.title = "Bienvenido | " + App.title;

    },
    isAuth: () => {
        if (Auth.isLogin()) {
            return m.route.set('/inicio');
        } else {
            return m.route.set('/auth');
        }
    },
    view: () => {
        return [
            m(Loader),
            setTimeout(function() { App.isAuth() }, 300)
        ];
    },
};




export default App;