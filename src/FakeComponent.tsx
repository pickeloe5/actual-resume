import React from 'react'

type State = Record<string, unknown>
type ChildRender = (
    state: State,
    setState: (state: State) => void,
    key: number
) => React.ReactNode

export class RenderFunctionChild {
    render: ChildRender = (_state, _setState, _key) => {
        return null
    }
    copy(): RenderFunctionChild {
        return new RenderFunctionChild()
    }
    bindToState(_name: string): RenderFunctionChild {
        return this.copy()
    }
    unbind(): RenderFunctionChild {
        return this.copy()
    }
    incrementState(_name: string): RenderFunctionChild {
        return this.copy()
    }
}

export class RenderFunctionChildText extends RenderFunctionChild {
    text: string = 'Text'
    state: string | null = null
    render: ChildRender = (state, _setState, key) => {
        let text: string = ''
        if (typeof this.state === 'string') {
            const stateText = state[this.state]
            if (typeof stateText === 'string')
                text = stateText
            else if (typeof stateText === 'number')
                text = String(stateText)
        } else text = this.text
        return <div key={key}>{text}</div>
    }
    copy(): RenderFunctionChildText {
        const copy = new RenderFunctionChildText()
        copy.text = this.text
        copy.state = this.state
        return copy
    }
    bindToState(name: string): RenderFunctionChildText {
        const copy = this.copy()
        copy.state = name
        return copy
    }
    unbind(): RenderFunctionChildText {
        const copy = this.copy()
        copy.state = null
        return copy
    }
}

export class RenderFunctionChildButton extends RenderFunctionChild {
    static Action = {INCREMENT_STATE: 1}
    action: number = 0
    state: string = ''
    render: ChildRender = (state, setState, key) => {
        return <div key={key}><button onClick={() => {
            const updatedState = {...state}
            const previousValue = state[this.state]
            if (typeof previousValue === 'number')
                updatedState[this.state] = previousValue + 1
            setState(updatedState)
        }}>Button</button></div>
    }
    copy(): RenderFunctionChildButton {
        const copy = new RenderFunctionChildButton()
        copy.action = this.action
        copy.state = this.state
        return copy
    }
    incrementState(name: string): RenderFunctionChildButton {
        const copy = this.copy()
        copy.action = RenderFunctionChildButton.Action.INCREMENT_STATE
        copy.state = name
        return copy
    }
}

export class StateChild {
    static Kind = {NUMBER: 1}
    name: string = ''
    kind: number = 0
    constructor(name: string, kind: number) {
        this.name = name
        this.kind = kind
    }
}

export default class FakeComponent {
    name: string = ''
    renderFunction: RenderFunctionChild[] = []
    state: StateChild[] = []
    stateValue: State = {}
    constructor(name: string) {
        this.name = name
    }
    #copy() {
        const component = new FakeComponent(this.name)
        component.renderFunction = [...this.renderFunction]
        component.state = [...this.state]
        component.stateValue = {...this.stateValue}
        return component
    }
    FunctionComponent = () => {
        const [state, setState] = React.useState(this.stateValue)
        return <div>{this.renderFunction.map((it, index) =>
            it.render(state, setState, index)
        )}</div>
    }
    addText() {
        const component = this.#copy()
        component.renderFunction.push(new RenderFunctionChildText())
        return component
    }
    addButton() {
        const component = this.#copy()
        component.renderFunction.push(new RenderFunctionChildButton())
        return component
    }
    addState(name: string, kind: number) {
        const component = this.#copy()
        component.state.push(new StateChild(name, kind))
        if (kind === StateChild.Kind.NUMBER)
            component.stateValue[name] = 0
        return component
    }
    removeFromRender(index: number) {
        const component = this.#copy()
        component.renderFunction.splice(index, 1)
        return component
    }
    bindToState(index: number, name: string) {
        const component = this.#copy()
        component.renderFunction[index] =
            component.renderFunction[index].bindToState(name)
        return component
    }
    unbind(index: number) {
        const component = this.#copy()
        component.renderFunction[index] =
            component.renderFunction[index].unbind()
        return component
    }
    incrementState(index: number, name: string) {
        const component = this.#copy()
        component.renderFunction[index] =
            component.renderFunction[index].incrementState(name)
        return component
    }
}