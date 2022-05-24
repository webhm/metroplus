import m from "mithril";

const Notificaciones = {
    num: 0,
    show: "d-none",
    message: " tenemos nueva información disponible para ti. Click aquí!.",
    timestamp: "",
    setNot: () => {
        Notificaciones.num = Notificaciones.num + 1;
        if (Notificaciones.num !== 0) {
            Notificaciones.show = "";
        } else {
            Notificaciones.show = "d-none";
        }
    },
    view: () => {
        return [
            m("div.dropdown.dropdown-notification",
                [
                    m("a.dropdown-link.new-indicator[href=''][data-toggle='dropdown']",
                        [
                            m("i[data-feather='bell']"),
                            m("span." + Notificaciones.show,
                                Notificaciones.num
                            )
                        ]
                    ),
                    m("div.dropdown-menu.dropdown-menu-right",
                        [
                            m("div.dropdown-header",
                                "Notificaciones"
                            ),
                            m("a.dropdown-item", {
                                href: "#!/notificaciones/?loadPge=" + Notificaciones.loadPage,
                            },
                                m("div.media",
                                    [

                                        m("div.media-body.mg-l-15",
                                            [
                                                m("p",
                                                    [
                                                        m("strong",
                                                            "Metrovirtual "
                                                        ),
                                                        Notificaciones.message
                                                    ]
                                                ),
                                                m("span",
                                                    Notificaciones.timestamp
                                                )
                                            ]
                                        )
                                    ]
                                )
                            ),
                            m("div.dropdown-footer",
                                m("a[href='']",
                                    "Ver Todo"
                                )
                            )
                        ]
                    )
                ]
            ),
        ];
    },
};




export default Notificaciones;