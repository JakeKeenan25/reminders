function* infinite() {
    let id = 0;
    while(true){
        yield id++;
    }
}
const generator = infinite();
module.exports = generator;