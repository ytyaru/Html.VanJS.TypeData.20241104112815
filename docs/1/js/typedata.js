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
        else {throw new TypeError(`引数は型を表す文字列であるべきです。`)}
        /*
        else if (1===args.length && Type.isObj(args[0])) {
            'name,nullable,mutable,get,set'.split(',').map(k=>this[k] = args[0][k])
        }
        else {
            const keys = 'name,nullable,mutable,get,set'.split(',');
            [...args].map((a,i)=>this[keys[i]]=a);
        }
        */
    }
    get name() { return this._name }
    set #name(v) {
        /*
//        if (this.isNullable)
        //this._name = this.#getName(v)
        this._name = this.#getName(v.slice(0, Math.min(v.indexOf('<'), v.indexOf('?'), v.length)-1))
        console.log(this._name)
        const base = this.#baseName(v)
        'name,nullable,mutable'.split(',').map(k=>this[`_${k}`]=base[k])
        if (base.generics) { this._generics = this.#getGenerics(base).generics;  }
        console.log(base)
        */
        const o = this.#read(v)
        console.log(o)
        this._name = o.name
        this._nullable = o.nullable
        this._mutable = o.mutable
        this._generics = o.generics
    }
    get nullable() {return this._nullable}
    get mutable() {return this._mutable}
//    get nullable() {return this._name.includes('?')}
//    get mutable() {return this._name.includes('=')}
//    get genericable() {return this._name.includes('<') && this._name.includes('>')}
    #isNullable(n) {return n.endsWith('?') || n.endsWith('?=')}
    #isMutable(n) {return n.endsWith('=') || n.endsWith('?=')}
    #isGenericable(n) {return n.includes('<') && n.includes('>')}
    #read(s,l) { // 文字列sを解析してTypeDataを生成する。配列lがあればその末尾に加える
        s = s.replace(/ /g,'') // 半角スペースを全削除する
        const idx = {
            comma: s.indexOf(','),
            less: s.indexOf('<'),
            greatF: s.indexOf('>'),
            greatL: s.lastIndexOf('>'),
        }
        const num = {
            less: (s.match(/</g) || []).length,
            great: (s.match(/>/g) || []).length,
        }
        if (0<=idx.less && 0<=idx.great && idx.greatL < idx.less) {throw new TypeError(`ジェネリクスの記号順が不正です。'<>'であるべき所が'><'になっています。`)}
//        if ((0<=idx.less && -1===idx.great) || (-1===idx.less && 0<=idx.great)) {throw new TypeError(`ジェネリクスの記号が不足しています。'<>'であるべき所が'<'か'>'の片方しかありません。`)}
        if (num.less !== num.great){throw new TypeError(`ジェネリクスの記号数が不正です。'<'と'>'は同数であるべきです。'<':${num.less} '>':${num.great}`)}

        if (-1===idx.comma && -1===idx.less && -1===idx.greatL) { // int?=
            //return {name:s, nullable:this.#isNullable(s), mutable:this.#isMutable(s), generics:null} 
            //const o = {name:s, nullable:this.#isNullable(s), mutable:this.#isMutable(s), generics:null} 
            const o = this.#makeTypeObj(s, null)
            if (Type.isAry(l)) {l.push(o)}
            return l ? l : o
        }
        else if (-1===idx.comma && 0<=idx.less && 0<=idx.greatL) { // ary?=<int?=>   ary?=<ary?=<int?=>>
            const base = s.slice(0, s.indexOf(idx.less))
            const gen = s.slice(idx.less, idx.greatL)
//            return {name:base, nullable:this.#isNullable(base), mutable:this.#isMutable(base), generics:this.#read(gen)} 
            //const o = {name:base, nullable:this.#isNullable(base), mutable:this.#isMutable(base), generics:this.#read(gen)} 
            const o = this.#makeTypeObj(base, this.#read(gen))
            if (Type.isAry(l)) {l.push(o)}
            return l ? l : o
        }
        else if (0<=idx.comma && -1===idx.less && -1===idx.greatL) { // int?=,str?=
            //return s.split(',').map(t=>this.#read(t.trim()))
            const a = s.split(',').map(t=>this.#read(t.trim()))
            return Type.isAry(l) ? l.concat(a) : a
        }
        else if (0<=idx.comma && 0<=idx.less && 0<=idx.greatL) {//kvs?=<int?=,str?=>  kvs?=<int?=,ary?=<str?=>>  ary?=<str?=>,int?=
            if (idx.comma < idx.less) { // int?=,kvs<str?=,int?=>
                const datas = []
                const name = s.slice(0,idx.comma)
//                datas.push({name:name, nullable:this.#isNullable(name), mutable:this.#isMutable(name), generics:null})
                datas.push(this.#makeTypeObj(name, null))
                return this.#read(s.slice(idx.comma), datas)
            } else if (idx.less < idx.comma) { // kvs<str?=,int?=>  ary<int>,str  kvs<str?=,int?=>,str?=
                const base = s.slice(0, idx.less)
                const t = s.slice(idx.less)
                const great = s.indexOf('>')
                //if (','===s.slice(idx.great, idx.great + 1) { // 同位配列  ary<int>,str
                if (','===s.slice(idx.greatF, idx.greatF + 1)) { // 同位配列  ary<int>,str
                    const datas = []
                    const name = s.slice(0,idx.comma)
//                    datas.push({name:base, nullable:this.#isNullable(base), mutable:this.#isMutable(base), generics:t.slice(0,idx.greatF)})
                    datas.push(this.#makeTypeObj(base, t.slice(0,idx.greatF)))
                    return this.#read(t.slice(idx.greatF+1), datas)
                } else { // 下位配列 kvs<str?=,int?=>
                    //const o = {name:base, nullable:this.#isNullable(base), mutable:this.#isMutable(base), generics:this.#read(t.slice(0,idx.greatF))} 
                    const o = this.#makeTypeObj(base, this.#read(t.slice(0,idx.greatF)))
                    if (Type.isAry(l)) {l.push(o)}
                    return l ? l : o
                }
            }
        }
    }
    #makeTypeObj(name, gen) { return {
        name:name.replace('?','').replace('=',''), 
        nullable:this.#isNullable(name), 
        mutable:this.#isMutable(name), 
        generics:gen} }

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
