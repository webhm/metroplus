// Pages here
import App from '../views/app'
import RedirMV from '../views/redir'
import Salir from '../views/salir'
import Login from '../views/login/login'
import Laboratorio from '../views/laboratorio/laboratorio'
import NotificacionesLab from '../views/laboratorio/notificaciones/notificaciones'
import SubscribirCanal from '../models/subscribirCanal'
import FiltrosLab from '../views/laboratorio/notificaciones/filtros'
import NotificacionesEnviadasLab from '../views/laboratorio/notificaciones/enviadas'
import LaboratorioPedidos from '../views/laboratorio/pedidos/pedidos'
import LaboratorioFlebotomista from '../views/laboratorio/flebotomista/flebotomista'
import LaboratorioFormularios from '../views/laboratorio/formularios/formularios'
import MiPerfil from '../views/perfil/perfil';
import _404 from '../views/404';
import Inicio from '../views/inicio/inicio';
import ReloadNotification from '../views/layout/reload-notificacion';
import Emergencia from '../views/emergencia/emergencia'
import EmergenciaAuxiliarPedidosLaboratorio from '../views/emergencia/auxiliar/pedidos'
import VerPedidoAuxiliarEmergencia from '../views/emergencia/auxiliar/verPedido'
import EmergenciaEnfermeriaPedidosLaboratorio from '../views/emergencia/enfermeria/pedidos'
import VerPedidoEnfermeriaEmergencia from '../views/emergencia/enfermeria/verPedido'
import Farmacia from '../views/farmacia//farmacia'
import FarmaciaRecetasAlta from '../views/farmacia//recetas/recetasAlta'
import Admisiones from '../views/admisiones/admisiones'
import PreAdmisiones from '../views/admisiones/pacientes/preadmisiones'
import Mantenimiento from '../views/mantenimiento/mantenimiento'
import IntegracionHigienizacion from '../views/mantenimiento/higienizacion/higienizacion'
import Hospitalizacion from '../views/hospitalizacion/hospitalizacion'
import Pasaportes from '../views/hospitalizacion/pasaportes/pasaportes'
import ControlCamas from '../views/hospitalizacion/controlCamas/controlCamas'
import NotificacionesPendientesLab from '../views/laboratorio/notificaciones/pendientes'
import NotificacionesErroresLab from '../views/laboratorio/notificaciones/errores'
import TRPedidos from '../views/laboratorio/notificaciones/tr'
import BSPedidos from '../views/laboratorio/notificaciones/bs'
import NSGPedidos from '../views/laboratorio/notificaciones/nsg'
import ImagenPedidos from '../views/imagen/pedidos/pedidos'
import ImagenPedido from '../views/imagen/pedidos/pedido'
import Imagen from '../views/imagen/imagen'
import HeaderPrivate from '../views/layout/header-private';


// Routes here
const Routes = {
    '/': App,
    '/subscribir/notificaciones': SubscribirCanal, //SubscribirCanal
    '/redir/mv/:idAtencion': RedirMV, //RedirMV
    '/inicio': Inicio,
    '/laboratorio': Laboratorio, //Laboratorio
    '/laboratorio/notificaciones': NotificacionesLab, //NotificacionesLab
    '/laboratorio/notificaciones/filtros': FiltrosLab, //FiltrosLab
    '/laboratorio/notificaciones/enviadas': NotificacionesEnviadasLab, //NotificacionesEnviadasLab
    '/laboratorio/notificaciones/pendientes': NotificacionesPendientesLab, //NotificacionesPendientesLab
    '/laboratorio/notificaciones/error': NotificacionesErroresLab, //NotificacionesErroresLab
    '/laboratorio/flebotomista': LaboratorioFlebotomista, //LaboratorioFlebotomista Hospitalizacion,
    '/laboratorio/pedidos': LaboratorioPedidos, //LaboratorioPedidos Recepción Pedidos,
    '/laboratorio/formularios': LaboratorioFormularios, //LaboratorioPedidos
    '/emergencia': Emergencia, //Emergencia
    '/emergencia/auxiliar/pedidos/laboratorio': EmergenciaAuxiliarPedidosLaboratorio, //EmergenciaAuxiliarPedidosLaboratorio
    '/emergencia/auxiliar/pedido/:idPedido': VerPedidoAuxiliarEmergencia, //EmergenciaAuxiliarPedidosLaboratorio
    '/emergencia/enfermeria/pedidos/laboratorio': EmergenciaEnfermeriaPedidosLaboratorio, //EmergenciaEnfermeriaPedidosLaboratorio
    '/emergencia/enfermeria/pedido/:idPedido': VerPedidoEnfermeriaEmergencia, //VerPedidoEnfermeriaEmergencia
    '/farmacia': Farmacia, //Farmacia
    '/farmacia/recetas': FarmaciaRecetasAlta, //FarmaciaRecetasAlta
    '/admisiones': Admisiones, //Admisiones
    '/admisiones/pre': PreAdmisiones, //PreAdmisiones
    '/mantenimiento': Mantenimiento, //Mantenimiento
    '/mantenimiento/higienizacion': IntegracionHigienizacion, //IntegracionHigienizacion
    '/hospitalizacion': Hospitalizacion, //Hospitalizacion
    '/hospitalizacion/pasaportes': Pasaportes, //Pasaportes
    '/hospitalizacion/control-camas': ControlCamas, //Control Camas
    '/terapia-respiratoria/pedidos': TRPedidos, //TRPedidos
    '/bco-sangre/pedidos': BSPedidos, //BSPedidos
    '/neurofisiologia/pedidos': NSGPedidos, //NSGPedidos
    '/imagen': Imagen, // Imagen
    '/imagen/pedidos': {
        oninit: (_data) => {
            App.isAuth('laboratorio', 16);
            document.title = "Recepción de Pedidos | " + App.title;
            if (_data.attrs.idFiltro !== undefined) {
                ImagenPedidos.idFiltro = _data.attrs.idFiltro;
                ImagenPedidos.loader = true;
                ImagenPedidos.pedidos = [];
                ImagenPedidos.fetchPedidos();
            } else {
                return m.route.set('/imagen/pedidos/', { idFiltro: 1 })
            }
        },
        onupdate: (_data) => {
            if (_data.attrs.idFiltro !== ImagenPedidos.idFiltro) {
                ImagenPedidos.idFiltro = _data.attrs.idFiltro;
                ImagenPedidos.loader = true;
                ImagenPedidos.pedidos = [];
                ImagenPedidos.fetchPedidos();
                m.redraw();
            }
        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("imagen") }),
                m(ImagenPedidos),
            ];
        },

    }, // ImagenPedidos
    '/imagen/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return ImagenPedido;
            } else {
                return m.route.SKIP;
            }
        }
    }, // ImagenPedidos
    '/auth': Login, // Login
    '/mi-perfil': MiPerfil, // MiPerfil
    '/salir': Salir, // Salir
    '/notificaciones': ReloadNotification, // ReloadNotificaciones
    "/:404...": _404
};


const DefaultRoute = '/';

export { Routes, DefaultRoute }