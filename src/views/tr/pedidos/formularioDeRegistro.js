import m from "mithril";

const FormularioDeRegistro = {
  view: () => {
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
          }),
        ]),
      ]),
      m("div", { class: "form-group" }, [
        m("label", { for: "inputPrescripcion" }, "Prescripción"),
        m("select", { class: "custom-select" }, [
          m("option", { value: "1" }, "Hay que traer de la base de datos"),
          m("option", { value: "2" }, "Hay que traer de la base de datos"),
          m("option", { value: "3" }, "Hay que traer de la base de datos"),
        ]),
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
        }),
      ]),
      m("div", { class: "form-group" }, [
        m("label", { for: "inputHora" }, "Hora"),
        m("input", {
          class: "form-control",
          type: "text",
          id: "inputHora",
          placeholder: "Hora",
        }),
      ]),
      m("div", { class: "form-group" }, [
        m("label", { for: "inputFrecuenciaAlDia" }, "Frecuencia al día"),
        m("select", { class: "custom-select" }, [
          m('option','Seleccione...'),
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
        ]),
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
            m("select", { class: "custom-select" }, [
              m('option','Seleccione...'),
              m("option", { value: "1" }, "Nebulización"),
              m("option", { value: "2" }, "Ultrasonido"),
              m("option", { value: "3" }, "Inhaladores dosis medida"),
            ]),
            m("select", { class: "custom-select" }, [
              m('option','Seleccione...'),
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
            ]),
          ]),
        ])
      ),
      m("div", { class: "form-group" }, [
        m(
          "label",
          { for: "inputHigieneBroncoPulmonar" },
          "Higiene Bronco Pulmonar"
        ),
        m("select", { class: "custom-select" }, [
          m('option','Seleccione...'),
          m("option", { value: "1" }, "Drenaje postural"),
          m("option", { value: "2" }, "Percusiones"),
          m("option", { value: "3" }, "Vibraciones"),
          m("option", { value: "4" }, "Tos efectiva"),
          m("option", { value: "5" }, "Asistente de tos"),
          m("option", { value: "6" }, "Chaleco Vibroprecutor"),
        ]),
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
                
              },
              [
                m('option','Seleccione...'),
                m("option", {value: "1"},"Incentivo respiratorio"),
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
              placeholder: "Frecuencia Cardiaca",
              readonly: "readonly",
              maxlength: "50",
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
            m("select", { class: "custom-select" }, [
              m('option','Seleccione...'),
              m(
                "option",
                { value: "1" },
                "Fracción inspirada de oxígeno (FiO2)%"
              ),
              m("option", { value: "2" }, "Alto flujo (litro por minuto)"),
              m("option", { value: "3" }, "Tienda facial"),
              m("option", { value: "4" }, "Tubo en T"),
            ]),
            m("input", {
              class: "form-control",
              type: "number",
              id: "inputOxinoterapia2",
              placeholder: "Frecuencia Cardiaca",
              readonly: "readonly",
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
            m("select", { class: "custom-select" }, [
              m('option','Seleccione...'),
              m("option", { value: "1" }, "Saturación O2(%)"),
              m("option", { value: "2" }, "Ventilación mecánica"),
              m("option", { value: "3" }, "Ventilación no invasiva"),
            ]),
            m("input", {
              class: "form-control",
              type: "number",
              id: "inputMonitoreoPrevio2",
              placeholder: "Frecuencia Cardiaca",
              readonly: "readonly",
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
            m("input", {
              class: "form-control mr-2",
              type: "number",
              id: "inputMonitoreoPosterior",
              placeholder: "Terapia Aerosol Medicinas",
              readonly: "readonly",
            }),
            m("input", {
              class: "form-control",
              type: "number",
              id: "inputMonitoreoPosterior2",
              placeholder: "Frecuencia Cardiaca",
              readonly: "readonly",
            }),
          ]),
        ])
      ),
      m(
        "div",
        { class: "form-row" },
        m("div", { class: "form-group col-md-12" }, [
          m("label", { for: "inputSuccion" }, "Succión"),
          m("div", { class: "input-group" }, [
            m(
              "select",
              {
                class: "custom-select",
                onchange: function (event) {
                  let selectValue = event.target.value;
                  let inputSuccion2 = document.getElementById("inputSuccion2");
                  if (selectValue === "2") {
                    inputSuccion2.removeAttribute("readonly");
                  } else {
                    inputSuccion2.setAttribute("readonly", "readonly");
                    inputSuccion2.value = "";
                  }
                },
              },
              [
                m('option','Seleccione...'),
                m("option", { value: "1" }, "Nasotraqueal"),
                m("option", { value: "2" }, "Traqueal"),
                m("option", { value: "3" }, "Otrotraqueal"),
                m("option", { value: "4" }, "Lavado nasal"),
                m("option", { value: "5" }, "Suglótica"),
              ]
            ),
            m("input", {
              class: "form-control",
              type: "text",
              id: "inputSuccion2",
              placeholder: "Frecuencia Cardiaca",
              readonly: "readonly",
              maxlength: "50",
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
              checked: "checked",
            }),
            m("label", { class: "custom-control-label" }, "Esputo"),
          ]),
          m("div", { class: "custom-control custom-radio" }, [
            m("input", {
              class: "custom-control-input",
              type: "radio",
              name: "customRadio",
            }),
            m("label", { class: "custom-control-label" }, "Panel Viral"),
          ]),
        ]),
      ]),
      m("div", { class: "form-row" }, [
        m("div", { class: "form-group col-md-5" }, [
          m("label", "Birthday"),
          m("select", { class: "custom-select" }, [
            m("option", { selected: "selected" }, "Month"),
            m("option", { value: "1" }, "January"),
            m("option", { value: "2" }, "February"),
            m("option", { value: "3" }, "March"),
            m("option", { value: "4" }, "April"),
            m("option", { value: "5" }, "May"),
            m("option", { value: "6" }, "June"),
            m("option", { value: "7" }, "July"),
            m("option", { value: "8" }, "August"),
            m("option", { value: "9" }, "September"),
            m("option", { value: "10" }, "October"),
            m("option", { value: "11" }, "November"),
            m("option", { value: "12" }, "December"),
          ]),
        ]),
        m(
          "div",
          { class: "form-group col-md-3 d-flex align-items-end" },
          m("select", { class: "custom-select" }, " ... ")
        ),
        m(
          "div",
          { class: "form-group col-md-4 d-flex align-items-end" },
          m("select", { class: "custom-select" }, " ... ")
        ),
      ]),
      m(
        "div",
        { class: "form-group" },
        m("div", { class: "custom-control custom-checkbox" }, [
          m("input", {
            class: "custom-control-input",
            type: "checkbox",
            id: "customCheck1",
          }),
          m(
            "label",
            { class: "custom-control-label", for: "customCheck1" },
            "Agree with Terms of Use and Privacy Policy"
          ),
        ])
      ),
      m("button", { class: "btn btn-primary", type: "submit" }, "Guardar"),
      m("button", { class: "btn btn-primary", type: "submit" }, "Eliminar"),
    ]);
  },
};

export default FormularioDeRegistro;
