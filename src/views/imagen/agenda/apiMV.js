const apiMV = {
    key: "swagger",
    secret: "swagger",
    loginOauth: () => {

        m.request({
                method: "POST",
                url: "http://172.16.253.63:9090/auth/realms/mvapi/protocol/openid-connect/token",
                body: 'grant_type=password&username=swagger&password=swagger',
                headers: {
                    'Access-Control-Allow-Origin': 'http://172.16.253.63:8085',
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then(function(response) {
                console.log('e', response);
            })
            .catch(function(e) {
                console.log('e', e);
            });


    },
    view: () => {
        return apiMV.loginOauth();
    },
};

export default apiMV;