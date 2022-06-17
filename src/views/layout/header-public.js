const HeadPublic = {
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m(m.route.Link, { href: "/", class: "df-logo" }, [
                        "Metro",
                        m("span",
                            "Virtual"
                        ),
                        "+"
                    ]),
                ),

            ])
        ];
    },

};

export default HeadPublic;