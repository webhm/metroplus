import Notificaciones from '../../../models/notificaciones';
import m from 'mithril';

function stopwatchModel() {
    return {
        interval: null,
        seconds: 100,
        isPaused: false
    };
}

const actions = {
    showFilter: true,
    showSearch: true,
    show: false,
    increment(model) {
        model.seconds--;
        if (model.seconds == 0) {
            window.location.reload();
        }
        m.redraw();
    },

    start(model) {
        model.interval = setInterval(actions.increment, 1000, model);
    },
    stop(model) {
        model.interval = clearInterval(model.interval);
    },
    reset(model) {
        model.seconds = 100;
    },
    toggle(model) {
        if (model.isPaused) {
            actions.start(model);
        } else {
            actions.stop(model);
        }
        model.isPaused = !model.isPaused;
    }
};

function Stopwatch() {
    const model = stopwatchModel();
    actions.start(model);
    return {
        view() {
            return [
                m("div.mg-b-0", [
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                        m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                            "Actualización en:"
                        ),

                    ]),
                    m("div.d-flex.justify-content-between.mg-b-5", [
                        m("h5.tx-normal.tx-rubik.mg-b-0",
                            model.seconds + "s."
                        ),
                        m("h5.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                            m("small.pd-2.tx-15",
                                (model.isPaused ? [m("i.fas.fa-play.pd-2", {
                                    title: "Start",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }
                                })] : [m("i.fas.fa-pause.pd-2", {
                                    title: "Pause",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }

                                })]),


                            ),



                        ),


                    ]),
                    m("div.progress.ht-4.mg-b-0.op-5",
                        m(".progress-bar.bg-primary.[role='progressbar'][aria-valuenow='" + model.seconds + "'][aria-valuemin='0'][aria-valuemax='60']", {
                            oncreate: (el) => {
                                el.dom.style.width = "100%";

                            },
                            onupdate: (el) => {
                                el.dom.style.width = model.seconds + "%";

                            },

                        })
                    )
                ]),

            ];



        },
        onremove() {
            actions.stop(model);
        },

    };
};


const BuscadorPacientes = {
    searchField: '',
    data: [],
    loader: false,
    loadPacientes: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-pacientes").DataTable({
            data: BuscadorPacientes.data,
            dom: 'ltp',
            responsive: true,
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
            order: [
                [2, "Asc"]
            ],
            destroy: true,
            columns: [{
                title: "N°:",
            },
            {
                title: "NHC:",
            },
            {
                title: "Paciente:",
            },
            {
                title: "Edad:",
            },
            {
                title: "Sexo:",
            },
            {
                title: "F. Nacimiento:",
            },
            {
                title: "Opciones:",
            },


            ],
            aoColumnDefs: [{
                mRender: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
            },
            {
                mRender: function (data, type, full) {
                    return full.CD_PACIENTE;
                },
                visible: true,
                aTargets: [1],

            },
            {
                mRender: function (data, type, full) {
                    return full.NM_PACIENTE;
                },
                visible: true,
                aTargets: [2],
            },
            {
                mRender: function (data, type, full) {
                    return full.EDAD;
                },
                visible: true,
                aTargets: [3],
            }, {
                mRender: function (data, type, full) {
                    return full.TP_SEXO;

                },
                visible: true,
                aTargets: [4],
            },
            {
                mRender: function (data, type, full) {
                    return full.DT_NASCIMENTO;

                },
                visible: true,
                aTargets: [5],
            },
            {
                mRender: function (data, type, full) {
                    return 'OPCIONES';

                },
                visible: true,
                aTargets: [6],
            },


            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
            drawCallback: function (settings) {


                settings.aoData.map(function (_i) {

                    m.mount(_i.anCells[6], {
                        view: function () {

                            return [
                                m("button.btn.btn-sm.btn-block.btn-primary[type='button']", {
                                    onclick: () => {
                                        Cita.nhc = _i._aData.CD_PACIENTE;
                                        Cita.paciente = _i._aData.NM_PACIENTE;
                                        AgendaImagen.buscarPacientes = !AgendaImagen.buscarPacientes;
                                    }
                                },
                                    "Seleccionar"
                                )

                            ]


                        }
                    });

                })

            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });



        return table;

    },
    fetchSearch: () => {

        BuscadorPacientes.loader = true;
        BuscadorPacientes.data = [];

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/pacientes",
            body: {
                searchField: BuscadorPacientes.searchField
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {
                BuscadorPacientes.loader = false;
                BuscadorPacientes.data = res.data;
                m.redraw();
            })
            .catch(function (e) {
            });

    },
    view: () => {
        return BuscadorPacientes.loader ? [
            m("div.mg-t-10.pd-10.wd-100p",
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),

        ] : !BuscadorPacientes.loader && BuscadorPacientes.data.length !== 0 ? [
            m("div.mg-t-10.pd-10.wd-100p",
                m("table.table.table-sm.tx-11[id='table-pacientes'][width='100%']", {
                    oncreate: (e) => {
                        BuscadorPacientes.loadPacientes();

                    }
                }),
            )
        ] : [];

    }
}

