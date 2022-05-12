// Pages here
import App from '../views/app'
import Salir from '../views/salir'
import Login from '../views/login/login'
import Laboratorio from '../views/laboratorio/laboratorio'
import LaboratorioPedidos from '../views/laboratorio/pedidos/pedidos'
import Pacientes from '../views/pacientes/pacientes';
import MiPerfil from '../views/perfil/perfil';
import _404 from '../views/404'





// Routes here
const Routes = {
    '/': App,
    '/laboratorio': Laboratorio, //Laboratorio
    '/laboratorio/pedidos': LaboratorioPedidos, //LaboratorioPedidos
    '/auth': Login, // Login
    '/pacientes': Pacientes, // Pacientes
    '/mi-perfil': MiPerfil, // MiPerfil
    '/salir': Salir, // Salir
    "/:404...": _404
};

const DefaultRoute = '/';

export { Routes, DefaultRoute }