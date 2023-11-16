# react+typescript

## 一、父子组件间 refs

### 1.1 类式组件使用 ref

#### 1.1.1 React.createRef

`createRef`只能用在类式子组件

```jsx{2,6,8,16}
class Parent extends Component<any, any> {
  ChildRef = React.createRef<Child>()

  test = () => {
    // 调用子组件方法
    ;(this.ChildRef.current as Child).show()

    this.ChildRef.current?.showModal()
  }

  render() {
    return (
      <>
        <button onClick={this.test} ></button>
        {/* 绑定ref */}
        <Child ref={this.ChildRef} />
      </>
    )
  }
}

class Child extends Component {
  show = () => {
    console.log('show')
  }
  render(): React.ReactNode {
    return (
      <></>
    )
  }
}
```

#### 1.1.2 回调 ref

与 React.createRef()一样，就是定义 ref 的方式不同

```jsx{2,6,8,16}
class Parent extends Component<any, any> {
  ChildRef: Child | null = null

  test = () => {
    // 调用子组件方法
    this.ChildRef?.showModal()

    ;(this.ChildRef as Child).showModal()
  }

  render() {
    return (
      <>
        <button onClick={this.test} ></button>
        {/* 绑定ref */}
        <Child ref={(element) => (this.ChildRef = element)} />
      </>
    )
  }
}

class Child extends Component {
  show = () => {
    console.log('show')
  }
  render(): React.ReactNode {
    return (
      <></>
    )
  }
}
```

#### 1.1.3 使用 props 自定义 onRef 属性

需要自定义 props 属性

```jsx{2,6,8,16,22-24,29-32}
class Parent extends Component<any, any> {
  ChildRef: Child | null = null

  test = () => {
    // 调用子组件方法
    this.ChildRef?.showModal()

    ;(this.ChildRef as Child).showModal()
  }

  render() {
    return (
      <>
        <button onClick={this.test} ></button>
        {/* 将参数绑定给 当前组件的ChildRef */}
        <Child ref={(node) => (this.ChildRef = node)} />
      </>
    )
  }
}

interface IProp {
  onRef: (ref: Child) => void
}
class Child extends Component<IProp> {
  show = () => {
    console.log('show')
  }
  componentDidMount(): void {
    // 调用父组件传入的onRef函数，并将 当前实例 传递给onRef的参数
    this.props.onRef && this.props.onRef(this)
  }
  render(): React.ReactNode {
    return (
      <></>
    )
  }
}
```

### 1.2 函数式组件使用 ref

#### 1.2.1 forwardRef + useImperativeHandle

- `forwardRef` 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中
- `useImperativeHandle` 可以让你在使用 ref 时自定义暴露给父组件的实例值

```jsx{1-3,6,18,26,36,43,45-49}
interface ChildRef {
  showModal: () => void
}
// 类式
class Parent extends Component<any, any> {
  ChildRef = React.createRef()

  test = () => {
    // 调用子组件方法
    ;(this.ChildRef.current as ChildRef).show()
  }

  render() {
    return (
      <>
        <button onClick={this.test} ></button>
        {/* 绑定ref */}
        <Child ref={this.ChildRef} />
      </>
    )
  }
}

// 函数式
const Parent = () => {
  const ChildRef = React.useRef<ChildRef | null>(null)
  const test = () => {
    // 调用子组件方法
    ChildRef.current!.show()
  }

  return (
    <>
      <button onClick={this.test} ></button>
      {/* 绑定ref */}
      <Child ref={this.ChildRef} />
    </>
  )
}

import { forwardRef, useImperativeHandle } from 'react'
import { ForwardedRef } from 'react'
const Child = forwardRef((props, ref:ForwardedRef<ChildRef>) => {

  useImperativeHandle(ref, () => {
    return {
      show
    }
  })

  const show = () => {
    console.log('show')
  }

  return <></>
})
```

#### 1.2.2 自定义 props + useImperativeHandle

```jsx{1-3,5-6,10-11,19,26-31,33-37}
interface ChildRef {
  showModal: () => void
}
class Parent extends Component<any, any> {
  ChildRef = React.createRef<ChildRef>()
  ChildRef: RefObject<ChildRef> = React.createRef()

  test = () => {
    // 调用子组件方法
    ;(this.ChildRef.current as ChildRef).show()
    this.ChildRef.current!.showModal()
  }

  render() {
    return (
      <>
        <button onClick={this.test} ></button>
        {/* 绑定props */}
        <Child onRef={this.ChildRef} />
      </>
    )
  }
}


interface ChildRef {
  showModal: () => void
}
interface IProp {
  onRef: RefObject<ChildRef>
}
const Child = (props:IProp) => {
  useImperativeHandle(props.onRef, () => {
    return {
      show
    }
  })

  const show = () => {
    console.log('show')
  }

  return <></>
}
```

### 1.3 父组件访问子组件中的 ref

- 方法一: 直接获取子组件中的元素

```jsx
const parent = () => {
  const childRef = useRef<HTMLDivElement>()
  useEffect(() => {
    console.log(childRef.current?.offsetHeight)
  }, [childRef.current])

  return (
    <>
      <Child ref={childRef as React.Ref<HTMLDivElement>} />
    </>
  )
}

const child = React.forwardRef((props: any, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div>
      <div ref={ref}>child</div>
    </div>)
})
```

- 方法二: 将子组件中的元素抛出

```jsx
interface DetailHeaderRef {
  rootDiv: HTMLDivElement
}

const parent = () => {
  const childRef = useRef<DetailHeaderRef | null>(null)
  useEffect(() => {
    if (childRef.current && childRef.current.rootDiv) {
      console.log(childRef.current!.rootDiv)
      console.log(childRef.current!.rootDiv.offsetHeight)
    }
  }, [childRef.current])

  return (
    <>
      <Child ref={childRef} />
    </>
  )
}

const child = React.forwardRef((props: any, ref: React.ForwardedRef<DetailHeaderRef>) => {
  // ForwardedRef 可以换成Ref
  const rootRef = React.useRef<HTMLDivElement>()
  React.useImperativeHandle(ref, () => {
    return {
      rootDiv: rootRef.current as HTMLDivElement
    }
  })
  return (
    <div>
      <div ref={rootRef as React.ForwardedRef<HTMLDivElement>}>child</div>
    </div>)
})
```

## 二、定时器的使用

### 2.1 基本使用

```jsx{2,5-12,15-18}
function Time() {
  let [checkQrTimer, setCheckOrTimer] = useState'<'NodeJS.Timer | null'>'(null)

  const startTimer = () => {
    const timer = setInterval(() => {
      if (/* 定时器内关闭定时器 */) {
        stopTimer(timer)
      } else {
        // ...
      }
    }, 1000)
    setCheckOrTimer(timer)
  }

  const stopTimer = (id = checkQrTimer) => {
    clearInterval(id as NodeJS.Timer) // 关闭定时器
    setCheckOrTimer(null) // 清除定时器 ID
  }

  return (
    <div>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
    </div>
  )
}
```

### 2.2 定时器 + setState

```jsx{4-13}
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
