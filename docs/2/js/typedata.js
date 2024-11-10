class TypeData {
    static read(s,l) { // 文字列sを解析してTypeDataを生成する。配列lがあればその末尾に加える
        //s = s.replace(/ /g,'') // 半角スペースを全削除する
        s = s.replace(/\s/g,'') // 空白文字（半角スペース、改行、タブ）を全削除する
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
        console.log(s, idx, num)
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
            const base = s.slice(0, idx.less)
            const gen = s.slice(idx.less+1, idx.greatL)
            console.log(base)
            console.log(gen)
//            return {name:base, nullable:this.#isNullable(base), mutable:this.#isMutable(base), generics:this.read(gen)} 
            //const o = {name:base, nullable:this.#isNullable(base), mutable:this.#isMutable(base), generics:this.read(gen)} 
            const o = this.#makeTypeObj(base, this.read(gen))
            if (Type.isAry(l)) {l.push(o)}
            return l ? l : o
        }
        else if (0<=idx.comma && -1===idx.less && -1===idx.greatL) { // int?=,str?=
            //return s.split(',').map(t=>this.read(t.trim()))
            const a = s.split(',').map(t=>this.read(t.trim()))
            return Type.isAry(l) ? l.concat(a) : a
        }
        else if (0<=idx.comma && 0<=idx.less && 0<=idx.greatL) {//kvs?=<int?=,str?=>  kvs?=<int?=,ary?=<str?=>>  ary?=<str?=>,int?=
            if (idx.comma < idx.less) { // int?=,kvs<str?=,int?=>
                const datas = []
                const name = s.slice(0,idx.comma)
                console.log(name)
                console.log(s.slice(idx.comma+1))
//                datas.push({name:name, nullable:this.#isNullable(name), mutable:this.#isMutable(name), generics:null})
                datas.push(this.#makeTypeObj(name, null))
                //return this.read(s.slice(idx.comma), datas)
                return this.read(s.slice(idx.comma+1), datas)
            //} else if (idx.less < idx.comma) { // kvs<str?=,int?=>  ary<int>,str  kvs<str?=,int?=>,str?=
            } else { // kvs<str?=,int?=>  ary<int>,str  kvs<str?=,int?=>,str?=
                const base = s.slice(0, idx.less)
                const t = s.slice(idx.less+1, idx.greatL)
                console.log(s)
                console.log(base)
                console.log(t)
                console.log(s.slice(idx.greatF+1, idx.greatF+2))
                console.log(t.slice(0,idx.greatF))
                console.log(s.slice(idx.greatF+2))
                console.log(s.slice(idx.greatL+2))
//                const great = s.indexOf('>')
                //if (','===s.slice(idx.great, idx.great + 1) { // 同位配列  ary<int>,str
                //if (','===s.slice(idx.greatF+1, idx.greatF+2)) { // 同位配列  >,   ary<int>,str  x kvs<ary<int>,str>
                if (','===s.slice(idx.greatL+1, idx.greatL+2)) { // 同位配列  >,   ary<int>,str  x kvs<ary<int>,str>
                    const datas = []
                    const name = s.slice(0,idx.comma)
                    console.log(name)
                    console.log(t)
                    console.log(t.slice(0,idx.greatF))
//                    datas.push({name:base, nullable:this.#isNullable(base), mutable:this.#isMutable(base), generics:t.slice(0,idx.greatF)})
                    //datas.push(this.#makeTypeObj(base, t.slice(0,idx.greatF)))
                    //datas.push(this.#makeTypeObj(base, this.read(t.slice(0,idx.greatF))))
                    datas.push(this.#makeTypeObj(base, this.read(t)))
                    //return this.read(t.slice(idx.greatF+2), datas)
                    //return this.read(s.slice(idx.greatF+2), datas)
                    return this.read(s.slice(idx.greatL+2), datas)
                } else { // 下位配列 kvs<str?=,int?=>
                    //const o = {name:base, nullable:this.#isNullable(base), mutable:this.#isMutable(base), generics:this.read(t.slice(0,idx.greatF))} 
                    //const o = this.#makeTypeObj(base, this.read(t.slice(0,idx.greatF)))
                    console.log(base)
                    console.log(t.slice(0,idx.greatL))
                    const o = this.#makeTypeObj(base, this.read(t.slice(0,idx.greatL)))
                    if (Type.isAry(l)) {l.push(o)}
                    return l ? l : o
                }
            }
        }
    }
    static #makeTypeObj(name, gen) { return {
        name:name.replace('?','').replace('=',''), 
        nullable:this.#isNullable(name), 
        mutable:this.#isMutable(name), 
        generics:gen} }
    static #isNullable(n) {return n.endsWith('?') || n.endsWith('?=')}
    static #isMutable(n) {return n.endsWith('=') || n.endsWith('?=')}
    static #isGenericable(n) {return n.includes('<') && n.includes('>')}
}
