let storage = {
    data: {},
    get (key) {
        return this.data[key]
    },
    set (key, data) {
        delete this.data[key];
        this.data[key] = data;
    },
    remove (key) {
        delete this.data[key]
    },
    clear () {
        for(let key in this.data) delete this.data[key]
    }
}
