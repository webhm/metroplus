import Auth from '../../models/auth';
import Notificaciones from '../../models/notificaciones';


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
                            (Auth.rol == 1) ? "Administrador" : "",
                            (Auth.rol == 2) ? "Coordinador" : "",
                            (Auth.rol == 3) ? "Gestionador" : "",
                            (Auth.rol == 4) ? "Operador" : "",
                            (Auth.rol == 5) ? "Usuario" : "",
                        ]
                        ),
                        m("a.dropdown-item", { href: "#!/mi-perfil" }, [
                            m("i[data-feather='user']"),
                            " Mi Perfil "
                        ]),
                        m("div.dropdown-divider"),

                        m("a.dropdown-item", { href: "#!/salir" }, [
                            m("i[data-feather='log-out']"),
                            "Salir"
                        ])
                    ])
                ])
            ])

        ];
    },
};




export default SidebarRight;