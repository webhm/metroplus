const HeadPublic = {
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m("a.df-logo", { href: "/" }, [
                        "Metro",
                        m("span",
                            "Virtual"
                        )
                    ])
                ),
                m("div.navbar-right", [
                    m("a.btn.btn-buy[href='https://www.hospitalmetropolitano.org']", [
                        m("span",
                            "Hospital Metropolitano"
                        )
                    ])
                ])
            ])
        ];
    },

};

export default HeadPublic;