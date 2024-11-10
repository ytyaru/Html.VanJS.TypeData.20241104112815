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
        const td = TypeData.read('Kvs<String,Integer>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Kvs'===td.name)
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
        const td = TypeData.read('Kvs?=<String?=,Integer?=>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Kvs'===td.name)
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
    ;(function(){
        const td = TypeData.read('Kvs?=<String?=,Array?=<Integer?=>>')
        a.t(Type.isObj(td))
        console.log(td)
        a.t('Kvs'===td.name)
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

    a.fin()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});
