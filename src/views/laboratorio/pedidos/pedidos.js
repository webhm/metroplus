import Auth from '../../../models/auth';
import HeaderPrivate from '../../layout/header-private';
import Sidebarlab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';

const iPedido = {
    view: (_data) => {
        return [
            m("td", [
                m("p.mg-0.tx-12", [
                    m("i.fas.fa-calendar.mg-r-5.text-secondary"),
                    _data.attrs.FECHA + " " + _data.attrs.HORA
                ]),
            ]),
            m("td", [
                m("p.mg-0", [
                    m("i.fas.fa-user.mg-r-5.text-secondary"),
                    _data.attrs.NOMBRE_PACIENTE,
                ]),
                m("p.mg-0", [
                    m("span.badge.badge-primary.mg-r-5",
                        "HC: " + _data.attrs.HC
                    ),
                ]),
                m("p.mg-0", [
                    m("span.badge.badge-secondary.mg-r-5",
                        "N° Adm. GEMA N°: " + _data.attrs.ADMISION
                    ),
                    m("span.badge.badge-secondary.mg-r-5",
                        "N° Pedido GEMA N°: " + _data.attrs.NUM_PEDIDO_GEMA
                    )
                ]),
                m("p.mg-0", [
                    m("span.badge.badge-success.mg-r-5",
                        "N° At. MV: " + _data.attrs.ATEN_MV
                    ),
                    m("span.badge.badge-success.mg-r-5",
                        "N° Pedido MV: " + _data.attrs.NUM_PEDIDO_MV
                    )
                ])
            ]),
            m("td", [
                m(".btn-group.wd-100p[role='group'][aria-label='Opciones']", [
                    m("a.btn.btn-xs.btn-primary", { href: "#!/laboratorio/pedido/" + _data.attrs.NUM_PEDIDO_MV, target: "_blank" }, "Ver Pedido"),
                    m("button.btn.btn-xs.btn-secondary[type='button']",
                        "Nuevo Mensaje"
                    ),

                ])
            ])
        ];
    },

};



const Pedidos = {
    oninit: () => {
        HeaderPrivate.page = "";
        Sidebarlab.page = "";
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Pedidos de Laboratorio | " + App.title;
        loadCustomPage();
        loadPacientes();
    },

    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(Sidebarlab, { oncreate: Sidebarlab.setPage("pedidosLaboratorio") }),
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
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Pedidos de Laboratorio"
                        )
                    ]),
                    m("h1.df-title",
                        "Pedidos de Laboratorio"
                    ),

                    m("div.row.tx-14", [
                        m("div.col-12", [
                            m("div.table-loader.wd-100p",
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-pacientes'][width='100%']")
                            )
                        ])

                    ]),

                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Mensajes de Pedido"
                ),
                m("nav.nav.flex-column[id='navSection']", [
                    m("div.demo-static-toast.mg-b-5",
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
                                "Muestra pendiente "
                            )
                        ])
                    ),
                    m("div.demo-static-toast.mg-b-5",
                        m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", [
                            m("div.toast-header.bg-success", [
                                m("h6.tx-white.tx-14.mg-b-0.mg-r-auto",
                                    "Nuevo Pedido"
                                ),
                                m("small.tx-white",
                                    "15:47"
                                ),

                            ]),
                            m("div.toast-body",
                                "Nuevo pedido"
                            )
                        ])
                    ),
                    m("div.demo-static-toast.mg-b-5",
                        m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", [
                            m("div.toast-header.bg-warning", [
                                m("h6.tx-14.mg-b-0.mg-r-auto",
                                    "Alerta"
                                ),
                                m("small",
                                    "15:47"
                                ),

                            ]),
                            m("div.toast-body",
                                "Muestra recibida "
                            )
                        ])
                    ),
                    m("div.demo-static-toast.mg-b-5",
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
                                "Muestra recibida "
                            )
                        ])
                    ),
                    m("div.demo-static-toast.mg-b-5",
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
                                "Muestra recibida "
                            )
                        ])
                    )

                ])
            ])

        ];
    },

};

function loadPacientes() {

    $(".table-content").hide();
    $(".table-loader").show();

    // MOMMENT
    moment.lang("es", {
        months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
            "_"
        ),
        monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
            "_"
        ),
        weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split(
            "_"
        ),
        weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
        weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
    });



    $.fn.dataTable.ext.errMode = "none";
    var table = $("#table-pacientes").DataTable({
        "ajax": {

            url: "https://api.hospitalmetropolitano.org/t/v1/pedidos-laboratorio",
            dataSrc: "data",
            serverSide: true,
        },
        processing: true,
        serverSide: true,
        responsive: false,
        dom: 'tp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Todavía no tienes resultados disponibles.",
            sEmptyTable: "Ningún dato disponible en esta tabla",
            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix: "",
            sUrl: "",
            sInfoThousands: ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior",
            },
            oAria: {
                sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente",
            },
        },
        cache: false,
        order: false,
        columns: [{
            title: "PEDIDO:"
        }, {
            title: "DETALLE PEDIDO:"
        }, {
            title: "OPCIONES:"
        }, ],
        aoColumnDefs: [{
                mRender: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: false,
                aTargets: [0],
            },
            {
                mRender: function(data, type, full) {
                    return full.HC;
                },
                visible: false,
                aTargets: [1],
            },
            {
                mRender: function(data, type, full) {
                    return full.NOMBRE_PACIENTE;

                },
                visible: true,
                aTargets: [2],
            },
            {
                mRender: function(data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [4],
            },
        ],

        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
        drawCallback: function(settings) {
            $(".table-content").show();
            $(".table-loader").hide();

            settings.aoData.map(function(_i) {
                m.mount(_i.anCells[4], { view: function() { return m(iPedido, _i._aData) } });
            })

        },
        liveAjax: {
            // 6 second interval
            interval: 6000,
            // Do _not_ fire the DT callbacks for every XHR request made by liveAjax
            dtCallbacks: false,
            // Abort the XHR polling if one of the below errors were encountered
            abortOn: ["error", "timeout", "parsererror"],
            // Disable pagination resetting on updates ("true" will send the viewer
            // to the first page every update)
            resetPaging: false,
        },

    });



    return table;





}

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


export default Pedidos;