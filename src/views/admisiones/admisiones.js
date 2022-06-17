import HeaderPrivate from '../layout/header-private';
import SidebarAdm from './sidebarAdm';
import App from '../app';

const MenuAdmisiones = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "Metrovirtual"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Admisiones"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Admisiones:"
                    ),

                    m("div.row.tx-14", [

                        m("div.col-sm-6",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='users']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Pacientes de Admisiones"
                                ),
                                m(m.route.Link, { href: "/admisiones/pacientes", class: "tx-medium" }, [
                                    "Ir a Pacientes de Admisiones",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        ),

                        m("div.col-sm-6.d-none",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='file-text']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Formularios Epidemiológicos"
                                ),
                                m(m.route.Link, { href: "/laboratorio/formularios", class: "tx-medium" }, [
                                    "Ir a Formularios Epidemiológicos",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        ),

                    ]),

                ])
            ),
        ];
    },

};

const Admisiones = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarAdm.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Admisiones | " + App.title;
        loadCustomPage();
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("admisiones") }),
            m(SidebarAdm),
            m(MenuAdmisiones)
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
    $(window).resize(function() {
        showNavbarActiveSub()
    })

    // Initialize backdrop for overlay purpose
    $('body').append('<div class="backdrop"></div>');


    // Showing sub menu of navbar menu while hiding other siblings
    $('.navbar-menu .with-sub .nav-link').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('show');
        $(this).parent().siblings().removeClass('show');

        if (window.matchMedia('(max-width: 991px)').matches) {
            psNavbar.update();
        }
    })

    // Closing dropdown menu of navbar menu
    $(document).on('click touchstart', function(e) {
        e.stopPropagation();

        // closing nav sub menu of header when clicking outside of it
        if (window.matchMedia('(min-width: 992px)').matches) {
            var navTarg = $(e.target).closest('.navbar-menu .nav-item').length;
            if (!navTarg) {
                $('.navbar-header .show').removeClass('show');
            }
        }
    })

    $('#mainMenuClose').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('navbar-nav-show');
    });

    $('#sidebarMenuOpen').on('click', function(e) {
        e.preventDefault();
        $('body').addClass('sidebar-show');
    })

    // Navbar Search
    $('#navbarSearch').on('click', function(e) {
        e.preventDefault();
        $('.navbar-search').addClass('visible');
        $('.backdrop').addClass('show');
    })

    $('#navbarSearchClose').on('click', function(e) {
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
        $('.sidebar-nav .with-sub').on('click', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('show');

            psSidebar.update();
        })
    }


    $('#mainMenuOpen').on('click touchstart', function(e) {
        e.preventDefault();
        $('body').addClass('navbar-nav-show');
    })

    $('#sidebarMenuClose').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('sidebar-show');
    })

    // hide sidebar when clicking outside of it
    $(document).on('click touchstart', function(e) {
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




export default Admisiones;