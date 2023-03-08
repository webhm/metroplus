import m from "mithril";
import terapiaRespiratoriaController from "./Models/obtenerDatos";
import Pedido from "./pedido";
import Encrypt from "../../../models/encrypt";

const obtenerDatos = terapiaRespiratoriaController;
const FormularioDeRegistro = {
  oninit: () => {
    terapiaRespiratoriaController.cargarFrecuenciaCardiaca(10090);
    terapiaRespiratoriaController.cargarFrecuenciaRespiratoria(10090);
    terapiaRespiratoriaController.cargarPeso(10090);
    terapiaRespiratoriaController.cargarEscalaDelDolor(10090);

    terapiaRespiratoriaController.cargarPrescripcion(2780); //Aqui poner el numero de atendimiento
    //terapiaRespiratoriaController.cargarPrescripcion(10090); //Aqui poner el numero de atendimiento
    terapiaRespiratoriaController.cargarFechaActual();
    terapiaRespiratoriaController.cargarHoraActual();
    console.log(`Emill 1  ${terapiaRespiratoriaController.habilitarCampos}`);
    console.log(`Emill 2  ${!terapiaRespiratoriaController.habilitarCampos}`);

    FormularioDeRegistro.usuarioConectado = Encrypt.getDataUser(); // Obtener el nombre de usuario
  },
  usuarioConectado: [],
  view: (vnode) => {
    return m("form", [
      m("div", { class: "form-row" }, [
        m("div", { class: "form-group col-md-4" }, [
          m("label", { for: "inputFrecuenciaCardiaca" }, "Frecuencia Cardiaca"),
          m("input", {
            class: "form-control",
            type: "number",
            id: "inputFrecuenciaCardiaca",
            placeholder: "Frecuencia Cardiaca",
            readonly: "readonly",
            /* value:
              terapiaRespiratoriaController.listaDeFrecuenciaCardiaca.data[0]
                .VALUE, */
            value: obtenerDatos.listaDeFrecuenciaCardiaca.data[0].VALUE,
          }),
        ]),
        m("div", { class: "form-group col-md-4" }, [
          m(
            "label",
            { for: "inputFrecuenciaRespiratoria" },
            "Frecuencia Respiratoria"
          ),
          m("input", {
            class: "form-control",
            type: "number",
            id: "inputFrecuenciaRespiratoria",
            placeholder: "Frecuencia Respiratoria",
            readonly: "readonly",
            /* value:
              terapiaRespiratoriaController.listaDeFrecuenciaRespiratoria
                .data[0].VALUE, */
            value: obtenerDatos.listaDeFrecuenciaRespiratoria.data[0].VALUE,
          }),
        ]),
        m("div", { class: "form-group col-md-4" }, [
          m("label", { for: "inputPeso" }, "Peso"),
          m("input", {
            class: "form-control",
            type: "text",
            id: "inputPeso",
            placeholder: "Peso",
            readonly: "readonly",
            value: obtenerDatos.listaDePeso.data[0].VALUE,
          }),
        ]),
      ]),
      m("div", { class: "form-row" }, [
        m("div", { class: "form-group col-md-4" }, [
          m("label", { for: "inputEscalaDolor" }, "Escala Dolor"),
          m("input", {
            class: "form-control",
            type: "text",
            id: "inputEscalaDolor",
            placeholder: "Escala Dolor",
            readonly: "readonly",
            value:
            obtenerDatos.listaEscalaDelDolor.data[0].VALUE,
          }),
        ]),
        m("div", { class: "form-group col-md-4" }, [
          m("label", { for: "inputAtencion" }, "Atención"),
          m("input", {
            class: "form-control",
            type: "number",
            id: "inputAtencion",
            placeholder: "Atención",
            readonly: "readonly",
            value: Pedido.data.AT_MV,
          }),
        ]),
        m("div", { class: "form-group col-md-4" }, [
          m("label", { for: "inputUsuario" }, "Usuario"),
          m("input", {
            class: "form-control",
            type: "text",
            id: "inputUsuario",
            placeholder: "Usuario",
            readonly: "readonly",
            value: FormularioDeRegistro.usuarioConectado.user.user,
          }),
        ]),
      ]),
      m("div", { class: "form-group" }, [
        m("label", { for: "inputPrescripcion" }, "Prescripción"),
        m(
          "select",
          { class: "custom-select" },
          obtenerDatos.lista.data.map(function (prescripcion) {
            return m(
              "option",
              { value: `${prescripcion.CODIGO} ${prescripcion.FECHA}` },
              prescripcion.CODIGO,
              " ",
              prescripcion.FECHA
            );
          })
        ),
      ]),
      m("div", { class: "form-group" }, [
        m("label", { for: "inputCod" }, "Cod"),
        m("input", {
          class: "form-control",
          type: "text",
          id: "inputCod",
          placeholder: "Código",
        }),
      ]),
      m("div", { class: "form-group" }, [
        m("label", { for: "inputFecha" }, "Fecha"),
        m("input", {
          class: "form-control",
          type: "text",
          id: "inputFecha",
          placeholder: "Fecha",
          value: obtenerDatos.fechaActual,
          readonly: "readonly",
        }),
      ]),
      m("div", { class: "form-group" }, [
        m("label", { for: "inputHora" }, "Hora"),
        m("input", {
          class: "form-control",
          type: "text",
          id: "inputHora",
          placeholder: "Hora",
          value: obtenerDatos.horaActual,
          readonly: "readonly",
        }),
      ]),
      m("div", { class: "form-group" }, [
        m("label", { for: "inputFrecuenciaAlDia" }, "Frecuencia al día"),
        m(
          "select",
          {
            class: "custom-select",
            disabled: obtenerDatos.habilitarCampos,
            id: "inputFrecuenciaAlDia"
          },
          [
            m("option", "Seleccione..."),
            m("option", { value: "1" }, "En este momento"),
            m("option", { value: "2" }, "Una vez"),
            m("option", { value: "3" }, "Dos veces"),
            m("option", { value: "4" }, "Tres veces"),
            m("option", { value: "5" }, "Cuatro veces"),
            m("option", { value: "6" }, "Cada hora"),
            m("option", { value: "7" }, "Cada dos horas"),
            m("option", { value: "8" }, "Cada tres horas"),
            m("option", { value: "9" }, "Cada cuatro horas"),
            m("option", { value: "10" }, "Cada sesis horas"),
            m("option", { value: "11" }, "Cada ocho horas"),
            m("option", { value: "12" }, "Cada doce horas"),
            m("option", { value: "13" }, "Set"),
            m("option", { value: "14" }, "Respetar horas de sueño"),
          ]
        ),
      ]),
      m(
        "div",
        { class: "form-row" },
        m("div", { class: "form-group col-md-12" }, [
          m(
            "label",
            { for: "inputTerapiaAerosolMedicina" },
            "Terapia Aerosol Medicinas"
          ),
          m("div", { class: "input-group" }, [
            m(
              "select",
              {
                class: "custom-select",
                disabled: obtenerDatos.habilitarCampos,
                id: "inputTerapiaAerosolMedicina",
              },
              [
                m("option", "Seleccione..."),
                m("option", { value: "1" }, "Nebulización"),
                m("option", { value: "2" }, "Ultrasonido"),
                m("option", { value: "3" }, "Inhaladores dosis medida"),
              ]
            ),
            m(
              "select",
              {
                class: "custom-select",
                disabled: obtenerDatos.habilitarCampos,
                //disabled: true,
                id: "inputDosisTerapiaAerosol"
              },
              [
                m("option", "Seleccione..."),
                m("option", { value: "1" }, "Salbumatol"),
                m("option", { value: "2" }, "Bromuro de ipratropio"),
                m("option", { value: "3" }, "N acetilcisteina"),
                m("option", { value: "3" }, "Clorhidrato de ambroxol"),
                m("option", { value: "5" }, "Hipersal (3,5%)"),
                m("option", { value: "6" }, "Hipersal (7%)"),
                m("option", { value: "7" }, "Dexametasona"),
                m("option", { value: "8" }, "Solución salina (0,9%)"),
                m("option", { value: "9" }, "Adrenalina Racénica"),
                m("option", { value: "10" }, "Otros"),
              ]
            ),
          ]),
        ])
      ),
      m("div", { class: "form-group" }, [
        m(
          "label",
          { for: "inputHigieneBroncoPulmonar" },
          "Higiene Bronco Pulmonar"
        ),
        m(
          "select",
          {
            class: "custom-select",
            disabled: obtenerDatos.habilitarCampos,
            id: "inputHigieneBroncoPulmonar",
          },
          [
            m("option", "Seleccione..."),
            m("option", { value: "1" }, "Drenaje postural"),
            m("option", { value: "2" }, "Percusiones"),
            m("option", { value: "3" }, "Vibraciones"),
            m("option", { value: "4" }, "Tos efectiva"),
            m("option", { value: "5" }, "Asistente de tos"),
            m("option", { value: "6" }, "Chaleco Vibroprecutor"),
          ]
        ),
      ]),
      m(
        "div",
        { class: "form-row" },
        m("div", { class: "form-group col-md-12" }, [
          m("label", { for: "inputTerapiaExpansiva" }, "Terapia Expansiva"),
          m("div", { class: "input-group" }, [
            m(
              "select",
              {
                id: "inputTerapiaExpansiva",
                class: "custom-select",
                onchange: function (event) {
                  let selectValue = event.target.value;
                  let inputTerapiaExpansiva2 = document.getElementById(
                    "inputTerapiaExpansiva2"
                  );
                  if (selectValue === "1") {
                    inputTerapiaExpansiva2.removeAttribute("readonly");
                  } else {
                    inputTerapiaExpansiva2.setAttribute("readonly", "readonly");
                    inputTerapiaExpansiva2.value = "";
                  }
                },
                disabled: obtenerDatos.habilitarCampos,
              },
              [
                m("option", "Seleccione..."),
                m("option", { value: "1" }, "Incentivo respiratorio"),
                m(
                  "option",
                  { value: "2" },
                  "Presión positiva continua en la vía aérea"
                ),
                m(
                  "option",
                  { value: "3" },
                  "Presión positiva al final de la expiración"
                ),
                m("option", { value: "4" }, "Kinesioterapia del torax"),
                m("option", { value: "5" }, "Ejercicios respiratorios"),
              ]
            ),

            m("input", {
              class: "form-control",
              type: "number",
              id: "inputTerapiaExpansiva2",
              placeholder: "Terapia Expansiva",
              readonly: "readonly",
              maxlength: 10,
              oninput: function (event) {
                event.target.value = event.target.value.slice(0, 10);
              },
            }),
          ]),
        ])
      ),

      m(
        "div",
        { class: "form-row" },
        m("div", { class: "form-group col-md-12" }, [
          m("label", { for: "inputOxinoterapia" }, "Oxinoterapia"),
          m("div", { class: "input-group" }, [
            m(
              "select",
              {
                class: "custom-select",
                disabled: obtenerDatos.habilitarCampos,
                id: "Oxinoterapia",
              },
              [
                m("option", "Seleccione..."),
                m(
                  "option",
                  { value: "1" },
                  "Fracción inspirada de oxígeno (FiO2)%"
                ),
                m("option", { value: "2" }, "Alto flujo (litro por minuto)"),
                m("option", { value: "3" }, "Tienda facial"),
                m("option", { value: "4" }, "Tubo en T"),
              ]
            ),
            m("input", {
              class: "form-control",
              type: "number",
              id: "inputOxinoterapia2",
              placeholder: "Oxinoterapia",
              //readonly: "readonly",
              disabled: obtenerDatos.habilitarCampos,
              maxlength: 10,
              oninput: function (event) {
                event.target.value = event.target.value.slice(0, 10);
              },
            }),
          ]),
        ])
      ),
      m(
        "div",
        { class: "form-row" },
        m("div", { class: "form-group col-md-12" }, [
          m("label", { for: "inputMonitoreoPrevio" }, "Monitoreo Previo"),
          m("div", { class: "input-group" }, [
            m(
              "select",
              {
                class: "custom-select",
                disabled: obtenerDatos.habilitarCampos,
                id: "inputMonitoreoPrevio",
                onchange: function (event) {
                  let selectValue = event.target.value;
                  let inputMonitoreoPrevio2 = document.getElementById("inputMonitoreoPrevio2");
                  if (selectValue === "1") {
                    inputMonitoreoPrevio2.removeAttribute("readonly");
                  } else {
                    inputMonitoreoPrevio2.setAttribute("readonly", "readonly");
                    inputMonitoreoPrevio2.value = "";
                  }
                },
              },
              [
                m("option", "Seleccione..."),
                m("option", { value: "1" }, "Saturación O2(%)"),
                m("option", { value: "2" }, "Ventilación mecánica"),
                m("option", { value: "3" }, "Ventilación no invasiva"),
              ]
            ),
            m("input", {
              class: "form-control",
              type: "number",
              id: "inputMonitoreoPrevio2",
              placeholder: "Monitoreo Previo",
              readonly: "readonly",
              maxlength: 10,
              oninput: function (event) {
                event.target.value = event.target.value.slice(0, 10);
              },
            }),
          ]),
        ])
      ),
      m(
        "div",
        { class: "form-row" },
        m("div", { class: "form-group col-md-12" }, [
          m("label", { for: "inputMonitoreoPosterior" }, "Monitereo Posterior"),
          m("div", { class: "input-group" }, [
            m(
              "select",
              {
                class: "custom-select",
                disabled: obtenerDatos.habilitarCampos,
                id: "inputMonitoreoPosterior",
                onchange: function (event) {
                  let selectValue = event.target.value;
                  let inputMonitoreoPosterior2 = document.getElementById("inputMonitoreoPosterior2");
                  if (selectValue === "1") {
                    inputMonitoreoPosterior2.removeAttribute("readonly");
                  } else {
                    inputMonitoreoPosterior2.setAttribute("readonly", "readonly");
                    inputMonitoreoPosterior2.value = "";
                  }
                },
              },
              [
                m("option", "Seleccione..."),
                m("option", { value: "1" }, "Saturación O2(%)"),
                m("option", { value: "2" }, "Ventilación mecánica"),
                m("option", { value: "3" }, "Ventilación no invasiva"),
              ]
            ),
            m("input", {
              class: "form-control",
              type: "number",
              id: "inputMonitoreoPosterior2",
              placeholder: "Monitoreo Posterior",
              readonly: "readonly",
              maxlength: 10,
              oninput: function (event) {
                event.target.value = event.target.value.slice(0, 10);
              },
            }),
          ]),
        ])
      ),
      /* m("input", {
        class: "form-control",
        type: "number",
        id: "inputSuccion",
        placeholder: "Frecuencia Cardiaca",
        //readonly: "readonly",
        disabled: obtenerDatos.habilitarCampos
      }), */
      m(
        "div",
        { class: "form-row" },
        m("div", { class: "form-group col-md-12" }, [
          m("label", { for: "inputSuccion" }, "Succión"),
          m("div", { class: "input-group" }, [
            m("input", {
              class: "form-control",
              type: "text",
              id: "inputSuccion",
              placeholder: "Frecuencia Cardiaca",
              //readonly: "readonly",
              disabled: obtenerDatos.habilitarCampos,
              maxlength: 50,
              oninput: function (event) {
                event.target.value = event.target.value.slice(0, 50);
              },
            }),
          ]),
        ])
      ),
      m("div", { class: "form-group row" }, [
        m("label", { class: "col-form-label col-sm-2 pt-0" }, "Muestra"),
        m("div", { class: "col-sm-10" }, [
          m("div", { class: "custom-control custom-radio" }, [
            m("input", {
              class: "custom-control-input",
              type: "radio",
              name: "customRadio",
              //checked: "checked",
              disabled: !obtenerDatos.habilitarCampos,
            }),
            m("label", { class: "custom-control-label" }, "Esputo"),
          ]),
          m("div", { class: "custom-control custom-radio" }, [
            m("input", {
              class: "custom-control-input",
              type: "radio",
              name: "customRadio",
              disabled: !obtenerDatos.habilitarCampos,
            }),
            m("label", { class: "custom-control-label" }, "Panel Viral"),
          ]),
        ]),
      ]),
      m("div", { class: "form-group" }, [
        m(
          "label",
          { class: "form-label", for: "textAreaObservacionClinica" },
          "Observación clinica"
        ),
        m("textarea", {
          class: "form-control",
          id: "textAreaObservacionClinica",
          rows: "3",
          disabled: obtenerDatos.habilitarCampos,
        }),
      ]),
      m("div", { class: "form-group" }, [
        m(
          "label",
          { class: "form-label", for: "textAreaCriterio" },
          "Criterio"
        ),
        m("textarea", {
          class: "form-control",
          id: "textAreaCriterio",
          rows: "3",
          disabled: obtenerDatos.habilitarCampos,
        }),
      ]),
      m(
        "button",
        {
          class: "btn btn-primary",
          type: "submit",
          disabled: obtenerDatos.habilitarCampos,
          onclick: function () {
            const formulario = {
              CD_FORMULARIO: 17,
              CD_ATENDIMENTO: `${Pedido.data.AT_MV}`,
              FECHA_REGISTRO: `to_date('${vnode.dom['inputFecha'].value}','DD-MM-YY')`,
              USUARIO: `'${vnode.dom['inputUsuario'].value}'`,
              CD_SECUENCIAL: 11, // Aqui poner un secuencial
              FRECUENCIA_CARDIACA: `${vnode.dom['inputFrecuenciaCardiaca'].value}`,
              FRECUENCIA_RESPIRATORIA: `${vnode.dom['inputFrecuenciaRespiratoria'].value}`,	
              PESO: `'${vnode.dom['inputPeso'].value}'`,
              ESCALA_DOLOR: `'${vnode.dom['inputEscalaDolor'].value}'`,
              HORA_REGISTRO: `'${vnode.dom['inputHora'].value}'`,
              FRECUENCIA_DIARIA: `'${vnode.dom['inputFrecuenciaAlDia'].value}'`,
              TERAPIA_AEROSOL: `'${vnode.dom['inputTerapiaAerosolMedicina'].value}'`,
              DOSIS_TERAPIA_AEROSOL: `'${vnode.dom['inputDosisTerapiaAerosol'].value}'`,
              HIGIENE_BRONCO_PULMONA: `'${vnode.dom['inputHigieneBroncoPulmonar'].value}'`,
              TERAPIA_EXPANSIVA: `'${vnode.dom['inputTerapiaExpansiva'].value}'`,
              CANTIDAD_TERAPIA_EXPANSIVA: `'${vnode.dom['inputTerapiaExpansiva2'].value}'`,
              OXIGENO_TERAPIA: `'${parseInt(vnode.dom['Oxinoterapia'].value)}'`,
              CANTIDAD_OXIGENO_TERAPIA: `'${vnode.dom['inputOxinoterapia2'].value}'`,
              MONITOREO_TERAPIA: `'${vnode.dom['inputMonitoreoPrevio'].value}'`,
              CANTIDAD_MONITOREO_TERAPIA: `'${vnode.dom['inputMonitoreoPrevio2'].value}'`,
              SUCCION_TERAPIA: `'${vnode.dom['inputSuccion'].value}'`,
              ESPUTO: "'false'",
              PANEL_VIRAL: "'false'",
              OBSERVACION_CLINICA: `${vnode.dom['textAreaObservacionClinica'].value}`,
              CRITERIO_CLINICO: `${vnode.dom['textAreaCriterio'].value}`,
              CD_PRE_MED: 10, // Este es la la información de la prescripción

              // Falta monitoreo posterior y cantidad de monitoreo posterior
            };
            console.log(formulario);
            obtenerDatos.guardar(formulario);
            //alert("Guardar");
            //alert("Guardar");
            //terapiaRespiratoriaController.guardar(formulario);
          },
        },
        "Guardar"
      ),
      m(
        "button",
        {
          class: "btn btn-primary",
          type: "submit",
          disabled: obtenerDatos.habilitarCampos,
        },
        "Eliminar"
      ),
    ]);
  },
};

export default FormularioDeRegistro;
