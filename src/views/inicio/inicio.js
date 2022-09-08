import HeaderPrivate from '../layout/header-private';
import App from '../app';
import SidebarRight from '../layout/sidebarRight';
import m from 'mithril';
import Encrypt from '../../models/encrypt';


const MenuInicio = {
    view: () => {

        let _data = Encrypt.getDataUser();


        if (_data !== null && _data.length !== 0) {
            return [
                m("li.bg-primary.wd-100p.nav-item.d-none",

                    m(m.route.Link, { href: "/inicio", class: "nav-link" }, [
                        m("i[data-feather='layout']"),
                        " Inicio "
                    ])


                ),

            ]
        }


    },

};

const iMdodule = {
    view: (_data) => {

        console.log(_data);

        if (_data.children[0].modulo !== undefined && _data.children[0].modulo == 'farmacia') {
            _data.children[0].modulo = 'Farmacia';
            _data.children[0].icon = "fas fa-pills";
        } else if (_data.children[0].modulo !== undefined && _data.children[0].modulo == 'laboratorio') {
            _data.children[0].modulo = 'Laboratorio';
            _data.children[0].icon = "fas fa-microscope";
        } else if (_data.children[0].modulo !== undefined && _data.children[0].modulo == 'emergencia') {
            _data.children[0].modulo = 'Emergencia';
            _data.children[0].icon = "fas fa-first-aid";
        } else if (_data.children[0].modulo !== undefined && _data.children[0].modulo == 'bco-sangre') {
            _data.children[0].icon = "fas fa-hospital";
            _data.children[0].modulo = 'Bco. de Sangre';
        } else if (_data.children[0].modulo !== undefined && _data.children[0].modulo == 'terapia-respiratoria') {
            _data.children[0].icon = "fas fa-hospital";

            _data.children[0].modulo = 'Terapia Respiratoria';
        } else if (_data.children[0].modulo !== undefined && _data.children[0].modulo == 'neurofisiologia') {
            _data.children[0].icon = "fas fa-hospital";

            _data.children[0].modulo = 'Neurofisiología';
        } else if (_data.children[0].modulo !== undefined && _data.children[0].modulo == 'hospitalizacion') {
            _data.children[0].icon = "fas fa-procedures";

            _data.children[0].modulo = 'Hospitalización';
        } else if (_data.children[0].modulo !== undefined && _data.children[0].modulo == 'mantenimiento') {
            _data.children[0].icon = "fas fa-server";
            _data.children[0].modulo = 'Mantenimiento';
        } else {
            _data.children[0].icon = "fas fa-hospital";

            _data.children[0].modulo = _data.children[0].modulo.charAt(0).toUpperCase() + _data.children[0].modulo.slice(1)
        }


        return [
            m("li", {
                "class": "list-item bg-white wd-100p",
                "style": { "cursor": "pointer" },
                onclick: () => {
                    m.route.set(_data.children[0].modulo.toLowerCase(), {});
                }
            },
                [
                    m("div", { "class": "media" },
                        [
                            m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                m("i", { "class": _data.children[0].icon + " tx-30 tx-white" })
                            ),
                            m("div", { "class": "media-body mg-l-15" },
                                [
                                    m("p", { "class": "tx-18 mg-b-0" },
                                        _data.children[0].modulo
                                    ),
                                    m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                        "Ir a "
                                    )
                                ]
                            )
                        ]
                    ),
                    m("div", { "class": "text-right" },
                        [
                            m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                "Administrador"
                            )
                        ]
                    )
                ]
            )

        ]
    }
};

const sortObject = o => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})



const ModulesAccess = {
    isContent: false,
    view: () => {

        MenuInicio.isContent = false;

        let _data = Encrypt.getDataUser();


        if (_data !== null && _data.length !== 0) {


            return [

                Object.keys(_data.modulesAccess).map(function (_v, _i, _contentData) {

                    if (_data.modulesAccess[_v].length !== 0) {

                        MenuInicio.isContent = true;

                        return m(iMdodule, _data.modulesAccess[_v]);

                    }

                    if (Object.keys(_data.modulesAccess).length == (_i + 1)) {
                        if (!MenuInicio.isContent) {
                            return [
                                m("p.df-lead.pd-15",
                                    "Todavía no tienes acceso a ningún Módulo disponible. Comunícate a CONCAS Ext: 2020 y solicita activación. Att: Metrovirtual Plus."
                                )
                            ]
                        }

                    }




                })

            ]

        }



    },

};



const Inicio = {
    oninit: () => {
        HeaderPrivate.page = "";
        App.isAuth();
    },
    oncreate: () => {
        document.title = "Inicio | " + App.title;
        loadCustomPage();
    },
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m(m.route.Link, { href: "/", class: "df-logo" }, [
                        "Metro",
                        m("span",
                            "Plus+"
                        ),

                    ]),


                ),
                m(".navbar-menu-wrapper[id='navbarMenu']", [
                    m("div.navbar-menu-header", [
                        m(m.route.Link, { href: "/", class: "df-logo" }, [
                            "Metro",
                            m("span",
                                "Plus+"
                            ),

                        ]),
                        m("a[id='mainMenuClose'][href='']",
                            m("i[data-feather='x']")
                        )
                    ]),
                    m("ul.nav.navbar-menu", [
                        m("li.nav-label.pd-l-20.pd-lg-l-25.d-lg-none",
                            "Menu"
                        ),
                        m(MenuInicio),

                    ])
                ]),
                m(SidebarRight)
            ]),
            m("div.content.content-components", {

            },
                m("div.container", {

                }, [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "MetroPlus"

                            ]),

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Inicio"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Inicio:"
                    ),

                    m("div.row.tx-14", [

                        m(ModulesAccess),


                    ]),

                ])
            ),
        ];
    },

};


function loadCustomPage() {

    feather.replace();

    ////////// NAVBAR //////////

    // Initialize PerfectScrollbar of navbar menu for mobile only
    if (window.matchMedia('(max-width: 991px)').matches) {
        const psNavbar = new PerfectScrollbar('#navbarMenu', {
            suppressScrollX: true
        });
    }

    // Showing sub-menu of active menu on navbar when mobile
    function showNavbarActiveSub() {
        if (window.matchMedia('(max-width: 991px)').matches) {
            $('#navbarMenu .active').addClass('show');
        } else {
            $('#navbarMenu .active').removeClass('show');
        }
    }

    showNavbarActiveSub()
    $(window).resize(function () {
        showNavbarActiveSub()
    })

    // Initialize backdrop for overlay purpose
    $('body').append('<div class="backdrop"></div>');


    // Showing sub menu of navbar menu while hiding other siblings
    $('.navbar-menu .with-sub .nav-link').on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass('show');
        $(this).parent().siblings().removeClass('show');

        if (window.matchMedia('(max-width: 991px)').matches) {
            psNavbar.update();
        }
    })

    // Closing dropdown menu of navbar menu
    $(document).on('click touchstart', function (e) {
        e.stopPropagation();

        // closing nav sub menu of header when clicking outside of it
        if (window.matchMedia('(min-width: 992px)').matches) {
            var navTarg = $(e.target).closest('.navbar-menu .nav-item').length;
            if (!navTarg) {
                $('.navbar-header .show').removeClass('show');
            }
        }
    })

    $('#mainMenuClose').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('navbar-nav-show');
    });

    $('#sidebarMenuOpen').on('click', function (e) {
        e.preventDefault();
        $('body').addClass('sidebar-show');
    })

    // Navbar Search
    $('#navbarSearch').on('click', function (e) {
        e.preventDefault();
        $('.navbar-search').addClass('visible');
        $('.backdrop').addClass('show');
    })

    $('#navbarSearchClose').on('click', function (e) {
        e.preventDefault();
        $('.navbar-search').removeClass('visible');
        $('.backdrop').removeClass('show');
    })



    ////////// SIDEBAR //////////

    // Initialize PerfectScrollbar for sidebar menu
    if ($('#sidebarMenu').length) {
        const psSidebar = new PerfectScrollbar('#sidebarMenu', {
            suppressScrollX: true
        });


        // Showing sub menu in sidebar
        $('.sidebar-nav .with-sub').on('click', function (e) {
            e.preventDefault();
            $(this).parent().toggleClass('show');

            psSidebar.update();
        })
    }


    $('#mainMenuOpen').on('click touchstart', function (e) {
        e.preventDefault();
        $('body').addClass('navbar-nav-show');
    })

    $('#sidebarMenuClose').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('sidebar-show');
    })

    // hide sidebar when clicking outside of it
    $(document).on('click touchstart', function (e) {
        e.stopPropagation();

        // closing of sidebar menu when clicking outside of it
        if (!$(e.target).closest('.burger-menu').length) {
            var sb = $(e.target).closest('.sidebar').length;
            var nb = $(e.target).closest('.navbar-menu-wrapper').length;
            if (!sb && !nb) {
                if ($('body').hasClass('navbar-nav-show')) {
                    $('body').removeClass('navbar-nav-show');
                } else {
                    $('body').removeClass('sidebar-show');
                }
            }
        }
    });

};





export default Inicio;