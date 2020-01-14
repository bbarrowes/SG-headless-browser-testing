let O = {
    get value(){
        return this._value;
    },
    set value(x){
        this._value = x + 1;
    }
}

O.value = 1;
console.log( O.value );
