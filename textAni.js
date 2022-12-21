class TextAni{
    constructor(...args){
        this.obj = document.querySelector(args[0].node)
        this.spl = args[0].spl
        this.str = ''

        this.keepTime = args[0].keepTime?args[0].keepTime: '1s'
        this.delay = args[0].delay?args[0].delay:'1s'
        this.allDelay = args[0].allDelay?args[0].allDelay:'0s'
        this.aniMode = args[0].aniMode?args[0].aniMode:'ease-in-out'

        this.init()
    }
    init(){
        this.str = this.obj.innerHTML
        this.obj.innerHTML = ''
        this.main()

        document.styleSheets[0].insertRule(`
        @keyframes text {
            from{
                opacity: 0;
                transform: translateY(100%);
            }
            to{
                opacity: 1;
                transform: translateY(0);
            }
        }
        `,0)
    }
    main(){
        if(this.spl === undefined || this.spl === ''){
            this.spl = 0
        }
        if(typeof this.spl === 'number'){
            this.appentIt(this.str, this.spl)
        }else if(typeof this.spl === 'string'){
            let arr = this.str.split(this.spl)
            this.appentIt(arr)
        }else{
            console.error('not nice, 请输入正确的 分割步数spl 参数');
        }
    }
    appentIt(obj, rand){
        let isStr = true
        if(typeof obj !== 'string'){
            isStr = false
        }
        for(let i of obj){
            let span = document.createElement('span')
            if(isStr){
                if(i === ' '){
                    span.innerHTML = '&ensp;'
                }else{
                    span.innerHTML = i
                }
            }else{
                if(obj.length-1 === obj.indexOf(i)){
                    span.innerHTML = `${i}`
                }else{
                    if(this.spl == ' '){
                        span.innerHTML = `${i}&ensp;`
                    }else{
                        span.innerHTML = `${i}${this.spl}`
                    }
                }
            }
            let max = rand?rand:obj.length+1
            let id = Math.floor(Math.random() * (max - 0) + 0)
            this.spanStyle(span)
            span.style.animationDelay = `calc(calc(${this.delay} * ${id}) + ${this.allDelay})`
            this.obj.append(span)
        }
    }
    spanStyle(obj){
        obj.style.opacity = 0
        obj.style.display = 'inline-block'
        obj.style.animation = `text ${this.keepTime} ${this.aniMode} forwards`
    }
}