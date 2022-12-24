# 文字随机动画
#### 功能：将一个句子切分成若干个字符的组合，随机从下到上渐入动画

#### 原理：
![image](./imgs/mindMap.jpg)
 
# 快速上手
使用链接引入和安装依赖包选用一种即可
## 一.可以使用连接引入
```shell
<script src="https://cdn.jsdelivr.net/gh/sonicexx/textAnimation@master/linkJS/textani.js"> </script>
```
### 直接使用实例化
```javascript
new TextAni({
    //API
})
```
## 二.安装依赖包
```shell
npm install textani
```
### 全局注册（在 main.js 文件里注册）
```javascript
import TextAni from 'textani';
global.TextAni = TextAni;
```
### 局部注册（在你所使用的 vue 里注册）
```javascript
import TextAni from 'textani';
```
### API
```javascript
new TextAni({
    node:'.text', //必填
    spl:0, //选填
    //默认 0，每个字符都有独立的动画
    //写入数字 比如 4，动画总共分为 4 步，4 步后全部字符显示，动画执行结束
    //写入分割字符 比如 ','，将以 ',' 字符后作为断点分割字符串，分别是独立的动画

    aniName: '自定义的动画名称', //选填
    //默认 透明度淡入动画
    
    keepTime:'.8s', //选填
    //默认 1s，每个字符动画轨迹的时间

    delay:'.3s', //选填
    //默认 1s，两个动画之间的间隔时间

    allDelay:'1s', //选填
    //默认 0s，整体动画的延迟时间

    aniMode:'ease-out', //选填
    //默认：ease-in-out
});
```

### 例子
#### 默认渐入动画：透明度渐入
```html
<div class="title">
    <p class="text">梯田,弯,弯闪,银光。</p>
</div>
```
```javascript
new TextAni({
    node:'.text', 
});
```
#### 自定义渐入动画：自定义 @keyframes a{...}
```css
@keyframes a {
    0%{opacity: 0; transform: translateY(100%);}
    50%{
        transform: translateY(-10%);
        color: red;
    }
    100%{opacity: 1;transform: translateY(0);}
}
```
```html
<div class="title">
    <p class="text">梯田,弯,弯闪,银光。</p>
</div>
```
```javascript
new TextAni({
    node:'.text', 
    spl:0, 
    aniName:'a',
    keepTime:'.8s', 
    delay:'.3s', 
    aniMode:'ease-out', 
});
```

# PS:一个前端界的小学生，勿喷 多指教😶