const HeaderPrivate = {
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m("a.df-logo", { href: "/" }, [
                        "Metro",
                        m("span",
                            "Q"
                        )
                    ])
                ),
                m(".navbar-menu-wrapper[id='navbarMenu']",
                    [
                        m("div.navbar-menu-header",
                            [
                                m("a.df-logo[href='../index.html']",
                                    [
                                        "dash",
                                        m("span",
                                            "forge"
                                        )
                                    ]
                                ),
                                m("a[id='mainMenuClose'][href='']",
                                    m("i[data-feather='x']")
                                )
                            ]
                        ),
                        m("ul.nav.navbar-menu",
                            [
                                m("li.nav-label.pd-l-20.pd-lg-l-25.d-lg-none",
                                    "Main Navigation"
                                ),
                                m("li.nav-item.with-sub",
                                    [
                                        m("a.nav-link[href='']",
                                            [
                                                m("i[data-feather='pie-chart']"),
                                                " Dashboard"
                                            ]
                                        ),
                                        m("ul.navbar-menu-sub",
                                            [
                                                m("li.nav-sub-item",
                                                    m("a.nav-sub-link[href='../template/classic/dashboard-one.html']",
                                                        [
                                                            m("i[data-feather='bar-chart-2']"),
                                                            "Sales Monitoring"
                                                        ]
                                                    )
                                                ),
                                                m("li.nav-sub-item",
                                                    m("a.nav-sub-link[href='../template/classic/dashboard-two.html']",
                                                        [
                                                            m("i[data-feather='bar-chart-2']"),
                                                            "Website Analytics"
                                                        ]
                                                    )
                                                ),
                                                m("li.nav-sub-item",
                                                    m("a.nav-sub-link[href='../template/classic/dashboard-three.html']",
                                                        [
                                                            m("i[data-feather='bar-chart-2']"),
                                                            "Cryptocurrency"
                                                        ]
                                                    )
                                                ),
                                                m("li.nav-sub-item",
                                                    m("a.nav-sub-link[href='../template/classic/dashboard-four.html']",
                                                        [
                                                            m("i[data-feather='bar-chart-2']"),
                                                            "Helpdesk Management"
                                                        ]
                                                    )
                                                )
                                            ]
                                        )
                                    ]
                                ),
                                m("li.nav-item.with-sub",
                                    [
                                        m("a.nav-link[href='']",
                                            [
                                                m("i[data-feather='package']"),
                                                " Apps"
                                            ]
                                        ),
                                        m("ul.navbar-menu-sub",
                                            [
                                                m("li.nav-sub-item",
                                                    m("a.nav-sub-link[href='../template/classic/app-calendar.html']",
                                                        [
                                                            m("i[data-feather='calendar']"),
                                                            "Calendar"
                                                        ]
                                                    )
                                                ),
                                                m("li.nav-sub-item",
                                                    m("a.nav-sub-link[href='../template/classic/app-chat.html']",
                                                        [
                                                            m("i[data-feather='message-square']"),
                                                            "Chat"
                                                        ]
                                                    )
                                                ),
                                                m("li.nav-sub-item",
                                                    m("a.nav-sub-link[href='../template/classic/app-contacts.html']",
                                                        [
                                                            m("i[data-feather='users']"),
                                                            "Contacts"
                                                        ]
                                                    )
                                                ),
                                                m("li.nav-sub-item",
                                                    m("a.nav-sub-link[href='../template/classic/app-file-manager.html']",
                                                        [
                                                            m("i[data-feather='file-text']"),
                                                            "File Manager"
                                                        ]
                                                    )
                                                ),
                                                m("li.nav-sub-item",
                                                    m("a.nav-sub-link[href='../template/classic/app-mail.html']",
                                                        [
                                                            m("i[data-feather='mail']"),
                                                            "Mail"
                                                        ]
                                                    )
                                                )
                                            ]
                                        )
                                    ]
                                ),
                                m("li.nav-item.with-sub",
                                    [
                                        m("a.nav-link[href='']",
                                            [
                                                m("i[data-feather='layers']"),
                                                " Pages"
                                            ]
                                        ),
                                        m("div.navbar-menu-sub",
                                            m("div.d-lg-flex",
                                                [
                                                    m("ul",
                                                        [
                                                            m("li.nav-label",
                                                                "Authentication"
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-signin.html']",
                                                                    [
                                                                        m("i[data-feather='log-in']"),
                                                                        " Sign In"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-signup.html']",
                                                                    [
                                                                        m("i[data-feather='user-plus']"),
                                                                        " Sign Up"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-verify.html']",
                                                                    [
                                                                        m("i[data-feather='user-check']"),
                                                                        " Verify Account"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-forgot.html']",
                                                                    [
                                                                        m("i[data-feather='shield-off']"),
                                                                        " Forgot Password"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-label.mg-t-20",
                                                                "User Pages"
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-profile-view.html']",
                                                                    [
                                                                        m("i[data-feather='user']"),
                                                                        " View Profile"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-connections.html']",
                                                                    [
                                                                        m("i[data-feather='users']"),
                                                                        " Connections"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-groups.html']",
                                                                    [
                                                                        m("i[data-feather='users']"),
                                                                        " Groups"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-events.html']",
                                                                    [
                                                                        m("i[data-feather='calendar']"),
                                                                        " Events"
                                                                    ]
                                                                )
                                                            )
                                                        ]
                                                    ),
                                                    m("ul",
                                                        [
                                                            m("li.nav-label",
                                                                "Error Pages"
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-404.html']",
                                                                    [
                                                                        m("i[data-feather='file']"),
                                                                        " 404 Page Not Found"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-500.html']",
                                                                    [
                                                                        m("i[data-feather='file']"),
                                                                        " 500 Internal Server"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-503.html']",
                                                                    [
                                                                        m("i[data-feather='file']"),
                                                                        " 503 Service Unavailable"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-505.html']",
                                                                    [
                                                                        m("i[data-feather='file']"),
                                                                        " 505 Forbidden"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-label.mg-t-20",
                                                                "Other Pages"
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-timeline.html']",
                                                                    [
                                                                        m("i[data-feather='file-text']"),
                                                                        " Timeline"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-pricing.html']",
                                                                    [
                                                                        m("i[data-feather='file-text']"),
                                                                        " Pricing"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-help-center.html']",
                                                                    [
                                                                        m("i[data-feather='file-text']"),
                                                                        " Help Center"
                                                                    ]
                                                                )
                                                            ),
                                                            m("li.nav-sub-item",
                                                                m("a.nav-sub-link[href='../template/classic/page-invoice.html']",
                                                                    [
                                                                        m("i[data-feather='file-text']"),
                                                                        " Invoice"
                                                                    ]
                                                                )
                                                            )
                                                        ]
                                                    )
                                                ]
                                            )
                                        )
                                    ]
                                ),
                                m("li.nav-item.active",
                                    m("a.nav-link[href='index.html']",
                                        [
                                            m("i[data-feather='box']"),
                                            " Components"
                                        ]
                                    )
                                ),
                                m("li.nav-item",
                                    m("a.nav-link[href='../collections/']",
                                        [
                                            m("i[data-feather='archive']"),
                                            " Collections"
                                        ]
                                    )
                                )
                            ]
                        )
                    ]
                ),
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

export default HeaderPrivate;