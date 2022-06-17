import Encrypt from '../../../models/encrypt';
import HeaderPrivate from '../../layout/header-private';
import SidebarAdm from '../sidebarAdm';
import App from '../../app';
import m from 'mithril';
import Notificaciones from '../../../models/notificaciones';



const iPedido = {

    view: (_data) => {
        return [
            m("p.mg-0.tx-18", [
                m("i.fas.fa-user.mg-r-5.text-secondary"),
                _data.attrs.PTE_MV,
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "HC: " + _data.attrs.HC_MV
                ),
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "N° Pedido MV: " + _data.attrs.NUM_PEDIDO_MV
                )
            ]),
        ];
    },

};

const PacientesAdmisiones = {
    pacientes: [],
    tipoBusqueda: "",
    searchField: "",
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarAdm.page = "";
        PacientesAdmisiones.searchField = "";
        App.isAuth();
    },
    oncreate: () => {
        document.title = "Pacientes de Admisiones | " + App.title;
        loadCustomPage();
    },
    view: () => {


        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("admisiones") }),
            m(SidebarAdm, { oncreate: SidebarAdm.setPage(7) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " Metrovirtual "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admisiones "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Pacientes de Admisiones"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pacientes de Admisiones:"
                    ),

                    m("div.row.tx-14", [
                        m(".col-12.mg-b-10.wd-100p",
                            m("div.row.mg-t-20", [


                                m("div.col-sm-12.pd-b-10.mg-b-10", [
                                        m('label.d-none', [
                                            m("i.fas.fa-info-circle.mg-r-2"),
                                            "Buscar por NHC o Nombres y Apellidos completos del Paciente"
                                        ]),
                                        m("div.mg-b-5.d-flex", [
                                            m("div.custom-control.custom-radio.mg-r-15", [
                                                m("input.custom-control-input[type='radio'][id='cc'][name='tipoBusqueda'][checked]"),
                                                m("label.custom-control-label[for='cc']",
                                                    "Cédula"
                                                )
                                            ]),
                                            m("div.custom-control.custom-radio.mg-r-15", [
                                                m("input.custom-control-input[type='radio'][id='pte'][name='tipoBusqueda']"),
                                                m("label.custom-control-label[for='pte']",
                                                    "Apellidos y Nombres completos"
                                                )
                                            ])
                                        ]),
                                        m("div.mg-t-15.input-group", [
                                            m("input.form-control.mg-b-20.wd-100p[placeholder='Buscar por NHC o Nombres y Apellidos completos del Paciente'][title='Buscar'][type='text']", {
                                                oninput: (e) => {
                                                    PacientesAdmisiones.searchField = e.target.value;
                                                },
                                                value: PacientesAdmisiones.searchField
                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-outline-light[type='button']", {
                                                    onclick: () => {
                                                        loadPacientes([{ "nhc": "dsdsd" }]);
                                                    }
                                                }, [
                                                    m("i.icon.ion-md-search"),
                                                    " Buscar "
                                                ]),
                                                m("button.btn.btn-outline-light[id='resetTable'][type='button']", [
                                                    m("i.icon.ion-md-close-circle"),
                                                    " Borrar "
                                                ])
                                            )
                                        ])
                                    ]


                                ),

                            ])
                        ),
                        m("div.col-12", [
                            m("label.nav-label",
                                "Pacientes de Admisiones"
                            ),
                            m("div.table-loader.wd-100p", {
                                    style: { "display": "none" }
                                },
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-pacientes'][width='100%']"),
                            )
                        ])
                    ]),
                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Opciones Pacientes"
                ),
                m("nav.nav.flex-column[id='navSection']", [
                    m("table.table.table-sm[id='table-notificaciones'][width='100%']"),

                ]),
                m("label.nav-label.mg-t-20.tx-center.d-none", [
                        m(m.route.Link, { href: "/notificaciones-lab" }, [
                            "Ver Todo"
                        ])


                    ],

                ),
            ])
        ];
    },

};



function loadPacientes(pacientes = []) {

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
        data: pacientes,
        responsive: false,
        dom: 'ltp',
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
            title: "ID:"
        }, {
            title: "HC"
        }, ],
        aoColumnDefs: [{
                mRender: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: false,
                aTargets: [0],
                orderable: false,
            },
            {
                mRender: function(data, type, full) {
                    return full.nhc;
                },
                visible: true,
                aTargets: [1],
                orderable: false,

            },

        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

        },
        drawCallback: function(settings) {

            $(".table-content").show();
            $(".table-loader").hide();





        },
    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });


    $('#button-buscar-t').click(function(e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#_dt_search_text').val()).draw();
    });
    $('#filtrar').click(function(e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search('fechas-' + $('#desde').val() + '-' + $('#hasta').val()).draw();
    });

    $('#resetTable').click(function(e) {
        e.preventDefault();
        $('#_dt_search_text').val('');
        $('#desde').val('');
        $('#hasta').val('');
        table.search('').draw();
    });


    return table;



}


function nueva_notificacion_muestra(_mData) {
    if (Notification) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }


        Notificaciones.setNot();

        var _data_ = JSON.parse(_mData.dataPedido);
        var title = "Metrovirtual: " + _mData.title;
        var extra = {
            icon: "assets/favicon.ico",
            body: "Pedido N°: " + _mData.idPedido + "\n" + "HC: " + _data_.HC + "\n" + "Pte: " + _data_.NOMBRE_PACIENTE

        }
        var noti = new Notification(title, extra)
        noti.onclick = () => {
            m.route.set("/laboratorio/pedido/" + _mData.idPedido);

        }
        noti.onclose = {
            // Al cerrar
        }
        setTimeout(function() { noti.close() }, 30000)
    }
}

function nueva_notificacion(_mData) {
    if (Notification) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }

        Notificaciones.setNot();

        var title = "Metrovirtual: Nuevo Pedido"
        var extra = {
            icon: "assets/favicon.ico",
            body: "Pedido N°: " + _mData.NUM_PEDIDO_MV + "\n" + "HC: " + _mData.HC_MV + "\n" + "Pte: " + _mData.PTE_MV
        }
        var noti = new Notification(title, extra)
        noti.onclick = () => {
            m.route.set("/laboratorio/pedido/" + _mData.NUM_PEDIDO_MV);

        }
        noti.onclose = {
            // Al cerrar
        }
        setTimeout(function() { noti.close() }, 30000)
    }
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

export default PacientesAdmisiones;