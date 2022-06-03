// Pages here
import App from '../views/app'
import Salir from '../views/salir'
import Login from '../views/login/login'
import Laboratorio from '../views/laboratorio/laboratorio'
import LaboratorioPedidos from '../views/laboratorio/pedidos/pedidos'
import Pacientes from '../views/pacientes/pacientes';
import MiPerfil from '../views/perfil/perfil';
import _404 from '../views/404';
import Inicio from '../views/inicio/inicio';
import ReloadNotification from '../views/layout/reload-notificacion';
import VerPedido from '../views/laboratorio/pedidos/verPedido'
import Emergencia from '../views/emergencia/emergencia'
import EmergenciaAuxiliarPedidosLaboratorio from '../views/emergencia/auxiliar/pedidos'
import VerPedidoAuxiliarEmergencia from '../views/emergencia/auxiliar/verPedido'




// Routes here
const Routes = {
    '/': App,
    '/inicio': Inicio,
    '/laboratorio': Laboratorio, //Laboratorio
    '/laboratorio/pedidos': LaboratorioPedidos, //LaboratorioPedidos
    '/laboratorio/pedido/:idPedido': VerPedido, //verPedido
    '/emergencia': Emergencia, //Emergencia
    '/emergencia/auxiliar/pedidos/laboratorio': EmergenciaAuxiliarPedidosLaboratorio, //EmergenciaAuxiliarPedidosLaboratorio
    '/emergencia/auxiliar/pedido/:idPedido': VerPedidoAuxiliarEmergencia, //EmergenciaAuxiliarPedidosLaboratorio
    '/emergencia/enfermeria/pedidos/laboratorio': EmergenciaAuxiliarPedidosLaboratorio, //EmergenciaAuxiliarPedidosLaboratorio
    '/emergencia/enfermeria/pedido/:idPedido': VerPedidoAuxiliarEmergencia, //EmergenciaAuxiliarPedidosLaboratorio
    '/auth': Login, // Login
    '/pacientes': Pacientes, // Pacientes
    '/mi-perfil': MiPerfil, // MiPerfil
    '/salir': Salir, // Salir
    '/notificaciones': ReloadNotification, // ReloadNotificaciones
    "/:404...": _404
};

const DefaultRoute = '/';

export { Routes, DefaultRoute }