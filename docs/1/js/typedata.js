class TypeData {
    constructor(...args) { // typeName,
        if (0===args.length) {
            this._name = 'any'
            this._nullable = false
            this._mutable = true
            this._generics = null
            this._get = (v,k,t)=>v
            this._set = (v,k,t)=>t[k]=v
        }
        else if (1===args.length && Type.isStr(args[0])) { this.#name = args[0] }
        else if (1===args.length && Type.isObj(args[0])) {
            'name,nullable,mutable,get,set'.split(',').map(k=>this[k] = args[0][k])
        }
        else {
            const keys = 'name,nullable,mutable,get,set'.split(',');
            [...args].map((a,i)=>this[keys[i]]=a);
        }
    }
    get name() { return this._name }
    set #name(v) {
//        if (this.isNullable)
        //this._name = this.#getName(v)
        this._name = this.#getName(v.slice(0, Math.min(v.indexOf('<'), v.indexOf('?'), v.length)-1))
        console.log(this._name)
        const base = this.#baseName(v)
        'name,nullable,mutable'.split(',').map(k=>this[`_${k}`]=base[k])
        if (base.generics) { this._generics = this.#getGenerics(base).generics;  }
        console.log(base)
    }
    get nullable() {return this._name.includes('?')}
    get mutable() {return this._name.includes('=')}
    get genericable() {return this._name.includes('<') && this._name.includes('>')}
    #isNullable(n) {return n.endsWith('?') || n.endsWith('?=')}
    #isMutable(n) {return n.endsWith('=') || n.endsWith('?=')}
    #isGenericable(n) {return n.includes('<') && n.includes('>')}
    #baseName(name) {
        let n = name
        const nullable = this.#isNullable(n)
        const mutable = this.#isMutable(n)
        const g = this.#isGenericable(n) ? n.splice(n.indexOf('<'), n.lastIndexOf('>')) : ''
        console.log(`g:${g}`)
        //n = this.#isGenericable(n) ? n.splice(0, n.indexOf('<')) : n
        n = g ? n.splice(0, n.indexOf('<')) : n
        n = nullable ? n.replace(/\?/g,'') : n
        n = mutable ? n.replace(/=/g,'') : n
        return {name:n, nullable:nullable, mutable:mutable, generics:this.baseName(g)} 
            //generics:this.#isGenericable(name) ? name.splice(name.findIndex('<')) : ''} 
    }
    // generics:
    //   null
    //   ['String','Integer']
    //   [{name:'String', generics:{}/[]/null},'Integer']
    //   {name:'String', generics:{}/[]/null}
    #getGenerics(base) { // <...>  <Int>  <Int,Str>  <Ary<Int>>  <Ary<Ary<Str>>>  <Ary<Ary<Int,Str>>>  <Map<Str,Cls<MyCls>>>
        const n = base.name.splice(base.name.indexOf('<'), base.name.lastIndexOf('>'))
        if (this.#isGenericable(n)) {return {...base, generics:this.#getGenerics(this.baseName(n))} }
        //else { return n.split(',') }
        else { return {...base, generics:n.split(',')} }
    }
    /*
    #baseName(name) {
        let [n,g] = [name,'']
        [n,g] = this.#isGenericable(n) ? [n.splice(0, n.findIndex('<')), n.splice(n.findIndex('<')+1)] : [n,'']
        n = this.#isNullable(n) ? n.replace(/\?/g,'') : n
        n = this.#isMutable(n) ? n.replace(/=/g,'') : n
        return [n,g]
    }
    */
    #names(...args) {
        if (0===args.length){return ''}
        if (Type.isStr(args[0])) {
            
        }
    }
    #getName(name) { // 大文字小文字を無視して存在確認する
        const N = name.toLowerCase()
        for (let [k,v] of Type._names.entries()) {
            if (k.toLowerCase()===N) {return k}
            const [abbrs,fn] = v
            if (abbrs.some(a=>a.toLowerCase()===N)) {return k}
        }
        if (name in window) { // 定義済みClassの中から探す
            if (Type.isCls(window[name])) {return window[name].constructor.name}
        }
        throw new TypeError(`'${name}' is a type name that does not exist.`)
    }
    /*
    hasName(name) {
        if ([...this._names.keys()].some(n=>n===name)) {return true}

        const fulls = this._names.keys()
        const abbrs = [...this._names.values()].map(v=>v[0])
        fulls.some(n=>)
        
    }
    getNames() {
        if ([...this._names.keys()].some(n=>n===name)) {return true}
        if ([...this._names.keys()].some(n=>n.toLowerCase()===N)) {return true}
        if ([...this._names.values()].map(v=>v[0].toLowerCase()===N) {return true}

    }
    */


}
