import Auth from '../../models/auth';
import HeaderPublic from '../layout/header-public';
import FooterPublic from '../layout/footer-public';
import FormLogin from './formlogin';
import App from '../app';

const Login = {
    oninit: () => {
        if (Auth.isLogin()) {
            return m.route.set('/laboratorio');
        }
    },
    oncreate: () => {
        document.title = "Entrar | " + App.title;
        submitLogin();
    },
    view: () => {
        return [
            m(HeaderPublic),
            m(FormLogin),
        ];
    },
};

function submitLogin() {
    document.onkeypress = function(e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == "13") {
            if (Auth.canSubmit()) {
                $('button').click();
            }
        }
    };
}

export default Login;