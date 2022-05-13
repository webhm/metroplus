const Sidebarlab = {
    page: "",
    setPage: (page) => {
        Sidebarlab.page = page;
    },
    view: () => {
        return [
            m(".sidebar.sidebar-fixed.sidebar-components[id='sidebarMenu']", [
                m("div.sidebar-header", [
                    m("a[href=''][id='mainMenuOpen']",
                        m("i[data-feather='menu']")
                    ),
                    m("h5",
                        "Menu"
                    ),
                    m("a[href=''][id='sidebarMenuClose']",
                        m("i[data-feather='x']")
                    )
                ]),
                m("div.sidebar-body",
                    m("ul.sidebar-nav", [
                        m("li.nav-label.mg-b-15",
                            "Laboratorio"
                        ),
                        m("li.nav-item.show", [
                            m("a.nav-link.with-sub[href='']", [
                                m("i[data-feather='layout']"),
                                " Laboratorio"
                            ]),
                            m("nav.nav", [
                                m("a." + ((Sidebarlab.page == "pedidosLaboratorio") ? "active" : ""), { href: "#!/laboratorio/pedidos" },
                                    "Pedidos de Laboratorio"
                                ),


                            ])
                        ]),

                    ])
                )
            ])
        ];
    },

};

export default Sidebarlab;