const setApp = require('./src');

setApp
    .then((app) => {
        app.listen(5000, () => {
            console.info('Api rodando na porta 5000');
        })
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });