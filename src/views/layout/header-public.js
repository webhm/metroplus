const HeadPublic = {
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m("a.df-logo", { href: "#!/" }, [
                        "Metro",
                        m("span",
                            "Virtual"
                        ), [
                            m("span", {
                                "style": { "font-size": "0.9rem ", "margin-top": "0.4rem", "padding-left": "0.2rem" }
                            },
                                "Admin"
                            )
                        ]
                    ])
                ),

            ])
        ];
    },

};

export default HeadPublic;