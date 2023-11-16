# React 面向组件编程

[[toc]]

## 1 函数式组件

- 执行了 ReactDOM.render()之后，发生了什么？(组件渲染过程)
  - React 解析组件标签，寻找对应组件。
  - 发现组件是函数式组件，则调用函数，将返回的虚拟 DOM 转换为真实 DOM ，并渲染到页面中

```html{4}
<script type="text/babel">
  // 1. 创建函数式组件
  function MyComponent() {
    console.log(this) //此处的this是undefined，因为babel编译后开启了严格模式
    return <h2>我是用函数定义的组件（适用于简单组件的定义）</h2>
  }
  // 2. 渲染组件到页面
  ReactDOM.render(<MyComponent />, document.getElementById("test"))
</script>
```

## 2 类式组件

```html
<script type="text/babel">
  class MyComponent extends React.Component {
    render() {
      // this 指向 MyComponent组件实例对象(类MyComponent的实例对象)
      console.log(this) // MyComponent {}
      return <h2>类式组件</h2>
    }
  }

  ReactDOM.render(<MyComponent />, document.getElementById('test'))
</script>
```

- 执行了 ReactDOM.render()之后，发生了什么？(组件渲染过程)
  - React 解析组件标签，寻找组件
  - 发现是类式组件，则 `new 出来该类的实例对象`，通过实例调用原型上的 render 方法
  - 将 render 返回的虚拟 DOM 转为真实 DOM ，渲染到页面上

## 3 组件实例核心属性 state

### 3.1 state 基本使用

- 概念
  - `state` 是组件实例对象最重要的属性，值为对象。
  - 组件被称为状态机，通过更新组件的 `state` 来更新对应的页面显示(重新渲染组件)
- 要点
  - 组件中 render 方法中的 this 为组件实例对象
  - 组件自定义方法中 this 为 undefined，如何解决？
    - 强制绑定 this: 通过函数对象的 bind()
    - 赋值语句的形式＋箭头函数
  - 状态数据，不能直接修改或更新，需要用<span style="color:red">setState</span>

```html{11-13,16-19,26-29}
<script type="text/babel">
    class Weather extends React.Component {
      constructor(props) {
        super(props)
        // 初始化state
        this.state = {
          isHot: true
        }

        // 解决this指向问题
        // 将原型对象上的changeWeather中的this指向当前this(实例对象),
        // 形成新的函数change挂载在当前实例对象上
        this.change = this.changeWeather.bind(this)
      }
      changeWeather() {
        // changeWeather放在哪里？ ---- Weather的原型对象上，供实例使用
        // 由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
        // 类中的方法默认开起来局部的严格模式，所以changeWeather中的this为undefined
        console.log(this); // undefined
      }
      render() {
        const { isHot } = this.state // this 指向实例对象
        return (
          <div>
            <div>{isHot}</div>
            <h1 onClick={this.changeWeather}>
              直接使用原型对象的方法，此时changeWeather方法内部this为undefined
            </h1>
            <h1 onClick={this.change}>调用实例对象上的方法</h1>
          </div>
        )
      }
    }

    ReactDOM.render(<Weather />, document.getElementById('test'))
  </script>
```

### 3.2 setState

修改 state 中的值，并更新视图

```html{19}
<body>
  <div id="test"></div>
  <script type="text/javascript" src="../js/react.development.js"></script>
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <script src="../js/babel.min.js"></script>

  <script type="text/babel">
    class Weather extends React.Component {
      constructor(props) {
        super(props)
        // 初始化state
        this.state = { isHot: true }

        // 给实例对象添加方法
        this.changeWeather = this.changeWeather.bind(this)
      }
      changeWeather() {
        // 修改state中的值，并更新视图
        this.setState({ isHot: !this.state.isHot })
      }
      render() {
        const { isHot } = this.state // this 指向实例对象
        return (
          <h1 onClick={this.changeWeather}>天气很 {isHot ? "热" : "冷"}</h1>
        )
      }
    }

    ReactDOM.render(<Weather />, document.getElementById("test"))
  </script>
</body>
```

### 3.3 state 简写形式

