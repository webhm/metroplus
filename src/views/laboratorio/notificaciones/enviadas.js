import HeaderPrivate from '../../layout/header-private';
import SidebarLab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';


const iFiltro = {

    view: (_data) => {
        return [
            m("p.mg-0", [
                m("div.tx-12",
                    m("span", {
                        class: "badge badge-primary mg-l-5 mg-r-5",
                        style: { "cursor": "pointer" }
                    }, [], [
                        m("i.fas.fa-envelope.mg-r-2"),
                        " Ver Notificación "
                    ]),
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], [
                        _data.attrs.fechaExamen
                    ]),
                    m("span.mg-r-2", {}, "SC: " + _data.attrs.sc),
                    m("span.mg-r-2", {}, "NHC: " + _data.attrs.numeroHistoriaClinica),
                    m("span.mg-r-2", {}, "PTE: " + _data.attrs.apellidosPaciente + " " + _data.attrs.nombresPaciente),





                )
            ]),

        ];
    },

};


const NotificacionesEnviadasLab = {
    dataPendientesAlta: [],
    dataSoloGema: [],
    dataGemaMV: [],
    dataFiltros: [],
    dataCamaTotales: [],
    camasTotales: 0,
    showBitacora: "",
    gemaMV: 0,
    soloGema: 0,
    soloMV: 0,
    pendienteAlta: 0,
    timerUpdate: 0,
    fetch: () => {
        m.request({
                method: "GET",
                url: "http://lisa.hospitalmetropolitano.org/apps/soa/laranotifs/public/api/v1/listar/ordenes?tipo=enviadas&errores=0&limit=10&withdata=1&page=1",
            })
            .then(function(result) {
                NotificacionesEnviadasLab.dataFiltros = result.data;
                loadNotificacionesEnviadasLab();

            })
            .catch(function(e) {})
    },

    oninit: (_data) => {
        HeaderPrivate.page = "";
        SidebarLab.page = "";
        NotificacionesEnviadasLab.dataPendientesAlta = [];
        NotificacionesEnviadasLab.dataCamaTotales = [];
        NotificacionesEnviadasLab.camasTotales = 0;
        NotificacionesEnviadasLab.pendienteAlta = 0;
        App.isAuth('laboratorio', 15);
        NotificacionesEnviadasLab.fetch();
    },
    oncreate: (_data) => {
        document.title = "Reglas Filtros | " + App.title;
    },
    view: (_data) => {

        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio/notificaciones" }, [
                                " Notificaciones de Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Notificaciones Enviadas"
                        ),
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Notificaciones Enviadas:"
                    ),


                    m("div.row.animated.fadeInUp", {
                        class: NotificacionesEnviadasLab.showBitacora
                    }, [
                        m("div.col-12.mg-b-5.wd-100p.d-none[data-label='Filtrar'][id='filterTable']",

                            m("div.row", [


                                m("div.col-sm-12.pd-b-10",
                                    m("div.input-group", [
                                        m(".df-example.demo-forms.wd-100p[data-label='Buscar']", [
                                            m("input.form-control[type='text'][id='searchField'][data-role='tagsinput']", {
                                                oncreate: () => {


                                                    var citynames = new Bloodhound({
                                                        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
                                                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                                                    });


                                                },

                                            }),
                                        ])
                                    ])
                                ),


                            ])
                        ),
                        m("div.col-12", [

                            m("div.table-loader.wd-100p",
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                                m("table.table.table-xs[id='table-NotificacionesEnviadasLab'][width='100%']"),
                            ])
                        ])
                    ]),
                ])
            ),


        ];
    },

};



function reloadDataTables(_table_, _data_) {
    var table = $(_table_).DataTable();
    table.clear();
    table.rows.add(_data_).draw();
}

function loadNotificacionesEnviadasLab() {

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
    var table = $("#table-NotificacionesEnviadasLab").DataTable({
        data: NotificacionesEnviadasLab.dataFiltros,
        dom: 'tp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Sin Resultados",
            sEmptyTable: "Sin Resultados",
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
        destroy: true,
        pageLength: 20,
        columns: false,
        aoColumnDefs: [{
                mRender: function(data, type, row, meta) {
                    return "";
                },
                visible: true,
                width: "100%",
                aTargets: [0],
                orderable: false,
            },

        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
        drawCallback: function(settings) {

            $(".table-content").show();
            $(".table-loader").hide();

            settings.aoData.map(function(_v, _i) {
                m.mount(_v.anCells[0], {
                    view: function() {

                        return m(iFiltro, _v._aData)


                    }
                });


            })
        },
    });


    return table;

};





function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}


export default NotificacionesEnviadasLab;