const BuscadorMedicos = {
    searchField: '',
    data: [],
    loader: false,
    loadMedicos: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-medicos").DataTable({
            data: BuscadorMedicos.data,
            dom: 'ltp',
            responsive: true,
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
            order: [
                [2, "Asc"]
            ],
            destroy: true,
            columns: [{
                title: "N°:",
            },
            {
                title: "Código:",
            },
            {
                title: "Médico:",
            },

            {
                title: "Opciones:",
            },


            ],
            aoColumnDefs: [{
                mRender: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
            },
            {
                mRender: function (data, type, full) {
                    return full.CD_PRESTADOR;
                },
                visible: true,
                aTargets: [1],

            },
            {
                mRender: function (data, type, full) {
                    return full.NM_PRESTADOR;
                },
                visible: true,
                aTargets: [2],
            },

            {
                mRender: function (data, type, full) {
                    return 'OPCIONES';

                },
                visible: true,
                aTargets: [3],
            },


            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
            drawCallback: function (settings) {


                settings.aoData.map(function (_i) {

                    m.mount(_i.anCells[3], {
                        view: function () {

                            return [
                                m("button.btn.btn-sm.btn-block.btn-primary[type='button']", {
                                    onclick: () => {
                                        Cita.codMedico = _i._aData.CD_PRESTADOR;
                                        Cita.prestador = _i._aData.NM_PRESTADOR;
                                        AgendaImagen.buscarMedicos = !AgendaImagen.buscarMedicos;
                                    }
                                },
                                    "Seleccionar"
                                )

                            ]


                        }
                    });

                })

            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });



        return table;

    },
    fetchSearch: () => {

        BuscadorMedicos.loader = true;
        BuscadorMedicos.data = [];

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/medicos",
            body: {
                searchField: BuscadorMedicos.searchField
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {
                BuscadorMedicos.loader = false;
                BuscadorMedicos.data = res.data;
                m.redraw();
            })
            .catch(function (e) {
            });

    },
    view: () => {
        return BuscadorMedicos.loader ? [
            m("div.mg-t-10.pd-10.wd-100p",
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),

        ] : !BuscadorMedicos.loader && BuscadorMedicos.data.length !== 0 ? [
            m("div.mg-t-10.pd-10.wd-100p",
                m("table.table.table-sm.tx-11[id='table-medicos'][width='100%']", {
                    oncreate: (e) => {
                        BuscadorMedicos.loadMedicos();

                    }
                }),
            )
        ] : [];

    }
}

const Cita = {};