[原理](/javascript/es6/Class.html#实例属性-方法)

```js{2,3,5-8}
class Weather extends React.Component {
  // 初始化state
  state = { isHot: true }

  // 自定义方法-----采用赋值语句的形式＋箭头函数
  changeWeather = () => {
    this.setState({ isHot: !this.state.isHot })
  }

  render() {
    const { isHot } = this.state // this 指向实例对象
    return <h1 onClick={this.changeWeather}>天气很 {isHot ? "热" : "冷"}</h1>
  }
}

ReactDOM.render(<Weather />, document.getElementById("test"))
```

### 3.4 异步回调函数中使用

- setState(fn)可以把`上次更新后的状态`拿来作为参数使用，所有 setState(fn)的状态更新不会合并

```jsx{5-12}
const Demo = () => {
  const [countdown, setCountdown] = useState(60)
  const test = () => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown > 1) {
          return prevCountdown - 1
        } else {
          clearInterval(timer)
          return 0
        }
      })
    }, 1000)
  }
  return <span>00:{countdown >= 10 ? countdown : '0' + countdown}</span>
}
```

## 4 组件实例核心属性 props

### 4.1 props 基本使用

- 每个组件对象都会有 `props(propertiees)`属性
- 组件标签的所有属性都保存在 `props` 中
- `props`是只读的

```js{15,19,21,25,26}
class Person extends React.Component {
  render() {
    const { name, sex, age } = this.props
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
  }
}

ReactDOM.render(
  <Person name="tom" age={18} sex="男" />,
  document.getElementById("test1")
)

const jerry = { name: "jerry", age: 20, sex: "女" }
ReactDOM.render(
  <Person name={jerry.name} age={jerry.age} sex={jerry.sex} />,
  document.getElementById("test2")
)

const jack = { name: "jack", age: 28, sex: "男" }
ReactDOM.render(<Person {...jack} />, document.getElementById("test3"))
```

 <img :src="$withBase('/React/03.png')">

### 4.2 props 限制

在 `React 15.5` 以前，`React` 身上有一个 `PropTypes` 属性可直接使用，没有把 PropTypes 单独封装为一个模块。

从 React 15.5 开始，把 `PropTypes` 单独`封装`为一个模块，需要额外导入使用。

```html{23-34}
 <div id="test1"></div>
  <div id="test2"></div>
  <div id="test3"></div>
  <script type="text/javascript" src="../js/react.development.js"></script>
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <script type="text/javascript" src="../js/babel.min.js"></script>
  <!-- 引入prop-types，用于对组件标签属性进行限制 -->
  <script type="text/javascript" src="../js/prop-types.js"></script>

  <script type="text/babel">
    class Person extends React.Component {
      render() {
        const { name, sex, age } = this.props
        return (
          <ul>
            <li>姓名：{name}</li>
            <li>性别：{sex}</li>
            <li>年龄：{age}</li>
          </ul >
        )
      }
    }
    // 对标签属性进行类型、必要性的限制
    Person.propTypes = {
      name: PropTypes.string.isRequired, // 限制name必填，为字符串
      sex: PropTypes.string, // 限制sex为字符串
      agee: PropTypes.number, // 限制age为数值
      speak: PropTypes.func//限制speak为函数
    }
    // 指定默认标签属性值
    Person.defaultProps = {
      sex: '未知',// sex默认值未知
      age: 0// age默认值0
    }

    ReactDOM.render(<Person name="tom" age={18} sex='男' />, document.getElementById('test1'))

    const jerry = { name: "jerry", age: 20, sex: '女' }
    ReactDOM.render(<Person name={jerry.name} age={jerry.age} sex={jerry.sex} />, document.getElementById('test2'))

    const jack = { name: "jack", speak: speak }
    ReactDOM.render(<Person {...jack} />, document.getElementById('test3'))
    function speak() {
      console.log('我在说话')
    }
  </script>
```

### 4.3 props 简写(一次传递多个 prop)

```js{2-11}
class Person extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // 限制name必填，为字符串
    sex: PropTypes.string, // 限制sex为字符串
    agee: PropTypes.number, // 限制age为数值
    speak: PropTypes.func, //限制speak为函数
  }
  static defaultProps = {
    sex: "未知", // sex默认值未知
    age: 0, // age默认值0
  }

  render() {
    const { name, sex, age } = this.props
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
  }
}
const jack = { name: "jack", speak: speak }
ReactDOM.render(<Person {...jack} />, document.getElementById("test3"))
```

### 4.4 类式组件的构造器与 props

[官网说明](https://zh-hans.legacy.reactjs.org/docs/react-component.html#constructor)

在 React 中，构造函数仅用于以下两种情况：

- 通过给 `this.state` 赋值对象来初始化内部 `state`。
- 为`事件处理函数`绑定实例

```js
class Person extends React.Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
    this.handleClick = this.handleClick.bind(this)
  }
}
```

因此构造器一般都不需要写。如果要在构造器内使用 `this.props` 才声明构造器，并且需要在最开始调用 `super(props)`

```js
constructor(props) {
  // 构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
  super(props)
  console.log(this.props) // 正确输出
}

constructor(props) {
  // 如果不传递props给super，也可以直接使用构造器传进来的props，所以无伤大雅
  super()
  console.log(this.props) // undefined
  console.log(props)// 正确输出
}
```

### 4.5 函数式组件使用 props

由于函数可以传递参数，因此函数式组件可以使用 `props`

```html
<script type="text/babel">
  function Person(props) {
    const { name, age, sex } = props
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
  }
  Person.propTypes = {
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number
  }

  Person.defaultProps = {
    sex: '男',
    age: 18
  }

  ReactDOM.render(<Person name='jerry' />, document.getElementById('test'))
</script>
```

### 4.6 props.children

```js
class Person extends React.Component {
  render() {
    const { children } = this.props
    return (
      <ul>
        {/* 输出标签体传入的内容 -> 我是标签体内容 */}
        <li>姓名：{children}</li>
      </ul>
    )
  }
}
ReactDOM.render(<Person>我是标签体内容</Peerson>, document.getElementById("test3"))
```

## 5 组件实例核心属性 refs

### 5.1 字符串 refs

这种形式已过时，效率不高，[官方](https://zh-hans.legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs)不建议使用

```js{3,6,7,12-14}
class Demo extends React.Component {
  showData = () => {
    alert(this.refs.input1.value)
  }
  showData2 = () => {
    const { input2 } = this.refs
    alert(input2.value)
  }
  render() {
    return (
      <div>
        <input ref="input1" type="text" />
        <button onClick={this.showData}>按钮</button>
        <input ref="input2" type="text" onBlur={this.showData2} />
      </div>
    )
  }
}
```

### 5.2 回调 refs

回调 refs: 传递一个函数。这个函数中接受 `React 组件实例`或 `HTML DOM 元素`作为参数，以使它们能在其他地方被存储和访问

```js{10,20,23}
class Demo extends React.Component {
  showData = () => {
    // alert(this.input1.value)
    const { input1 } = this
    alert(input1.value)
  }

  // React会将当前ref所在的节点传递给参数
  setInputRef = (element) => {
    this.input2 = element
  }
  showData2 = () => {
    const { input2 } = this
    alert(input2.value)
  }
  render() {
    return (
      <div>
        { /* 一般使用这种方式 */ }
        <input ref={(element) => (this.input1 = element)} type="text" />
        <button onClick={this.showData}>按钮</button>
        <input
          ref={this.setInputRef}
          type="text"
          onBlur={this.showData2}
        />
      </div>
    )
  }
}
```

**关于回调 refs 的说明**

- 如果 `ref` 回调函数是以`内联`函数的方式定义的，在`更新过程中`它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。
- 通过将 ref 的回调函数定义成 class 的`绑定函数的方式`可以避免上述问题，但是大多数情况下它是`无关紧要`的。

```js
class Demo extends React.Component {
  state = { isHot: false }

  changeWeather = () => {
    const { isHot } = this.state
    this.setState({ isHot: !isHot })
  }

  saveInput = element => {
    this.input1 = element
    console.log('绑定函数的方式', element)
  }

  render() {
    const { isHot } = this.state
    return (
      <div>
        <h2>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
        <input
          ref={ele => {
            this.input2 = ele
            console.log('内联函数的方式', ele)
          }}
          type='text'
        />
        <input ref={this.saveInput} type='text' />
        <button onClick={this.changeWeather}>切换天气</button>
      </div>
    )
  }
}
```

- 首次渲染，两种方式都调用一次函数
  <img :src="$withBase('/React/04.png')">
- 更新过程，重新渲染页面，内联函数方式函数调用两次，绑定函数方式不调用
  <img :src="$withBase('/React/05.png')">

### 5.3 createRef

`React.createRef` 调用后返回一个容器，该容器可以存储被 ref 所标识的节点，且一个容器只能存储一个节点。

```js{2,6,7,15}
class Demo extends React.Component {
  myRef = React.createRef()
  myRef2 = React.createRef()

  showData = () => {
    // 读取createRef()创建的ref
    alert(this.myRef.current.value)
  }
  showData2 = () => {
    alert(this.myRef2.curreent.value)
  }
  render() {
    return (
      <div>
        <input ref={this.myRef} type="text" />
        <button onClick={this.showData}>按钮</button>
        <input ref={this.myRef2} type="text" onBlur={this.showData2} />
      </div>
    )
  }
}
```

## 6 事件处理

- (1) 通过 `onXxx` 属性指定事件处理函数(注意大小写)
  - a. React 使用的是自定义(合成)事件，而不是使用的原生 DOM 事件 ———— 为了更好的兼容性
  - b. React 中的事件是通过事件委托方式处理的(委托给组件最外层的元素） ———— 为了的高效
- (2) 通过 `event.target` 得到发生事件的 DOM 元素对象 ——— 不要过度使用 ref

当触发事件的元素和需要操作的元素为同一个时，可以不使用 ref

```js
class Demo extends React.Component {
  showData2 = event => {
    alert(event.target.value)
  }

  render() {
    return (
      <div>
        <input onBlur={this.showData2} type='text' />
      </div>
    )
  }
}
```

## 7 受控 & 非受控组件

包含表单的组件分为受控组件和非受控组件两种

- 非受控组件：现用现取。即需要使用时，再获取节点得到数据
- 受控组件：将数据存放在状态 state 中，类似于 Vue 双向绑定的从视图层绑定到数据层

### 7.1 非受控组件

```js
class Login extends React.Component {
  handleSubmit = event => {
    event.preventDefault() // 阻止表单默认提交
    const { username, password } = this
    alert(`用户名是：${username.value}, 密码是：${password.value}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input ref={element => (this.username = element)} type='text' name='username' />
        密码：
        <input ref={element => (this.password = element)} type='password' name='password' />
        <button>登录</button>
      </form>
    )
  }
}
```

### 7.2 受控组件

```js
class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }
  saveUsername = event => {
    this.setState({ username: event.target.value })
  }
  savePassword = event => {
    this.setState({ password: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault() // 阻止表单默认提交
    const { username, password } = this.state
    alert(`用户名是：${username}, 密码是：${password}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input onChange={this.saveUsername} type='text' name='username' />
        {/*
          双向绑定
          <input value={this.state.username} onChange={this.saveUsername} type="text" name="username" />
        */}
        密码：
        <input onChange={this.savePassword} type='password' name='password' />
        <button>登录</button>
      </form>
    )
  }
}
```

## 8 事件绑定的函数传参

### 8.1 高阶函数 & 函数柯里化

- 高阶函数：参数为函数或者返回一个函数的函数，如 Promise、setTimeout、Array.map()等
- 函数柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

```js
// 函数柯里化
function sum(a) {
  return b => {
    return c => {
      return a + b + c
    }
  }
}
```

### 8.2 使用函数柯里化的方式

```js{7-11,22-25,28,30,32}
class Login extends React.Component {
  state = {
    username: "",
    password: "",
  }

  save = (type) => {
    return (event) => {
      this.setState({ [type]: event.target.value })
    }
  }
  handleSubmit = (event) => {
    event.preventDefault() // 阻止表单默认提交
    const { username, password } = this.state
    alert(`用户名是：${username}, 密码是：${password}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        {/*
          react中事件必须绑定的是一个函数
          下面代码中 this.save("username") 指的是【函数调用】，而不是绑定函数
          save函数调用后返回的那个函数才是真正绑定的函数，
          如果save函数没有返回一个函数，那么onChange绑定的是undefined
        */}
        {
          /* onChange触发后 调用的是 save返回的那个函数 */
        }
        <input onChange={this.save("username")} type="text" name="username" />
        密码：
        <input onChange={this.save("password")} type="text" name="username" />
        <button>登录</button>
      </form>
    )
  }
}
```

### 8.3 直接绑定

```js{6-8,19-20,23,29}
class Login extends React.Component {
  state = {
    username: "",
    password: "",
  }
  save = (type, event) => {
    this.setState({ [type]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault() // 阻止表单默认提交
    const { username, password } = this.state
    alert(`用户名是：${username}, 密码是：${password}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        {/*
          此处绑定的是 (event) => this.save("useername", event) 这个匿名函数
          onChange 触发调用的就是这个函数
        */}
        <input
          onChange={(event) => this.save("useername", event)}
          type="text"
          name="username"
        />
        密码：
        <input
          onChange={(event) => this.save("password", event)}
          type="password"
          name="password"
        />
        <button>登录</button>
      </form>
    )
  }
}
```

## 9 生命周期(旧)

### 9.1 初始化阶段

`ReactDOM.render()` 触发的初次渲染

- `constructor` --- 构造器
- `componentWillMount` --- 即将挂载组件
- `render` --- 挂载组件
- `componentDidMount` --- 挂载组件完成

### 9.2 卸载阶段

`ReactDOM.unmountComponentAtNode()` 触发

- `componentWillUnmount` --- componentWillUnmount

### 9.3 更新阶段

- `componentWillReceiveProps(props)`
  - 父组件更新引发当前组件更新`才会执行`
  - props: 新
- `shouldComponentUpdate(props, state)`
  - 控制组件是否更新的阀门，返回值为布尔值，默认为 true 。若返回 false ，则后续流程不会进行。
  - props/state： 新
- `componentWillUpdate(props, state)`
  - - props/state： 新
- `render`
- `componentDidUpdate(prevProps, prevState, snapshot)`
  - prevProps/prevState: 上一次渲染的 props 和 state
  - snapshot: `getSnapshotBeforeUpdate()` 生命周期的返回值

---

**1.组件内部调用`this.setState()`修改状态**

- `shouldComponentUpdate` --- 控制组件是否更新的阀门
- `componentWillUpdate` --- 即将更新组件
- `render` --- 挂载组件
- `componentDidUpdate` --- 更新组件完成

**2.组件内部调用`this.forceUpdate()`强制更新**

- `componentWillUpdate` --- 即将更新组件
- `render` --- 挂载组件
- `componentDidUpdate` --- 更新组件完成

**3.父组件更新触发子组件更新执行全套更新阶段生命周期**

- `componentWillReceiveProps`---父组件更新引发当前组件更新执行,参数 props，为接受到的 prop
- `shouldComponentUpdate`
- `componentWillUpdate`
- `render`
- `componentDidUpdate`

<img :src="$withBase('/React/react生命周期(旧).png')">

<!-- [父子组件更新阶段生命周期](/React/component.html#_9-4-3-更新阶段)

---

- 初始化阶段

<img :src="$withBase('/React/06.png')">

- 卸载阶段

<img :src="$withBase('/React/07.png')">
<img :src="$withBase('/React/08.png')">

- 更新阶段

  - 1.组件内部调用`this.setState()`修改状态
    <img :src="$withBase('/React/09.png')">
  - 2.组件内部调用`this.forceUpdate()`强制更新
    <img :src="$withBase('/React/10.png')">
  - 3.父组件更新触发子组件更新执行全套更新阶段生命周期\
    [父子组件更新阶段生命周期](/React/component.html#_9-4-3-更新阶段)

```html
<div id="test"></div>
<script type="text/javascript" src="../js/react.development.js"></script>
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<script type="text/javascript" src="../js/babel.min.js"></script>
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
  class Count extends React.Component {
    constructor(props) {
      console.log("构造器---constructor")
      super(props)
    }
    state = { count: 0 }

    add = () => {
      let { count } = this.state
      console.log("点击更新组件状态")
      this.setState({ count: count + 1 })
    }
    destroy = () => {
      console.log("点击卸载组件")
      ReactDOM.unmountComponentAtNode(document.getElementById("test"))
    }
    force = () => {
      console.log("点击强制刷新组件")
      this.forceUpdate()
    }

    componentWillMount() {
      console.log("即将挂载组件---componentWillMount")
    }
    componentDidMount() {
      console.log("挂载组件完成---componentDidMount")
    }
    componentWillUnmount() {
      console.log("即将卸载组件---componentWillUnmount")
    }

    shouldComponentUpdate() {
      console.log("控制组件是否更新的阀门---shouldComponentUpdate")
      return true
    }
    componentWillUpdate() {
      console.log("即将更新组件---componentWillUpdate")
    }
    componentDidUpdate() {
      console.log("更新组件完成---componentDidUpdate")
    }

    render() {
      console.log("挂载组件---render")
      const { count } = this.state
      return (
        <div>
          <h2>Count: {count}</h2>
          <button onClick={this.add}>count+1</button>
          <button onClick={this.destroy}>销毁组件</button>
          <button onClick={this.force}>强制刷新页面</button>
        </div>
      )
    }
  }

  ReactDOM.render(<Count />, document.getElementById("test"))
</script>
```

### 9.4 父子组件生命周期(旧)

#### 9.4.1 初始化阶段

- 父---constructor
- 父---componentWillMount
- 父---render
- `子---constructor`
- `子---componentWillMount`
- `子---render`
- `子---componentDidMount`
- 父---componentDidMount

#### 9.4.2 卸载阶段

- 父---componentWillUnmount
- 子---componentWillUnmount

#### 9.4.3 更新阶段

**1.父组件内部调用`this.setState()`修改状态**

- 父---shouldComponentUpdate
- 父---componentWillUpdate
- 父---render
- `子---componentWillReceiveProps` --- 子组件多一个阶段
- `子---shouldComponentUpdate`
- `子---componentWillUpdate`
- `子---render`
- `子---componentDidUpdate`
- 父---componentDidUpdate

**2.父组件内部调用`this.forceUpdate()`强制更新**

- 父---componentWillUpdate
- 父---render
- `子---componentWillReceiveProps` --- 子组件多两个阶段
- `子---shouldComponentUpdate` --- 子组件多两个阶段
- `子---componentWillUpdate`
- `子---render`
- `子---componentDidUpdate`
- 父---componentDidUpdate

---

- 初始化阶段
  <img :src="$withBase('/React/11.png')">
- 卸载阶段
  <img :src="$withBase('/React/12.png')">
  <img :src="$withBase('/React/13.png')">
- 更新阶段
  - 1.父组件内部调用`this.setState()`修改状态
    <img :src="$withBase('/React/14.png')">
  - 2.父组件内部调用`this.forceUpdate()`强制更新
    <img :src="$withBase('/React/15.png')">

```js
class Count extends React.Component {
  constructor(props) {
    console.log("父---constructor")
    super(props)
  }
  state = { count: 0 }

  add = () => {
    let { count } = this.state
    console.log("点击更新父组件状态")
    this.setState({ count: count + 1 })
  }
  destroy = () => {
    console.log("点击卸载父组件")
    ReactDOM.unmountComponentAtNode(document.getElementById("test"))
  }
  force = () => {
    console.log("点击强制刷新父组件")
    this.forceUpdate()
  }

  componentWillMount() {
    console.log("父---componentWillMount")
  }
  componentDidMount() {
    console.log("父---componentDidMount")
  }
  componentWillUnmount() {
    console.log("父---componentWillUnmount")
  }

  componentWillReceiveProps(props) {
    console.log("父---componentWillReceiveProps")
  }

  shouldComponentUpdate() {
    console.log("父---shouldComponentUpdate")
    return true
  }
  componentWillUpdate() {
    console.log("父---componentWillUpdate")
  }
  componentDidUpdate() {
    console.log("父---componentDidUpdate")
  }

  render() {
    console.log("父---render")
    const { count } = this.state
    return (
      <div>
        <h1>---------------父组件--------------------</h1>
        <h2>Count: {count}</h2>
        <button onClick={this.add}>count+1</button>
        <button onClick={this.destroy}>销毁组件</button>
        <button onClick={this.force}>强制刷新页面</button>
        <Child />
      </div>
    )
  }
}

class Child extends React.Component {
  constructor(props) {
    console.log("子---constructor")
    super(props)
  }
  state = { count: 0 }

  add = () => {
    let { count } = this.state
    console.log("点击更新子组件状态")
    this.setState({ count: count + 1 })
  }
  force = () => {
    console.log("点击强制刷新子组件")
    this.forceUpdate()
  }

  componentWillMount() {
    console.log("子---componentWillMount")
  }
  componentDidMount() {
    console.log("子---componentDidMount")
  }
  componentWillUnmount() {
    console.log("子---componentWillUnmount")
  }

  componentWillReceiveProps(props) {
    console.log("子---componentWillReceiveProps")
  }

  shouldComponentUpdate() {
    console.log("子---shouldComponentUpdate")
    return true
  }
  componentWillUpdate() {
    console.log("子---componentWillUpdate")
  }
  componentDidUpdate() {
    console.log("子---componentDidUpdate")
  }

  render() {
    console.log("子---render")
    const { count } = this.state
    return (
      <div>
        <h1>---------------子组件--------------------</h1>
        <h2>Count: {count}</h2>
        <button onClick={this.add}>count+1</button>
        <button onClick={this.force}>强制刷新页面</button>
      </div>
    )
  }
}

ReactDOM.render(<Count />, document.getElementById("test"))
``` -->

## 10 生命周期(新)

- 废弃三个钩子：`componentWillMount` 、`componentWillReceiveProps` 、 `componentWillUpdate` 。在新版本中这三个钩子需要加 UNSAFE\_ 前缀使用，后续可能会废弃
- 新增两个钩子（实际场景用得很少）：`getDerivedStateFromProps` 、`getSnapshotBeforeUpdate`

<img :src="$withBase('/React/react生命周期(新).png')">

[static getDerivedStateFromProps(props, state)](https://zh-hans.legacy.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

- 描述
  - 需使用 `static` 修饰，静态方法
  - 需返回一个对象更新 `state` 或返回 `null`
  - 适用于如下情况：`state` 的值任何时候都取决于 `props`
- 参数
  - props/state 新的
- 返回值
  - state 对象
  - null 则不更新任何内容

[getSnapshotBeforeUpdate(prevProps, prevState)](https://zh-hans.legacy.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)

- 描述
  - 在组件更新之前获取快照
  - 在组件更新 DOM 和 refs 之前之前从 DOM 中捕获一些信息（如滚动位置）
- 参数
  - prevProps/prevState 上一次 DOM 更新时的额 props/state
- 返回值
  - 可以返回任意类型，可被`componentDidUpdate()`接收

## 11 虚拟 DOM 与 Diff 算法

### 虚拟 DOM 中 key 的作用

key 是虚拟 DOM 对象的标识，在更新显示时 key 起着极其重要的作用

当状态中的数据发生变化时，React 会根据`新数据`生成`新的虚拟 DOM` ，随后 react 进行`新虚拟 DOM`与 `旧虚拟 DOM` 的 Diff 比较，规则如下

- 旧虚拟 DOM 找到和新虚拟 DOM 相同的 key
  - 若内容没变，直接复用真实 DOM
  - 若内容改变，则生成新的真实 DOM ，替换页面中之前的真实 DOM
- 旧虚拟 DOM 未找到和新虚拟 DOM 相同的 key
  - 根据数据创建新的真实 DOM ，渲染到页面

### 使用 index 作为 key 可能引发的问题

- 若对数据进行`逆序添加、逆序删除`等破坏顺序的操作
  - 会进行没有必要的真实 DOM 更新。界面效果没问题，但效率低下
- 如果结构中包含输入类的 DOM（如 input 输入框）
  - 会产生错误的 DOM 更新
- 若`不存在`对数据逆序添加、逆序删除等破坏顺序的操作
  - 仅用于渲染列表用于展示，使用 index 作为 key 是没问题的
