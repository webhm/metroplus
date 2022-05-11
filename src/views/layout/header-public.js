const HeadPublic = {
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [
                m("a.burger-menu[href='#'][id='mainMenuOpen']",
                    m("i[data-feather='menu']")
                ),
                m("div.navbar-brand",
                    m("a.df-logo", { href: "/" }, [
                        "Metro",
                        m("span",
                            "Q"
                        )
                    ])
                ),
                m(".navbar-menu-wrapper[id='navbarMenu']", [
                    m("div.navbar-menu-header", [
                        m("a.df-logo", { href: "/" }, [
                            "Metro",
                            m("span",
                                "Q"
                            )
                        ]),
                        m("a[id='mainMenuClose'][href='']",
                            m("i[data-feather='x']")
                        )
                    ]),
                    m("ul.nav.navbar-menu", [
                        m("li.nav-label.pd-l-20.pd-lg-l-25.d-lg-none",
                            "Menu"
                        ),
                        m("li.nav-item", [
                            m("a.nav-link", { href: "/" }, [
                                m("i[data-feather='pie-chart']"),
                                " Inicio "
                            ]),

                        ]),
                        m("li.nav-item.with-sub", [
                            m("a.nav-link", { href: "" }, [
                                m("i[data-feather='box']"),
                                " Laboratorio "
                            ]),
                            m("ul.navbar-menu-sub", [
                                m("li.nav-sub-item",
                                    m("a.nav-sub-link", { href: "#!/laboratorio/notificaciones" }, [
                                        m("i[data-feather='box']"),
                                        "Notificaciones de Laboratorio"
                                    ])
                                ),
                                m("li.nav-sub-item",
                                    m("a.nav-sub-link", { href: "#!/laboratorio/pedidos" }, [
                                        m("i[data-feather='box']"),
                                        "Pedidos de Laboratorio"
                                    ])
                                ),

                            ])
                        ]),
                        m("li.nav-item.with-sub", [
                            m("a.nav-link[href='']", [
                                m("i[data-feather='layers']"),
                                " Pages"
                            ]),
                            m("div.navbar-menu-sub",
                                m("div.d-lg-flex", [
                                    m("ul", [
                                        m("li.nav-label",
                                            "Authentication"
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-signin.html']", [
                                                m("i[data-feather='log-in']"),
                                                " Sign In"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-signup.html']", [
                                                m("i[data-feather='user-plus']"),
                                                " Sign Up"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-verify.html']", [
                                                m("i[data-feather='user-check']"),
                                                " Verify Account"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-forgot.html']", [
                                                m("i[data-feather='shield-off']"),
                                                " Forgot Password"
                                            ])
                                        ),
                                        m("li.nav-label.mg-t-20",
                                            "User Pages"
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-profile-view.html']", [
                                                m("i[data-feather='user']"),
                                                " View Profile"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-connections.html']", [
                                                m("i[data-feather='users']"),
                                                " Connections"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-groups.html']", [
                                                m("i[data-feather='users']"),
                                                " Groups"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-events.html']", [
                                                m("i[data-feather='calendar']"),
                                                " Events"
                                            ])
                                        )
                                    ]),
                                    m("ul", [
                                        m("li.nav-label",
                                            "Error Pages"
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-404.html']", [
                                                m("i[data-feather='file']"),
                                                " 404 Page Not Found"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-500.html']", [
                                                m("i[data-feather='file']"),
                                                " 500 Internal Server"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-503.html']", [
                                                m("i[data-feather='file']"),
                                                " 503 Service Unavailable"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-505.html']", [
                                                m("i[data-feather='file']"),
                                                " 505 Forbidden"
                                            ])
                                        ),
                                        m("li.nav-label.mg-t-20",
                                            "Other Pages"
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-timeline.html']", [
                                                m("i[data-feather='file-text']"),
                                                " Timeline"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-pricing.html']", [
                                                m("i[data-feather='file-text']"),
                                                " Pricing"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-help-center.html']", [
                                                m("i[data-feather='file-text']"),
                                                " Help Center"
                                            ])
                                        ),
                                        m("li.nav-sub-item",
                                            m("a.nav-sub-link[href='page-invoice.html']", [
                                                m("i[data-feather='file-text']"),
                                                " Invoice"
                                            ])
                                        )
                                    ])
                                ])
                            )
                        ]),
                        m("li.nav-item",
                            m("a.nav-link[href='../../components/']", [
                                m("i[data-feather='box']"),
                                " Components"
                            ])
                        ),
                        m("li.nav-item",
                            m("a.nav-link[href='../../collections/']", [
                                m("i[data-feather='archive']"),
                                " Collections"
                            ])
                        )
                    ])
                ]),
                m("div.navbar-right", [
                    m("a.btn.btn-buy[href='https://www.hospitalmetropolitano.org']", [
                        m("span",
                            "Hospital Metropolitano"
                        )
                    ])
                ])
            ])
        ];
    },

};

export default HeadPublic;