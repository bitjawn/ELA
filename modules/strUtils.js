module.exports = {
    'contains':(function(){
        return function(p,w) {
            const pattern = new RegExp(p);
            return pattern.test(w);
        }
    })(),
    'icontains':(function(){
        return function(p,w) {
            const pattern = new RegExp(p, 'i');
            return pattern.test(w);
        }
    })(),
    'return':(function(){
        return function(p,w) {
            const pattern = new RegExp(p);
            return pattern.exec(w);
        }
    })(),
    'ireturn':(function(){
        return function(p,w) {
            const pattern = new RegExp(p,'i');
            return pattern.toString();
        }
    })(),
    'hasHTTP':(function(){
        return function(w) {
            const pattern = /^(https?:\/\/).*?/;
            return pattern.test(w);
        }
    })()
}
