const storage = require('node-sessionstorage');
module.exports = {
    fetchData: () => {
        return storage.getItem('db') || [];
    },
    pushData: (data) => {
        storage.setItem('db',data);
    }
}