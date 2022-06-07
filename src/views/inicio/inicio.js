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
                m("li.nav-item.active",
                    m("a.nav-link", { href: "#!/inicio" }, [
                        m("i[data-feather='layout']"),
                        " Inicio "
                    ])
                ),
                Object.keys(_data.modulesAccess).map(function (_v, _i, _contentData) {

                    if (_data.modulesAccess[_v].length !== 0) {
                        return [
                            m("li.nav-item",
                                m("a.nav-link", { href: "#!/" + _v }, [
                                    m("i[data-feather='layout']"),
                                    _v.charAt(0).toUpperCase() + _v.slice(1)
                                ])
                            ),
                        ]
                    }




                })
            ]
        }



    },

};


const ModulesAccess = {
    view: () => {

        let _data = Encrypt.getDataUser();

        if (_data !== null && _data.length !== 0) {
            return [

                Object.keys(_data.modulesAccess).map(function (_v, _i, _contentData) {

                    if (_data.modulesAccess[_v].length !== 0) {
                        return [
                            m("div.col-sm-6.mg-b-20",
                                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [

                                    m("h5.tx-inverse.mg-b-20",
                                        _v.charAt(0).toUpperCase() + _v.slice(1)
                                    ),

                                    m("a.tx-medium", { href: "#!/" + _v }, [
                                        "Ir a " + _v.charAt(0).toUpperCase() + _v.slice(1),
                                        m("i.icon.ion-md-arrow-forward.mg-l-5")
                                    ])

                                ])
                            ),

                        ]
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
                    m("a.df-logo", { href: "/" }, [
                        "Metro",
                        m("span",
                            "Virtual"
                        ),
                        "+"
                    ])
                ),
                m(".navbar-menu-wrapper[id='navbarMenu']", [
                    m("div.navbar-menu-header", [
                        m("a.df-logo", { href: "/" }, [
                            "Metro",
                            m("span",
                                "Virtual"
                            ),
                            "+"
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
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m("a[href='#']",
                                "Metrovirtual"
                            )
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