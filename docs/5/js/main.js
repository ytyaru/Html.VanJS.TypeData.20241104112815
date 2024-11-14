window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
//    const {h1, p, a} = van.tags
    const author = 'ytyaru'
    van.add(document.querySelector('main'), 
        van.tags.h1(van.tags.a({href:`https://github.com/${author}/Html.VanJS.TypeData.20241104112815/`}, 'TypeData')),
        van.tags.p('型データを作成する'),
//        van.tags.p('Create type data'),
    )
    van.add(document.querySelector('footer'),  new Footer('ytyaru', '../').make())

    const a = new Assertion();
    const bb = new BlackBox(a);
    a.t(!!TypeData)
    console.log(TypeData.read('String?='))
    // 1
    ;(function(){
        const td = TypeData.read('String?=')
        a.t(Type.isObj(td))
        a.t('String'===td.name)
        a.t(true===td.nullable)
        a.t(true===td.mutable)
        a.t(null===td.generics)
    })();
    ;(function(){
        const td = TypeData.read('String?')
        a.t(Type.isObj(td))
        a.t('String'===td.name)
        a.t(true===td.nullable)
        a.t(false===td.mutable)
        a.t(null===td.generics)
    })();
    ;(function(){
        const td = TypeData.read('String=')
        a.t(Type.isObj(td))
        a.t('String'===td.name)
        a.t(false===td.nullable)
        a.t(true===td.mutable)
        a.t(null===td.generics)
    })();
    ;(function(){
        const td = TypeData.read('Array<String>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Array'===td.name)
        a.t(false===td.nullable)
        a.t(false===td.mutable)
        a.t(Type.isObj(td.generics))
        a.t('String'===td.generics.name)
        a.t(false===td.generics.nullable)
        a.t(false===td.generics.mutable)
    })();
    ;(function(){
        const td = TypeData.read('Array?=<String?=>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Array'===td.name)
        a.t(true===td.nullable)
        a.t(true===td.mutable)
        a.t(Type.isObj(td.generics))
        a.t('String'===td.generics.name)
        a.t(true===td.generics.nullable)
        a.t(true===td.generics.mutable)
    })();
    ;(function(){
        const td = TypeData.read('Obj<String,Integer>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Obj'===td.name)
        a.t(false===td.nullable)
        a.t(false===td.mutable)
        a.t(Type.isAry(td.generics))
        a.t(2===td.generics.length)
        a.t('String'===td.generics[0].name)
        a.t(false===td.generics[0].nullable)
        a.t(false===td.generics[0].mutable)
        a.t(null===td.generics[0].generics)
        a.t('Integer'===td.generics[1].name)
        a.t(false===td.generics[1].nullable)
        a.t(false===td.generics[1].mutable)
        a.t(null===td.generics[1].generics)
    })();
    ;(function(){
        const td = TypeData.read('Obj?=<String?=,Integer?=>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Obj'===td.name)
        a.t(true===td.nullable)
        a.t(true===td.mutable)
        a.t(Type.isAry(td.generics))
        a.t(2===td.generics.length)
        a.t('String'===td.generics[0].name)
        a.t(true===td.generics[0].nullable)
        a.t(true===td.generics[0].mutable)
        a.t(null===td.generics[0].generics)
        a.t('Integer'===td.generics[1].name)
        a.t(true===td.generics[1].nullable)
        a.t(true===td.generics[1].mutable)
        a.t(null===td.generics[1].generics)
    })();
    ;(function(){ // Generics後方ネスト
        const td = TypeData.read('Obj?=<String?=,Array?=<Integer?=>>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Obj'===td.name)
        a.t(true===td.nullable)
        a.t(true===td.mutable)
        a.t(Type.isAry(td.generics))
        a.t(2===td.generics.length)
        a.t('String'===td.generics[0].name)
        a.t(true===td.generics[0].nullable)
        a.t(true===td.generics[0].mutable)
        a.t(null===td.generics[0].generics)
        a.t('Array'===td.generics[1].name)
        a.t(true===td.generics[1].nullable)
        a.t(true===td.generics[1].mutable)
        a.t(Type.isObj(td.generics[1].generics))
        a.t('Integer'===td.generics[1].generics.name)
        a.t(true===td.generics[1].generics.nullable)
        a.t(true===td.generics[1].generics.mutable)
        a.t(null===td.generics[1].generics.generics)
    })();
    ;(function(){ // Generics前方ネスト
        const td = TypeData.read('Obj?=<Array?=<Integer?=>,String?=>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Obj'===td.name)
        a.t(true===td.nullable)
        a.t(true===td.mutable)
        a.t(Type.isAry(td.generics))
        a.t(2===td.generics.length)

        a.t('String'===td.generics[1].name)
        a.t(true===td.generics[1].nullable)
        a.t(true===td.generics[1].mutable)
        a.t(null===td.generics[1].generics)

        a.t('Array'===td.generics[0].name)
        a.t(true===td.generics[0].nullable)
        a.t(true===td.generics[0].mutable)
        a.t(Type.isObj(td.generics[0].generics))
        a.t('Integer'===td.generics[0].generics.name)
        a.t(true===td.generics[0].generics.nullable)
        a.t(true===td.generics[0].generics.mutable)
        a.t(null===td.generics[0].generics.generics)
    })();
    ;(function(){ // Generics三重後方ネスト
        const td = TypeData.read('Obj?=<String?=,Obj?=<String?=,Array?=<Integer?=>>>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Obj'===td.name)
        a.t(true===td.nullable)
        a.t(true===td.mutable)
        a.t(Type.isAry(td.generics))
        a.t(2===td.generics.length)

        a.t('String'===td.generics[0].name)
        a.t(true===td.generics[0].nullable)
        a.t(true===td.generics[0].mutable)
        a.t(null===td.generics[0].generics)

        a.t('Obj'===td.generics[1].name)
        a.t(true===td.generics[1].nullable)
        a.t(true===td.generics[1].mutable)
        a.t(Type.isAry(td.generics[1].generics))
        a.t(2===td.generics[1].generics.length)

        a.t('String'===td.generics[1].generics[0].name)
        a.t(true===td.generics[1].generics[0].nullable)
        a.t(true===td.generics[1].generics[0].mutable)
        a.t(null===td.generics[1].generics[0].generics)

        a.t('Array'===td.generics[1].generics[1].name)
        a.t(true===td.generics[1].generics[1].nullable)
        a.t(true===td.generics[1].generics[1].mutable)
        a.t(Type.isObj(td.generics[1].generics[1].generics))

        a.t('Integer'===td.generics[1].generics[1].generics.name)
        a.t(true===td.generics[1].generics[1].generics.nullable)
        a.t(true===td.generics[1].generics[1].generics.mutable)
        a.t(null===td.generics[1].generics[1].generics.generics)
    })();
    ;(function(){ // Generics三重前方ネスト
        const td = TypeData.read('Obj?=<Obj?=<Array?=<Integer?=>,String?=>,String?=>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Obj'===td.name)
        a.t(true===td.nullable)
        a.t(true===td.mutable)
        a.t(Type.isAry(td.generics))
        a.t(2===td.generics.length)

        a.t('String'===td.generics[1].name)
        a.t(true===td.generics[1].nullable)
        a.t(true===td.generics[1].mutable)
        a.t(null===td.generics[1].generics)

        a.t('Obj'===td.generics[0].name)
        a.t(true===td.generics[0].nullable)
        a.t(true===td.generics[0].mutable)
        a.t(Type.isAry(td.generics[0].generics))
        a.t(2===td.generics[0].generics.length)

        a.t('String'===td.generics[0].generics[1].name)
        a.t(true===td.generics[0].generics[1].nullable)
        a.t(true===td.generics[0].generics[1].mutable)
        a.t(null===td.generics[0].generics[1].generics)

        a.t('Array'===td.generics[0].generics[0].name)
        a.t(true===td.generics[0].generics[0].nullable)
        a.t(true===td.generics[0].generics[0].mutable)
        a.t(Type.isObj(td.generics[0].generics[0].generics))

        a.t('Integer'===td.generics[0].generics[0].generics.name)
        a.t(true===td.generics[0].generics[0].generics.nullable)
        a.t(true===td.generics[0].generics[0].generics.mutable)
        a.t(null===td.generics[0].generics[0].generics.generics)
    })();
    ;(function(){ // Generics三重中間ネスト
        const td = TypeData.read('Obj?=<Obj?=<String?=,Array?=<Integer?=>>,String?=>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Obj'===td.name)
        a.t(true===td.nullable)
        a.t(true===td.mutable)
        a.t(Type.isAry(td.generics))
        a.t(2===td.generics.length)

        a.t('String'===td.generics[1].name)
        a.t(true===td.generics[1].nullable)
        a.t(true===td.generics[1].mutable)
        a.t(null===td.generics[1].generics)

        a.t('Obj'===td.generics[0].name)
        a.t(true===td.generics[0].nullable)
        a.t(true===td.generics[0].mutable)
        a.t(Type.isAry(td.generics[0].generics))
        a.t(2===td.generics[0].generics.length)

        a.t('String'===td.generics[0].generics[0].name)
        a.t(true===td.generics[0].generics[0].nullable)
        a.t(true===td.generics[0].generics[0].mutable)
        a.t(null===td.generics[0].generics[0].generics)

        a.t('Array'===td.generics[0].generics[1].name)
        a.t(true===td.generics[0].generics[1].nullable)
        a.t(true===td.generics[0].generics[1].mutable)
        a.t(Type.isObj(td.generics[0].generics[1].generics))

        a.t('Integer'===td.generics[0].generics[1].generics.name)
        a.t(true===td.generics[0].generics[1].generics.nullable)
        a.t(true===td.generics[0].generics[1].generics.mutable)
        a.t(null===td.generics[0].generics[1].generics.generics)
    })();
    // 1 短縮
    ;(function(){
        const td = TypeData.read('int')
        a.t(Type.isObj(td))
        a.t('int'===td.name)
        a.t(false===td.nullable)
        a.t(false===td.mutable)
        a.t(null===td.generics)
    })();
    // 1 冗長（スペース）
    ;(function(){
        const td = TypeData.read('  ary  <  int,  str  >  ')
        a.t(Type.isObj(td))
        a.t('ary'===td.name)
        a.t(false===td.nullable)
        a.t(false===td.mutable)
        a.t(Type.isAry(td.generics))
        a.t(2===td.generics.length)
        a.t('int'===td.generics[0].name)
        a.t(false===td.generics[0].nullable)
        a.t(false===td.generics[0].mutable)
        a.t(null===td.generics[0].generics)
        a.t('str'===td.generics[1].name)
        a.t(false===td.generics[1].nullable)
        a.t(false===td.generics[1].mutable)
        a.t(null===td.generics[1].generics)
    })();

    // 2
    ;(function(){
        const td = TypeData.read('Integer,String')
        a.t(Type.isAry(td))
        a.t(2===td.length)
        console.log(td)
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('Integer'===td[0].name)
        a.t(false===td[0].nullable)
        a.t(false===td[0].mutable)
        a.t(null===td[0].generics)
        a.t('String'===td[1].name)
        a.t(false===td[1].nullable)
        a.t(false===td[1].mutable)
        a.t(null===td[1].generics)
    })();
    ;(function(){
        const td = TypeData.read('Integer?=,String?=')
        a.t(Type.isAry(td))
        a.t(2===td.length)
        console.log(td)
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('Integer'===td[0].name)
        a.t(true===td[0].nullable)
        a.t(true===td[0].mutable)
        a.t(null===td[0].generics)
        a.t('String'===td[1].name)
        a.t(true===td[1].nullable)
        a.t(true===td[1].mutable)
        a.t(null===td[1].generics)
    })();
    ;(function(){ // ,のほうが<より先
        const td = TypeData.read('String,Array<Integer>')
        a.t(Type.isAry(td))
        a.t(2===td.length)
        console.log(td)
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('String'===td[0].name)
        a.t(false===td[0].nullable)
        a.t(false===td[0].mutable)
        a.t(null===td[0].generics)
        a.t('Array'===td[1].name)
        a.t(false===td[1].nullable)
        a.t(false===td[1].mutable)
        a.t(Type.isObj(td[1].generics))
        a.t('Integer'===td[1].generics.name)
        a.t(false===td[1].generics.nullable)
        a.t(false===td[1].generics.mutable)
        a.t(null===td[1].generics.generics)
    })();
    ;(function(){ // <のほうが,より先
        const td = TypeData.read('Array<Integer>,String')
        a.t(Type.isAry(td))
        a.t(2===td.length)
        console.log(td)
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('Array'===td[0].name)
        a.t(false===td[0].nullable)
        a.t(false===td[0].mutable)
        a.t(Type.isObj(td[0].generics))
        a.t('Integer'===td[0].generics.name)
        a.t(false===td[0].generics.nullable)
        a.t(false===td[0].generics.mutable)
        a.t(null===td[0].generics.generics)
        a.t('String'===td[1].name)
        a.t(false===td[1].nullable)
        a.t(false===td[1].mutable)
        a.t(null===td[1].generics)
    })();
    ;(function(){ // ,のほうが<より先 後方ネスト
        const td = TypeData.read('String,Obj<String,Array<Integer>>')
        a.t(Type.isAry(td))
        a.t(2===td.length)
        console.log(td)
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('String'===td[0].name)
        a.t(false===td[0].nullable)
        a.t(false===td[0].mutable)
        a.t(null===td[0].generics)
        a.t('Obj'===td[1].name)
        a.t(false===td[1].nullable)
        a.t(false===td[1].mutable)
        a.t(Type.isAry(td[1].generics))
        a.t(2===td[1].generics.length)

        a.t('String'===td[1].generics[0].name)
        a.t(false===td[1].generics[0].nullable)
        a.t(false===td[1].generics[0].mutable)
        a.t(null===td[1].generics[0].generics)

        a.t('Array'===td[1].generics[1].name)
        a.t(false===td[1].generics[1].nullable)
        a.t(false===td[1].generics[1].mutable)
        a.t(Type.isObj(td[1].generics[1].generics))

        a.t('Integer'===td[1].generics[1].generics.name)
        a.t(false===td[1].generics[1].generics.nullable)
        a.t(false===td[1].generics[1].generics.mutable)
        a.t(null===td[1].generics[1].generics.generics)
    })();
    ;(function(){ // ,のほうが<より先 前方ネスト
        const td = TypeData.read('String,Obj<Array<Integer>,String>')
        a.t(Type.isAry(td))
        a.t(2===td.length)
        console.log(td)
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('String'===td[0].name)
        a.t(false===td[0].nullable)
        a.t(false===td[0].mutable)
        a.t(null===td[0].generics)
        a.t('Obj'===td[1].name)
        a.t(false===td[1].nullable)
        a.t(false===td[1].mutable)
        a.t(Type.isAry(td[1].generics))
        a.t(2===td[1].generics.length)

        a.t('String'===td[1].generics[1].name)
        a.t(false===td[1].generics[1].nullable)
        a.t(false===td[1].generics[1].mutable)
        a.t(null===td[1].generics[1].generics)

        a.t('Array'===td[1].generics[0].name)
        a.t(false===td[1].generics[0].nullable)
        a.t(false===td[1].generics[0].mutable)
        a.t(Type.isObj(td[1].generics[0].generics))

        a.t('Integer'===td[1].generics[0].generics.name)
        a.t(false===td[1].generics[0].generics.nullable)
        a.t(false===td[1].generics[0].generics.mutable)
        a.t(null===td[1].generics[0].generics.generics)
    })();
    ;(function(){ // <のほうが,より先 後方ネスト
        const td = TypeData.read('Obj<String,Array<Integer>>,String')
        console.log(td)
        a.t(Type.isAry(td))
        a.t(2===td.length)

        a.t('Obj'===td[0].name)
        a.t(false===td[0].nullable)
        a.t(false===td[0].mutable)
        a.t(Type.isAry(td[0].generics))
        a.t(2===td[0].generics.length)

        a.t('String'===td[0].generics[0].name)
        a.t(false===td[0].generics[0].nullable)
        a.t(false===td[0].generics[0].mutable)
        a.t(null===td[0].generics[0].generics)

        a.t('Array'===td[0].generics[1].name)
        a.t(false===td[0].generics[1].nullable)
        a.t(false===td[0].generics[1].mutable)
        a.t(Type.isObj(td[0].generics[1].generics))

        a.t('Integer'===td[0].generics[1].generics.name)
        a.t(false===td[0].generics[1].generics.nullable)
        a.t(false===td[0].generics[1].generics.mutable)
        a.t(null===td[0].generics[1].generics.generics)

        a.t('String'===td[1].name)
        a.t(false===td[1].nullable)
        a.t(false===td[1].mutable)
        a.t(null===td[1].generics)
    })();

    ;(function(){ // <のほうが,より先 前方ネスト
        const td = TypeData.read('Obj<Array<Integer>,String>,String')
        a.t(Type.isAry(td))
        a.t(2===td.length)
        console.log(td)
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)

        a.t('Obj'===td[0].name)
        a.t(false===td[0].nullable)
        a.t(false===td[0].mutable)
        a.t(Type.isAry(td[0].generics))
        a.t(2===td[0].generics.length)

        a.t('Array'===td[0].generics[0].name)
        a.t(false===td[0].generics[0].nullable)
        a.t(false===td[0].generics[0].mutable)
        a.t(Type.isObj(td[0].generics[0].generics))

        a.t('Integer'===td[0].generics[0].generics.name)
        a.t(false===td[0].generics[0].generics.nullable)
        a.t(false===td[0].generics[0].generics.mutable)
        a.t(null===td[0].generics[0].generics.generics)

        a.t('String'===td[0].generics[1].name)
        a.t(false===td[0].generics[1].nullable)
        a.t(false===td[0].generics[1].mutable)
        a.t(null===td[0].generics[1].generics)

        a.t('String'===td[1].name)
        a.t(false===td[1].nullable)
        a.t(false===td[1].mutable)
        a.t(null===td[1].generics)
    })();

    // 3
    ;(function(){
        const td = TypeData.read('Integer?=,String?=,Date?=')
        a.t(Type.isAry(td))
        a.t(3===td.length)
        console.log(td)
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('Integer'===td[0].name)
        a.t(true===td[0].nullable)
        a.t(true===td[0].mutable)
        a.t(null===td[0].generics)
        a.t('String'===td[1].name)
        a.t(true===td[1].nullable)
        a.t(true===td[1].mutable)
        a.t(null===td[1].generics)
        a.t('Date'===td[2].name)
        a.t(true===td[2].nullable)
        a.t(true===td[2].mutable)
        a.t(null===td[2].generics)
    })();
    ;(function(){
        //const td = TypeData.read('Obj<Obj<Array<Integer>,Array<String>>,Obj<Cls<Any>,Ins<Any>>,Map<String,Integer>>,Array<Integer>,Map<String?=,Date?=>')
        //const td = TypeData.read('Obj<Obj<Array<Integer>,Array<String>>,Obj<Cls<Any>,Ins<Any>>>,Map<String,Integer>,Array<Integer>,Map<String?=,Date?=>')
        const td = TypeData.read('Obj<Obj<Array<Integer>,Array<String>>,Obj<Cls<Any>,Ins<Any>>>,Map<String,Integer>,Array<Integer>')


        a.t(Type.isAry(td))
        a.t(3===td.length)
        console.log(td)
        a.t('Obj'===td[0].name)
        a.t(false===td[0].nullable)
        a.t(false===td[0].mutable)
        a.t(Type.isAry(td[0].generics))
        a.t(2===td[0].generics.length)

        a.t('Obj'===td[0].generics[0].name)
        a.t(false===td[0].generics[0].nullable)
        a.t(false===td[0].generics[0].mutable)
        a.t(Type.isAry(td[0].generics[0].generics))
        a.t(2===td[0].generics[0].generics.length)

        a.t('Array'===td[0].generics[0].generics[0].name)
        a.t(false===td[0].generics[0].generics[0].nullable)
        a.t(false===td[0].generics[0].generics[0].mutable)
        a.t(Type.isObj(td[0].generics[0].generics[0].generics))

        a.t('Integer'===td[0].generics[0].generics[0].generics.name)
        a.t(false===td[0].generics[0].generics[0].generics.nullable)
        a.t(false===td[0].generics[0].generics[0].generics.mutable)
        a.t(null===td[0].generics[0].generics[0].generics.generics)

        a.t('Array'===td[0].generics[0].generics[1].name)
        a.t(false===td[0].generics[0].generics[1].nullable)
        a.t(false===td[0].generics[0].generics[1].mutable)
        a.t(Type.isObj(td[0].generics[0].generics[1].generics))

        a.t('String'===td[0].generics[0].generics[1].generics.name)
        a.t(false===td[0].generics[0].generics[1].generics.nullable)
        a.t(false===td[0].generics[0].generics[1].generics.mutable)
        a.t(null===td[0].generics[0].generics[1].generics.generics)

        a.t('Obj'===td[0].generics[1].name)
        a.t(false===td[0].generics[1].nullable)
        a.t(false===td[0].generics[1].mutable)
        a.t(Type.isAry(td[0].generics[1].generics))
        a.t(2===td[0].generics[1].generics.length)

        a.t('Cls'===td[0].generics[1].generics[0].name)
        a.t(false===td[0].generics[1].generics[0].nullable)
        a.t(false===td[0].generics[1].generics[0].mutable)
        a.t(Type.isObj(td[0].generics[1].generics[0].generics))

        a.t('Any'===td[0].generics[1].generics[0].generics.name)
        a.t(false===td[0].generics[1].generics[0].generics.nullable)
        a.t(false===td[0].generics[1].generics[0].generics.mutable)
        a.t(null===td[0].generics[1].generics[0].generics.generics)

        a.t('Ins'===td[0].generics[1].generics[1].name)
        a.t(false===td[0].generics[1].generics[1].nullable)
        a.t(false===td[0].generics[1].generics[1].mutable)
        a.t(Type.isObj(td[0].generics[1].generics[1].generics))

        a.t('Any'===td[0].generics[1].generics[1].generics.name)
        a.t(false===td[0].generics[1].generics[1].generics.nullable)
        a.t(false===td[0].generics[1].generics[1].generics.mutable)
        a.t(null===td[0].generics[1].generics[1].generics.generics)

        // 2
        a.t('Map'===td[1].name)
        a.t(false===td[1].nullable)
        a.t(false===td[1].mutable)
        a.t(Type.isAry(td[1].generics))
        a.t(2===td[1].generics.length)

        a.t('String'===td[1].generics[0].name)
        a.t(false===td[1].generics[0].nullable)
        a.t(false===td[1].generics[0].mutable)
        a.t(null===td[1].generics[0].generics)

        a.t('Integer'===td[1].generics[1].name)
        a.t(false===td[1].generics[1].nullable)
        a.t(false===td[1].generics[1].mutable)
        a.t(null===td[1].generics[1].generics)

        // 3
        a.t('Array'===td[2].name)
        a.t(false===td[2].nullable)
        a.t(false===td[2].mutable)
        a.t(Type.isObj(td[2].generics))

        a.t('Integer'===td[2].generics.name)
        a.t(false===td[2].generics.nullable)
        a.t(false===td[2].generics.mutable)
        a.t(null===td[2].generics.generics)
    })();
    ;(function(){
        a.e(TypeError, `不正な文字列です。,が先頭・末尾に来ることはありません。`, ()=>TypeData.read(',int'))
        a.e(TypeError, `不正な文字列です。,が先頭・末尾に来ることはありません。`, ()=>TypeData.read('int,'))
        a.e(TypeError, `不正な文字列です。,が先頭・末尾に来ることはありません。`, ()=>TypeData.read(',int,'))
        a.e(TypeError, `不正な文字列です。,が先頭・末尾に来ることはありません。`, ()=>TypeData.read(',int,str'))
        a.e(TypeError, `不正な文字列です。,が先頭・末尾に来ることはありません。`, ()=>TypeData.read('int,str,'))
        a.e(TypeError, `不正な文字列です。,が先頭・末尾に来ることはありません。`, ()=>TypeData.read(',int,str,'))
    })();
    ;(function(){
        a.e(TypeError, `ジェネリクスの記号数が不正です。'<'と'>'は同数であるべきです。'<':1 '>':0`, ()=>TypeData.read('<int'))
        a.e(TypeError, `ジェネリクスの記号数が不正です。'<'と'>'は同数であるべきです。'<':0 '>':1`, ()=>TypeData.read('int>'))
        a.e(TypeError, `不正な文字列です。<が先頭・末尾に来ることはありません。`, ()=>TypeData.read('<int>'))
        a.e(TypeError, `不正な文字列です。<が先頭・末尾に来ることはありません。`, ()=>TypeData.read('<str>,int'))
    })();
    ;(function(){
        a.e(TypeError, `ジェネリクスの記号順が不正です。'<>'であるべき所が'><'になっています。`, ()=>TypeData.read('>int<'))
        a.e(TypeError, `ジェネリクスの記号順が不正です。'<>'であるべき所が'><'になっています。`, ()=>TypeData.read('ary>int<'))
        a.e(TypeError, `ジェネリクスの記号順が不正です。'<>'であるべき所が'><'になっています。`, ()=>TypeData.read('int,>str<'))
    })();
    ;(function(){
        a.e(TypeError, `'x'は不正な型名です。`, ()=>TypeData.read('x'))
        a.e(TypeError, `'y'は不正な型名です。`, ()=>TypeData.read('x<y>'))
        a.e(TypeError, `'x'は不正な型名です。`, ()=>TypeData.read('x<int>'))
        a.e(TypeError, `'y'は不正な型名です。`, ()=>TypeData.read('ary<y>'))
    })();
    ;(function(){
        a.e(TypeError, `'int'はジェネリクスを持てません。`, ()=>TypeData.read('int<str>'))
//        a.e(TypeError, `'y'は不正な型名です。`, ()=>TypeData.read('num<int>'))
//        a.e(TypeError, `'y'は不正な型名です。`, ()=>TypeData.read('num<flt>'))
    })();
    a.fin()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