const AgendaImagen = {
    citasDisponibles: [],
    citasAgendadas: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    loadDetalle: false,
    nuevaCita: false,
    error: "",
    buscarPacientes: false,
    buscarMedicos: false,
    oninit: (_data) => {



        AgendaImagen.loader = true;
        AgendaImagen.citasDisponibles = [];
        AgendaImagen.citasAgendadas = [];
        AgendaImagen.fetchAgendaImagen();
        document.body.classList.add('app-calendar');

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

    },
    setSidebar: () => {

        try {

            // Sidebar calendar
            $('#calendarInline').datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                beforeShowDay: function (date) {

                    // add leading zero to single digit date
                    var day = date.getDate();
                    console.log(day);
                    return [true, (day < 10 ? 'zero' : '')];
                }
            });


            setTimeout(function () {
                // Initialize scrollbar for sidebar
                new PerfectScrollbar('#calendarSidebarBody', { suppressScrollX: true });
            }, 100);



            $('#calendarSidebarShow').on('click', function (e) {
                e.preventDefault()
                $('body').toggleClass('calendar-sidebar-show');

                $(this).addClass('d-none');
                $('#mainMenuOpen').removeClass('d-none');
            })

            $(document).on('click touchstart', function (e) {
                e.stopPropagation();

                // closing of sidebar menu when clicking outside of it
                if (!$(e.target).closest('.burger-menu').length) {
                    var sb = $(e.target).closest('.calendar-sidebar').length;
                    if (!sb) {
                        $('body').removeClass('calendar-sidebar-show');
                        $('#mainMenuOpen').addClass('d-none');
                        $('#calendarSidebarShow').removeClass('d-none');
                    }
                }
            });

            // Initialize tooltip
            $('[data-toggle="tooltip"]').tooltip();


        } catch (error) {

            AgendaImagen.setSidebar();

        }






    },
    setCalendar: () => {

        try {

            // Initialize fullCalendar
            $('#calendar').fullCalendar({
                height: 'parent',
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listWeek'
                },
                navLinks: true,
                selectable: true,
                selectLongPressDelay: 100,
                editable: true,
                nowIndicator: true,
                defaultView: 'listMonth',
                minTime: '06:00:00',
                maxTime: '21:00:00',
                slotDuration: '00:15:00',
                slotLabelInterval: 15,
                slotLabelFormat: 'HH:mma',
                slotMinutes: 15,
                timeFormat: 'HH:mma',
                views: {
                    agenda: {
                        columnHeaderHtml: function (mom) {
                            return '<span>' + mom.format('ddd') + '</span>' +
                                '<span>' + mom.format('DD') + '</span>';
                        }
                    },
                    day: { columnHeader: false },
                    listMonth: {
                        listDayFormat: 'ddd DD',
                        listDayAltFormat: false
                    },
                    listWeek: {
                        listDayFormat: 'ddd DD',
                        listDayAltFormat: false
                    },
                    agendaThreeDay: {
                        type: 'agenda',
                        duration: { days: 3 },
                        titleFormat: 'MMMM YYYY'
                    }
                },

                eventSources: [AgendaImagen.citasAgendadas],
                eventAfterAllRender: function (view) {
                    if (view.name === 'listMonth' || view.name === 'listWeek') {
                        var dates = view.el.find('.fc-list-heading-main');
                        dates.each(function () {
                            var text = $(this).text().split(' ');
                            var now = moment().format('DD');

                            $(this).html(text[0] + '<span>' + text[1] + '</span>');
                            if (now === text[1]) { $(this).addClass('now'); }
                        });
                    }

                    console.log(view.el);

                },
                eventRender: function (event, element) {

                    if (event.description) {
                        element.find('.fc-list-item-title').append('<span class="fc-desc">' + event.description + '</span>');
                        element.find('.fc-content').append('<span class="fc-desc">' + event.description + '</span>');
                    }

                    var eBorderColor = (event.source.borderColor) ? event.source.borderColor : event.borderColor;
                    element.find('.fc-list-item-time').css({
                        color: eBorderColor,
                        borderColor: eBorderColor
                    });

                    element.find('.fc-list-item-title').css({
                        borderColor: eBorderColor
                    });

                    element.css('borderLeftColor', eBorderColor);
                },
                eventDrop: function (calEvent) {
                    console.log(2, calEvent)
                    console.log(2.1, moment(calEvent.start).format('LLL'))
                    console.log(2.2, moment(calEvent.end).format('LLL'))
                },
                eventResize: function (calEvent) {
                    console.log(3, calEvent)
                    console.log(3.1, moment(calEvent.start).format('LLL'))
                    console.log(3.2, moment(calEvent.end).format('LLL'))
                }
            });

            var calendar = $('#calendar').fullCalendar('getCalendar');

            // change view to week when in tablet
            if (window.matchMedia('(min-width: 576px)').matches) {
                calendar.changeView('agendaWeek');
            }

            // change view to month when in desktop
            if (window.matchMedia('(min-width: 992px)').matches) {
                calendar.changeView('month');
            }

            // change view based in viewport width when resize is detected
            calendar.option('windowResize', function (view) {
                if (view.name === 'listWeek') {
                    if (window.matchMedia('(min-width: 992px)').matches) {
                        calendar.changeView('month');
                    } else {
                        calendar.changeView('listWeek');
                    }
                }
            });

            // Display calendar event modal
            calendar.on('eventClick', function (calEvent, jsEvent, view) {

                Cita.id = calEvent.id;
                Cita.start = calEvent.start;
                Cita.end = calEvent.end;
                Cita.paciente = calEvent.title;

                let modal = $('#modalCalendarEvent');

                modal.modal('show');
                modal.find('.event-title').text(Cita.paciente);

                modal.find('.event-start-date').text(moment(calEvent.start).format('LLL'));
                modal.find('.event-end-date').text(moment(calEvent.end).format('LLL'));

                //styling
                modal.find('.modal-header').css('backgroundColor', (calEvent.source.borderColor) ? calEvent.source.borderColor : calEvent.borderColor);


            });

            // display current date
            var dateNow = calendar.getDate();
            calendar.option('select', function (startDate, endDate) {

                Cita.hashCita = startDate.format('YYYY-MM-DD HH:mm') + '.' + endDate.format('YYYY-MM-DD  HH:mm')
                Cita.start = startDate.format('dddd, DD-MM-YYYY HH:mm');
                Cita.end = endDate.format('dddd, DD-MM-YYYY HH:mm');
                $('#modalCreateEvent').modal('show');
                console.log(Cita)
                document.getElementById('nhcPaciente').focus();
                m.redraw();


            });

            $('.select2-modal').select2({
                minimumResultsForSearch: Infinity,
                dropdownCssClass: 'select2-dropdown-modal',
            });


            $('.calendar-add').on('click', function (e) {
                e.preventDefault()

                $('#modalCreateEvent').modal('show');
            });

        } catch (error) {
            location.reload();


        }





    },
    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-Imagen-Agenda');
    },
    fetchAgendaImagen: () => {



        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/medicos/mi-agenda?idAgenda=1875",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                AgendaImagen.loader = false;
                AgendaImagen.citasDisponibles = result.citasDisponibles;
                AgendaImagen.citasAgendadas = result.citasAgendadas;
                setTimeout(function () { AgendaImagen.setCalendar(); }, 10);
                setTimeout(function () { AgendaImagen.setSidebar(); }, 20);
            })
            .catch(function (e) {
                setTimeout(function () { AgendaImagen.fetchAgendaImagen(); }, 1000);
            });

    },
    agendarCita: () => {

        AgendaImagen.loader = true;

        throw "";

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/medicos/agenda/crear-cita",
            body: {
                availableServiceId: 0,
                covenantId: 2,
                covenantPlanId: 2,
                dateBirth: "1962-03-23",
                email: "mariobe7@hotmail.com",
                id: Cita.id,
                isFitting: true,
                markingTypeId: 0,
                patientId: Cita.nhc,
                patientName: Cita.paciente,
                phoneNumber: "0999721820",
                scheduleFormType: "PERSONALLY",
                schedulingItemId: 428,
                sexType: "MALE",
                specialityId: 66,
                statusScheduleType: "M"


            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {

                console.log(result);

                if (result) {
                    alert('Cita agendada con éxito.');
                    window.location.reload();
                } else {
                    alert(resul);
                }

            })
            .catch(function (e) { });

    },
    view: (_data) => {


        return AgendaImagen.loader ? [
            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [
                    m("div.calendar-sidebar-header"),
                    m("div.calendar-sidebar-body")
                ]),
                m("div.calendar-content", [
                    m("div.calendar-content-body.tx-center.mg-t-50", "Procesando... por favor espere.")
                ]),

            ]

            ),
        ] : AgendaImagen.error.length !== 0 ? [
            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [
                    m("div.calendar-sidebar-header"),
                    m("div.calendar-sidebar-body")
                ]),
                m("div.calendar-content", [
                    m("div.calendar-content-body[id='calendar']")
                ]),

            ]

            ),
        ] : !AgendaImagen.loader && (AgendaImagen.citasDisponibles.length !== 0 && AgendaImagen.citasAgendadas.length !== 0) ? [
            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [
                    m("div.calendar-sidebar-header", [
                        m("i[data-feather='search']"),
                        m("div.search-form", [
                            m("input.form-control[type='search']")
                        ]),
                        m("a.btn btn-sm btn-primary btn-icon calendar-add", [
                            m("div[data-toggle='tooltip']", [
                                m("i.tx-white[data-feather='plus']")
                            ])
                        ])
                    ]),
                    m("div.calendar-sidebar-body[id='calendarSidebarBody']", [
                        m("div.calendar-inline", [
                            m("div[id='calendarInline']")
                        ]),
                        m("div.pd-y-20.pd-x-15", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.pd-l-10.mg-b-10",
                                "Área/Salas:"
                            ),
                            m("nav.calendar-nav", [
                                m("a.discover.show[href='']", [
                                    m("span"),
                                    "  Sala 1 "
                                ]),
                                m("a.meetup.show[href='']", [
                                    m("span"),
                                    " Sala 2"
                                ]),

                            ])
                        ])
                    ])
                ]),
                m("div.calendar-content", [
                    m("div.calendar-content-body[id='calendar']",),
                ]),




            ]),
            m(".modal.calendar-modal-create[id='modalCreateEvent'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header.tx-white", {
                            style: { 'background-color': 'rgb(50, 90, 152)' }
                        }, [
                            m("h5.event-title.tx-white",
                                "Nueva Cita"
                            ),

                        ]),
                        m("div.modal-body.pd-20.pd-sm-30", [
                            m("div", {
                                class: (!AgendaImagen.buscarPacientes ? 'd-none' : '')
                            }, [
                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                    "Buscar Pacientes:"
                                ),
                                m("div.form-group",
                                    m("div.input-group",
                                        [
                                            m("input.form-control[type='text'][placeholder='Apellidos y Nombres']",
                                                {
                                                    oninput: (e) => {
                                                        BuscadorPacientes.searchField = e.target.value;
                                                    }
                                                }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-outline-light[type='button'][id='button-addon2']", {
                                                    onclick: (e) => {
                                                        BuscadorPacientes.fetchSearch();
                                                    }
                                                },
                                                    "Buscar"
                                                ),
                                                m("button.btn.btn-outline-light[type='button'][id='button-addon2']", {
                                                    onclick: (e) => {
                                                        AgendaImagen.buscarPacientes = !AgendaImagen.buscarPacientes;
                                                    }
                                                },
                                                    "Regresar"
                                                )
                                            )
                                        ]
                                    ),
                                    m("div.row", [
                                        m("div.col-12",
                                            m(BuscadorPacientes)
                                        ),

                                    ])

                                ),


                            ]),
                            m("div", {
                                class: (!AgendaImagen.buscarMedicos ? 'd-none' : '')
                            }, [
                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                    "Buscar Médicos:"
                                ),
                                m("div.form-group",
                                    m("div.input-group",
                                        [
                                            m("input.form-control[type='text'][placeholder='Apellidos y Nombres']",
                                                {
                                                    oninput: (e) => {
                                                        console.log(e.key)
                                                        BuscadorMedicos.searchField = e.target.value;
                                                    },

                                                }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-outline-light[type='button'][id='button-addon2']", {
                                                    onclick: (e) => {
                                                        BuscadorMedicos.fetchSearch();
                                                    }
                                                },
                                                    "Buscar"
                                                ),
                                                m("button.btn.btn-outline-light[type='button'][id='button-addon2']", {
                                                    onclick: (e) => {
                                                        AgendaImagen.buscarMedicos = !AgendaImagen.buscarMedicos;
                                                    }
                                                },
                                                    "Regresar"
                                                )
                                            )
                                        ]
                                    ),
                                    m("div.row", [
                                        m("div.col-12",
                                            m(BuscadorMedicos)
                                        ),

                                    ])

                                ),


                            ]),
                            m("div", {
                                class: (AgendaImagen.buscarPacientes || AgendaImagen.buscarMedicos ? 'd-none' : '')
                            }, [
                                m("div.form-group",
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Ubicación:"
                                    ),
                                    m("div.input-group",
                                        [

                                            m("input.form-control[type='text']", {
                                                value: 'Endoscopía: SALA 1',
                                                disabled: 'disabled'
                                            }),

                                        ]
                                    )
                                ),
                                m("div.form-group",
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Tipo:"
                                    ),
                                    m("div.input-group",
                                        [
                                            m("div.custom-control.custom-radio",
                                                [
                                                    m("input.custom-control-input[type='radio'][id='customRadio1'][name='customRadio'][checked]"),
                                                    m("label.custom-control-label[for='customRadio1']",
                                                        "Cita"
                                                    )
                                                ]
                                            ),
                                            m("div.custom-control.custom-radio.mg-l-20",
                                                [
                                                    m("input.custom-control-input[type='radio'][id='customRadio2'][name='customRadio'][checked]"),
                                                    m("label.custom-control-label[for='customRadio2']",
                                                        "Evento"
                                                    )
                                                ]
                                            )

                                        ]
                                    )
                                ),

                                m("div.form-group",
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Historia Clínica Paciente:"
                                    ),
                                    m("div.input-group",
                                        [

                                            m("input.form-control[id='nhcPaciente'][type='text'][placeholder='Numero de Historia Clínica'][autofocus]", {
                                                value: (Cita.paciente !== undefined ? Cita.paciente : ''),
                                                oninput: (e) => {
                                                    Cita.nhc = e.target.value;
                                                },
                                                disabled: (Cita.paciente !== undefined ? 'disabled' : '')
                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button'][id='button-addon2']", {
                                                    onclick: (e) => {
                                                        AgendaImagen.buscarPacientes = !AgendaImagen.buscarPacientes;
                                                    }
                                                },
                                                    "Buscar Pacientes"
                                                )
                                            )
                                        ]
                                    )
                                ),
                                m("div.form-group", [

                                    m("div.row.row-xs", [
                                        m("div.col-6",
                                            m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                "Fecha y Hora de Inicio:"
                                            ),
                                            m("input.form-control[id='eventStartDate'][type='text'][disabled='disabled']", {
                                                value: Cita.start
                                            })
                                        ),
                                        m("div.col-6",
                                            m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                "Fecha y Hora de Fin"
                                            ),
                                            m("input.form-control[type='text'][value=''][disabled='disabled']",
                                                {
                                                    value: Cita.end

                                                })
                                        ),

                                    ]),


                                ]),

                                m("div.form-group",
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Médico:"
                                    ),
                                    m("div.input-group",
                                        [
                                            m("input.form-control[type='text'][placeholder='Numero de Historia Clínica']", {
                                                value: Cita.prestador,
                                                disabled: (Cita.prestador !== undefined ? 'disabled' : '')

                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button'][id='button-addon2']", {
                                                    onclick: (e) => {
                                                        AgendaImagen.buscarMedicos = !AgendaImagen.buscarMedicos;
                                                    }
                                                },
                                                    "Buscar Médicos"
                                                )
                                            )
                                        ]
                                    ),

                                ),
                                m("div.form-group",
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Estudio:"
                                    ),
                                    m("div.input-group",
                                        [
                                            m("input.form-control[type='text'][placeholder='Numero de Historia Clínica']", {

                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button'][id='button-addon2']", {
                                                    onclick: (e) => {
                                                        AgendaImagen.buscarMedicos = !AgendaImagen.buscarMedicos;
                                                    }
                                                },
                                                    "Buscar Médicos"
                                                )
                                            )
                                        ]
                                    ),

                                ),
                                m("div.form-group",
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Comentarios:"
                                    ),
                                    m("textarea.form-control[rows='2'][placeholder='Comentarios']")
                                )
                            ])
                        ]),
                        m("div.modal-footer", [
                            m("button.btn.btn-primary.mg-r-5", {
                                onclick: (el) => {
                                    el.dom.innerHTML = 'Procesando...';
                                    AgendaImagen.agendarCita();
                                }
                            },
                                "Agendar Cita"
                            ),
                            m("a.btn.btn-secondary[href=''][data-dismiss='modal']",
                                "Cerrar"
                            )
                        ])
                    ])
                )
            ),
            m(".modal.calendar-modal-event[id='modalCalendarEvent'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header", [
                            m("h6.event-title"),
                            m("nav.nav.nav-modal-event", [
                                m("a.nav-link[href='#']",
                                    m("i[data-feather='external-link']")
                                ),
                                m("a.nav-link[href='#']",
                                    m("i[data-feather='trash-2']")
                                ),
                                m("a.nav-link[href='#'][data-dismiss='modal']",
                                    m("i[data-feather='x']")
                                )
                            ])
                        ]),
                        m("div.modal-body", [
                            m("div.row.row-sm", [
                                m("div.col-sm-6", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                        "Start Date"
                                    ),
                                    m("p.event-start-date")
                                ]),
                                m("div.col-sm-6", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                        "End Date"
                                    ),
                                    m("p.event-end-date")
                                ])
                            ]),
                            m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                "Description"
                            ),
                            m("p.event-desc.tx-gray-900.mg-b-40"),
                            m("a.btn.btn-secondary.pd-x-20[href=''][data-dismiss='modal']",
                                "Close"
                            )
                        ])
                    ])
                )
            )

        ] : !AgendaImagen.loader && (AgendaImagen.citasDisponibles.length == 0 && AgendaImagen.citasAgendadas.length == 0) ? [
            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [
                    m("div.calendar-sidebar-header"),
                    m("div.calendar-sidebar-body")
                ]),
                m("div.calendar-content", [
                    m("div.calendar-content-body[id='calendar']")
                ]),

            ]

            ),
        ] : [
            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [
                    m("div.calendar-sidebar-header"),
                    m("div.calendar-sidebar-body")
                ]),
                m("div.calendar-content", [
                    m("div.calendar-content-body[id='calendar']")
                ]),

            ]

            ),
        ];


    },

};



export default AgendaImagen;