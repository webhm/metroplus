import HeaderPrivate from '../layout/header-private';
import SidebarFarma from './sidebarFarma';
import App from '../app';

const MenuFarmacia = {
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
                            "Farmacia"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Farmacia:"
                    ),

                    m("div.row.tx-14", [



                        m("div.col-sm-6",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='file-text']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Recetas de Alta"
                                ),


                                m(m.route.Link, { href: "/farmacia/recetas", class: "tx-medium" }, [
                                    "Ir a Recetas de Alta",
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

const Farmacia = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarFarma.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Farmacia | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("farmacia") }),
            m(SidebarFarma),
            m(MenuFarmacia)
        ];
    },

};





export default Farmacia;