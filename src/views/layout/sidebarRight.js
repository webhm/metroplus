import Auth from '../../models/auth';
import Notificaciones from '../../models/notificaciones';

const vRol = {

    view: () => {


        if (Auth.rol == 1) {
            return "Administrador";
        }

        if (Auth.rol == 2) {
            return "Coordinador";
        }

        if (Auth.rol == 3) {
            return "Gestionador";
        }

        if (Auth.rol == 4) {
            return "Operador";
        }

        if (Auth.rol == 4) {
            return "Usuario";
        }


    },
};

const SidebarRight = {
    view: () => {
        return [
            m("div.navbar-right", [

                m(Notificaciones),
                m("div.dropdown.dropdown-profile", [
                    m("a.dropdown-link[href=''][data-toggle='dropdown'][data-display='static']",
                        m("div.avatar.avatar-sm",
                            m("i[data-feather='user']"),
                        )
                    ),
                    m("div.dropdown-menu.dropdown-menu-right.tx-13", [

                        m("h6.tx-semibold.mg-b-5",
                            (Auth.user.user !== undefined) ? Auth.user.user.toUpperCase() : ""

                        ),
                        m("p.mg-b-25.tx-12.tx-color-03", [
                            m(vRol)
                        ]),
                        m(m.route.Link, { href: "/", class: "dropdown-item d-none" }, [
                            m("i[data-feather='user']"),
                            " Mi Perfil "
                        ]),

                        m("div.dropdown-divider"),
                        m("p.mg-5.text-left", [
                            m(m.route.Link, { href: "/salir", class: "dropdown-item" }, [
                                m("span.badge.badge-light.wd-100p.tx-14",
                                    "Cerrar Sesión"
                                ),
                            ]),
                        ]),


                    ])
                ])
            ])

        ];
    },
};




export default SidebarRight;