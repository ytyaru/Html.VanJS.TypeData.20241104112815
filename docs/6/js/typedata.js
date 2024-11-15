class TypeData {
    static valid(typeData, ...values) {
        const td = Type.isStr(typeData) ? this.read(typeData) : (Type.isObj(typeData) || Type.isObjs(typeData) ? typeData : ({throw new TypeError(`引数typeDataは型を表す文字列かTypeDataオブジェクトかその配列であるべきです。`)})())
        if (Type.isAry(td)) {
            if (!td.every(d=>Type.isObj(d))) {return false}
            if (td.length!==values.length) {return false}
            for (let i=0; i<td.length; i++){
                if (!Type.name.valid(td[i].name, values[i])) {return false}
                if (null!==td[i].generics){
                    //const g = this.valid(td[i].generics, Type.isAry(values[i]) ? ...values[i] : values[i])
                    if (Type.isAry(values[i]) && !Type.isAry(td[i].generics) ||
                       !Type.isAry(values[i]) &&  Type.isAry(td[i].generics)){return false}
                    const g = Type.isAry(values[i])
                            ? this.valid(td[i].generics, ...values[i])
                            : this.valid(td[i].generics, values[i])
                    if (!g){return false}
                }
            }
        } else if (Type.isObj(td)) {
            if (1 !==values.length){return false}
            if (!Type.name.valid(td.name, values[0])) {return false}
            // generics
            if (Type.isAry(td.generics)) {
//                if (!Type.isAry(values[0])){return false}
//                if (td.generics.length!==values[0].length){return false}
                for (let i=0; i<td.generics.length; i++){
                    this.valid(td.generics[i], values[i])
                    if (Type.isAry(values[i]) && !Type.isAry(td[i].generics) ||
                       !Type.isAry(values[i]) &&  Type.isAry(td[i].generics)){return false}
                    const g = Type.isAry(values[i])
                            ? this.valid(td[i].generics, ...values[i])
                            : this.valid(td[i].generics, values[i])
                    if (!g){return false}

                    if (!Type.name.valid(td[i].name, values[i])) {return false}
                    if (null!==td[i].generics){
                        //const g = this.valid(td[i].generics, Type.isAry(values[i]) ? ...values[i] : values[i])
                        if (Type.isAry(values[i]) && !Type.isAry(td[i].generics) ||
                           !Type.isAry(values[i]) &&  Type.isAry(td[i].generics)){return false}
                        const g = Type.isAry(values[i])
                                ? this.valid(td[i].generics, ...values[i])
                                : this.valid(td[i].generics, values[i])
                        if (!g){return false}
                    }
                }
                    
            } else if (Type.isObj(td.generics)) {
            } else if (null===td.generics) {return true}
        } else if (null===td) { return 0===values.length }
        else {throw new TypeError(`tdはary/obj/nullのいずれかであるべきです。`)}
    }
    static read(s,l) { // 文字列sを解析してTypeDataを生成する。配列lがあればその末尾に加える
        s = s.replace(/\s/g,'') // 空白文字（半角スペース、改行、タブ）を全削除する
        const idx = {
            comma: s.indexOf(','),
            commaE: this.#sameLevelCommaIndex(s),
            less: s.indexOf('<'),
            greatF: s.indexOf('>'),
            greatL: s.lastIndexOf('>'),
        }
        const num = {
            less: (s.match(/</g) || []).length,
            great: (s.match(/>/g) || []).length,
        }
        console.log(s, idx, num)
        if (0<=idx.less && 0<=idx.greatF && idx.greatF < idx.less) {throw new TypeError(`ジェネリクスの記号順が不正です。'<>'であるべき所が'><'になっています。`)}
        if (num.less !== num.great){throw new TypeError(`ジェネリクスの記号数が不正です。'<'と'>'は同数であるべきです。'<':${num.less} '>':${num.great}`)}
        if (s.startsWith(',') || s.endsWith(',')){throw new TypeError(`不正な文字列です。,が先頭・末尾に来ることはありません。`)}
        if (s.startsWith('<') || s.endsWith('<')){throw new TypeError(`不正な文字列です。<が先頭・末尾に来ることはありません。`)}
        if (s.startsWith('>')){throw new TypeError(`不正な文字列です。>が先頭に来ることはありません。`)}
        idx.greatE = 0===num.less ? -1 : this.#genericsEndIndex(s)

        if (-1===idx.comma && -1===idx.less && -1===idx.greatE) { // int?=
            const o = this.#makeTypeObj(s, null)
            if (Type.isAry(l)) {l.push(o)}
            return l ? l : o
        }
        else if (-1===idx.comma && 0<=idx.less && 0<=idx.greatE) { // ary?=<int?=>   ary?=<ary?=<int?=>>
            const base = s.slice(0, idx.less)
            const gen = s.slice(idx.less+1, idx.greatE)
            console.log(base)
            console.log(gen)
            const o = this.#makeTypeObj(base, this.read(gen))
            if (Type.isAry(l)) {l.push(o)}
            return l ? l : o
        }
        else if (0<=idx.comma && -1===idx.less && -1===idx.greatE) { // int?=,str?=
            const a = s.split(',').map(t=>this.read(t.trim()))
            return Type.isAry(l) ? l.concat(a) : a
        }
        else if (0<=idx.comma && 0<=idx.less && 0<=idx.greatE) {//kvs?=<int?=,str?=>  kvs?=<int?=,ary?=<str?=>>  ary?=<str?=>,int?=
            const end = idx.comma < idx.less ? idx.comma : idx.less
            const name = s.slice(0, end)
            if (idx.comma < idx.less) {// ,が<より先（先頭項目は配列要素）
                const o = this.#makeTypeObj(name, null)
                if (Type.isAry(l)) {l.push(o)}
                return this.read(s.slice(end+1), Type.isAry(l) ? l : [o])
            } else { // idx.less < idx.comma // <が,より先（先頭項目はジェネリクスの親）
                console.log(s.slice(idx.less+1, idx.greatE))
                const o = this.#makeTypeObj(name, this.read(s.slice(idx.less+1, idx.greatE)))
                if (Type.isAry(l)) {l.push(o)}
                if (idx.greatE!==s.length-1){
                    if (','===s.slice(idx.greatE+1,idx.greatE+2)) {return this.read(s.slice(idx.greatE+2),Type.isAry(l) ? l : [o])}
                    else {throw new TypeError(`>の直後は,のみ有効です。>もありえますが再帰処理されるはずです。`)}
                } else {return Type.isAry(l) ? l : o}
            }
        }
    }
    /*
    static #valid(name) { // 単一
        const N = name.toLowerCase()
        for (let [k,v] of Type._names) {
            const [abbr, fn] = v
            if (N===k.toLowerCase()) {return true}
            if (abbr.some(a=>a.toLowerCase()===N)) {return true}
        }
        return false
    }
    static #makeTypeObj(name, gen) { return {
        name:name.replace('?','').replace('=',''), 
        nullable:this.#isNullable(name), 
        mutable:this.#isMutable(name), 
        generics:gen} }
        */
    static #makeTypeObj(name, gen) {
        const N = name.replace('?','').replace('=','')
        if (!Type.name.valid(N)){throw new TypeError(`'${N}'は不正な型名です。`)}
        return {
            name:N, 
            nullable:this.#isNullable(name), 
            mutable:this.#isMutable(name), 
            generics:gen}
    }
    static #isNullable(n) {return n.endsWith('?') || n.endsWith('?=')}
    static #isMutable(n) {return n.endsWith('=') || n.endsWith('?=')}
    static #isGenericable(n) {return n.includes('<') && n.includes('>')}
    static #genericsEndIndex(s) { // 最初の<に対応する>の位置
        const num = {less:0, great:0}
        for (let i=0; i<s.length; i++) {
            if ('<'===s.charAt(i)) {num.less++}
            else if ('>'===s.charAt(i)) {num.great++}
            else {}
            if (0<num.less && 0<num.great && num.less===num.great) {return i}
        }
        return -1
    }
    static #sameLevelCommaIndex(s) { // 同位カンマの最初の位置（<>外に存在する最初のカンマ位置）
        if (-1===s.indexOf(',')){return -1}
        const greatE = this.#genericsEndIndex(s)
        if (-1===greatE) { return s.indexOf(',') }
        else {
            if (greatE===s.length-1){return -1}
            if (','===s.slice(greatE+1, greatE+2)) {return greatE+1}
        }
    }
}
