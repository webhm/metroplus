import Auth from '../../models/auth';
import App from '../app';

const FormLogin = {

    view: () => {

        return [

            m("div.content.content-fixed.content-auth",
                m("div.container",
                    m("div.media.align-items-stretch.justify-content-center.ht-100p.pos-relative",
                        [
                            m("div.media-body.align-items-center.d-none.d-lg-flex",
                                [
                                    m("div.footer-widget", [
                                        m("div.logo",
                                            m("a.d-inline-block.mb-5[href='/']",
                                                m("img[alt='HM'][src='assets/images/logo-hm.svg']")
                                            )
                                        ),
                                        m("p",
                                            App.title + " aplicación web para la administración de servicios digitales."
                                        ),

                                    ])
                                ]
                            ),
                            m("div.sign-wrapper.mg-lg-l-50.mg-xl-l-60",
                                m("div.wd-100p",
                                    [
                                        m("h3.tx-color-01.mg-b-5",
                                            "Entrar"
                                        ),
                                        m("p.tx-color-03.tx-16.mg-b-40",
                                            "¡Bienvenido! Por favor, inicie sesión para continuar."
                                        ),
                                        m(".alert.alert-" + Auth.statusError + "." + Auth.statusHide + "[role='alert']",
                                            Auth.messageError
                                        ),
                                        m("div.form-group",
                                            [
                                                m("label",
                                                    "Usuario:"
                                                ),
                                                m("input.form-control[type='text'][placeholder='mpaez']", {
                                                    oninput: function (e) { Auth.setUsername(e.target.value) },
                                                    value: Auth.username,
                                                })
                                            ]
                                        ),
                                        m("div.form-group",
                                            [
                                                m("div.d-flex.justify-content-between.mg-b-5",
                                                    [
                                                        m("label.mg-b-0-f",
                                                            "Contraseña:"
                                                        ),

                                                    ]
                                                ),
                                                m("input.form-control[type='password'][placeholder='Contraseña']", {
                                                    oninput: function (e) { Auth.setPassword(e.target.value) },
                                                    value: Auth.password,
                                                })
                                            ]
                                        ),
                                        m("button.btn.btn-brand-02.btn-block " + Auth.buttonDisabled, {
                                            disabled: !Auth.canSubmit(),
                                            onclick: Auth.login
                                        },
                                            "Entrar"
                                        ),
                                        m("div.divider-text",
                                            "Hospital Metropolitano"
                                        ),
                                        m("div.ht-80",
                                        ),


                                    ]
                                )
                            )
                        ]
                    )
                )
            ),

        ];
    },

};



export default FormLogin;