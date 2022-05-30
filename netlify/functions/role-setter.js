exports.handler = function(event, context, callback) {
    const data = JSON.parse(event.body);
    const uuid = Math.floor(Math.random() * 9999999)

    const { user } = data;
        
    const responseBody = {
        app_metadata: {
        roles: ["registered"],
        },
        user_metadata: {
            ...user.user_metadata,
            uuid
        }
    };
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    });
};
