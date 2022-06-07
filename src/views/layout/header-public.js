const HeadPublic = {
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m("a.df-logo", { href: "#!/" }, [
                        "Metro",
                        m("span",
                            "Virtual"
                        ),
                        "+"
                    ])
                ),

            ])
        ];
    },

};

export default HeadPublic;