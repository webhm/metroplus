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
                            "Usuario"
                        ),
                        m("p.mg-b-25.tx-12.tx-color-03",
                            "Administrator"
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