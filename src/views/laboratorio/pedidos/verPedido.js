import Auth from '../../../models/auth';
import HeaderPrivate from '../../layout/header-private';
import Sidebarlab from '../sidebarLab';
import App from '../../app';
import Loader from '../../loader';
import m from 'mithril';

const DetallePedido = {
    detalle: null,
    error: "",
    fetch: function() {
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/ver-pedido-lab/" + VerPedido.idPedido,
            })
            .then(function(result) {
                DetallePedido.detalle = result.data;
            })
            .catch(function(e) {
                DetallePedido.error = e.message;
            })
    }
}

const Pedido = {
    oninit: DetallePedido.fetch,

    view: () => {
        return DetallePedido.error ? [
            m(".alert.alert-danger[role='alert']",
                DetallePedido.error
            )
        ] : DetallePedido.detalle ? [
            m("p.mg-5.tx-20", [
                m("i.fas.fa-user.mg-r-5.text-secondary"),
                DetallePedido.detalle.NOMBRE_PACIENTE,
            ]),
            m("p.mg-5", [
                m("span.badge.badge-primary.mg-r-5.tx-14",
                    "HC: " + DetallePedido.detalle.HC
                ),
            ]),
            m("p.mg-5", [
                m("span.badge.badge-secondary.mg-r-5.tx-14",
                    "N° Adm. GEMA N°: " + DetallePedido.detalle.ADMISION
                ),
                m("span.badge.badge-secondary.mg-r-5.tx-14",
                    "N° Pedido GEMA N°: " + DetallePedido.detalle.NUM_PEDIDO_GEMA
                )
            ]),
            m("p.mg-5", [
                m("span.badge.badge-success.mg-r-5.tx-14",
                    "N° At. MV: " + DetallePedido.detalle.ATEN_MV
                ),
                m("span.badge.badge-success.mg-r-5.tx-14",
                    "N° Pedido MV: " + DetallePedido.detalle.NUM_PEDIDO_MV
                )
            ]),
            m("p.mg-5", [
                m("span.badge.badge-light.wd-100p.tx-14",
                    "Detalle: "
                )
            ]),
            m("p.mg-5", [
                DetallePedido.detalle.DESCRIPCION.split("\n").map(function(_i) {
                    return m("p.mg-0", _i)
                })
            ])
        ] : m("div.placeholder-paragraph.wd-100p", [
            m("div.line"),
            m("div.line")
        ])
    }
}




const VerPedido = {
    idPedido: null,
    oninit: (_data) => {
        HeaderPrivate.page = "";
        Sidebarlab.page = "";
        VerPedido.idPedido = _data.attrs.idPedido;
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Detalle Pedido N°: " + VerPedido.idPedido + " | " + App.title;
        loadCustomPage();
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(Sidebarlab),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m("a[href='#']",
                                "Metrovirtual"
                            )
                        ),
                        m("li.breadcrumb-item",
                            m("a", { href: "#!/laboratorio" },
                                "Laboratorio"
                            )
                        ),
                        m("li.breadcrumb-item",
                            m("a", { href: "#!/laboratorio/pedidos" },
                                "Pedidos de Laboratorio"
                            )
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Detalle"
                        )
                    ]),
                    m("h1.df-title",
                        "Detalle de Pedido N°: " + VerPedido.idPedido
                    ),

                    m("div.row.tx-14", [

                        m("div.col-12",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='file']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Detalle de Pedido N°: " + VerPedido.idPedido
                                ),
                                m(Pedido)

                            ])
                        ),

                    ]),

                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Mensajes de Pedido"
                ),
                m("nav.nav.flex-column[id='navSection']", [
                    m("div.demo-static-toast",
                        m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", [
                            m("div.toast-header.bg-danger", [
                                m("h6.tx-white.tx-14.mg-b-0.mg-r-auto",
                                    "Alerta"
                                ),
                                m("small.tx-white",
                                    "15:47"
                                ),

                            ]),
                            m("div.toast-body",
                                "Mensaje de ejemplo"
                            )
                        ])
                    )

                ])
            ])
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

export default VerPedido;