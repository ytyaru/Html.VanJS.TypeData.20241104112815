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
    console.log(new TypeData('String?='))
    // 1
    ;(function(){
        const td = new TypeData('String?=')
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('String'===td.name)
        a.t(true===td.nullable)
        a.t(true===td.mutable)
    })();
    ;(function(){
        const td = new TypeData('String?')
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('String'===td.name)
        a.t(true===td.nullable)
        a.t(false===td.mutable)
    })();
    ;(function(){
        const td = new TypeData('String=')
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('String'===td.name)
        a.t(false===td.nullable)
        a.t(true===td.mutable)
    })();
    // 2
    ;(function(){
        const td = new TypeData('Integer,String')
        console.log(td)
        console.log(td.name)
        console.log(td.nullable)
        console.log(td.mutable)
        a.t('String'===td.name)
        a.t(false===td.nullable)
        a.t(true===td.mutable)
    })();

    a.fin()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

