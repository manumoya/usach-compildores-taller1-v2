/*  objeto cola para manejar el proceso de equivalencias */
var Queue = function() {
    var elements = [];
 
    this.add = add;
    this.remove = remove;
    this.getFrontElement = getFrontElement;
    this.hasElements = hasElements;
    this.removeAll = removeAll;
    this.size = size;
    this.toString = toString;
 
    function add(element) {
        elements.push(element);
    }
 
    function remove() {
        return elements.shift();
    }
 
    function getFrontElement() {
        return elements[0];
    }
 
    function hasElements() {
        return elements.length > 0;
    }
 
    function removeAll() {
        elements = [];
    }
 
    function size() {
        return elements.length;
    }
 
    function toString() {
        console.log(elements.toString());
    }
}

module.exports = Queue;