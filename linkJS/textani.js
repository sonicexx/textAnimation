class TextAni {
  constructor(...args) {
    this.obj = document.querySelector(args[0].el); //节点
    this.text = args[0].text || ''; //指定文本内容
    this.spl = args[0].spl; //分割范围
    this.str = ''; //存储原始文本
    this.aniName = args[0].aniName || 'textani'; //animation 名称
    this.keepTime = args[0].keepTime || '1s'; //保持时间
    this.delay = args[0].delay || '1s'; //延迟时间
    this.allDelay = args[0].allDelay || '0s'; //整体延迟时间
    this.aniMode = args[0].aniMode || 'ease-in-out'; //动画模式
    this.shuffle = args[0].shuffle ?? true;
    this.init();
  }
  // 初始化
  init() {
    this.obj.style.opacity = 1;

    if (this.text) {
      this.str = this.text.replace(/\s+/g, ' '); //获取内容，过滤掉多余的空格和换行符
    } else {
      this.str = this.obj.innerHTML.replace(/\s+/g, ' '); //获取内容，过滤掉多余的空格和换行符
    }

    this.obj.innerHTML = ''; //清空内容
    this.main();
  }

  main() {
    if (this.spl === undefined || this.spl === '') {
      this.spl = 0;
    }
    // 判断范围类型，数字就直接调用切割，字符串就先分割成数组再切割处理
    if (typeof this.spl === 'number') {
      this.appentIt(this.str, this.spl);
    } else if (typeof this.spl === 'string') {
      let arr = this.str.split(this.spl);
      this.appentIt(arr);
    } else {
      console.error('not nice, 请输入正确的 分割步数spl 参数');
    }
  }

  appentIt(obj, rand) {
    let isStr = true;
    if (typeof obj !== 'string') {
      isStr = false;
    }

    const UID = new Date().getTime() + Math.floor(Math.random() * 10000);
    this.addCSS(UID);

    let a = ''; //整个 html 解构临时存储
    let count = 0; //索引计数
    for (let i of obj) {
      let temp = ''; //单个字段临时存储
      if (isStr) {
        switch (i.charCodeAt()) {
          case 32:
            temp = '&nbsp;';
            break;
          default:
            temp = i;
            break;
        }
      } else {
        obj.length - 1 === obj.indexOf(i)
          ? (temp = `${i}`)
          : (temp = `${i}${
              this.spl.charCodeAt() === 32 ? '&nbsp;' : this.spl
            }`);
      }
      let max = rand ? rand : obj.length + 1;
      let id = this.shuffle ? Math.floor(Math.random() * max + 0) : count;
      a +=
        i.charCodeAt() === 10
          ? ''
          : `<span data-text-id="${UID}" style="animation-delay:${(
              parseFloat(this.delay) * id +
              parseFloat(this.allDelay)
            ).toFixed(2)}s">${temp}</span>`;
      count++; //索引计数
    }
    this.obj.innerHTML = a;
  }

  addCSS(UID) {
    if (this.aniName === 'textani') {
      if (!document.styleSheets.length) {
        const oFrag = document.createDocumentFragment();
        const c = document.createComment('code injected by TextAni');
        const s = document.createElement('style');
        oFrag.appendChild(c);
        oFrag.appendChild(s);
        document.head.appendChild(oFrag);
      }
      document.styleSheets[0].insertRule(
        `
            @keyframes textani {
                from{
                    opacity: 0;
                }
                to{
                    opacity: 1;
                }
            }
            `,
        0
      );
    }
    document.styleSheets[0].insertRule(
      `
          [data-text-id="${UID}"]{
            text-indent: 0 !important;
            display: inline-block;
            animation: ${this.aniName} ${this.keepTime} ${this.aniMode} both;
          }
          `,
      1
    );
  }
}
