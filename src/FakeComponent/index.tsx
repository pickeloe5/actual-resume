import React from 'react'

import FakeNode from './FakeNode'
import FakeTextNode from './FakeTextNode'
import FakeButtonNode from './FakeButtonNode'
import {State} from './types'

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
    renderFunction: FakeNode[] = []
    state: StateChild[] = []
    constructor(name: string) {
        this.name = name
    }
    FunctionComponent = () => {
        const [state, setState] = React.useState(this.getDefaultState())
        return <div>{this.renderFunction.map((it, index) =>
            it.render(state, setState, index)
        )}</div>
    }
    addState(name: string, kind: number) {
        const component = this.#copy()
        component.state.push(new StateChild(name, kind))
        return component
    }
    addText() {
        const component = this.#copy()
        component.renderFunction.push(new FakeTextNode(component))
        return component
    }
    addButton() {
        const component = this.#copy()
        component.renderFunction.push(new FakeButtonNode(component))
        return component
    }
    removeFromRender(node: FakeNode) {
        for (let i = 0; i < this.renderFunction.length; i++) {
            if (this.renderFunction[i] === node) {
                const component = this.#copy()
                component.renderFunction.splice(i, 1)
                return component
            }
        }
        throw new Error('Failed to remove from render function')
    }
    updateChild(child: FakeNode, updatedChild: FakeNode) {
        const component = this.#copy()
        for (let i = 0; i < this.renderFunction.length; i++)
            if (this.renderFunction[i] === child) {
                component.renderFunction[i] = updatedChild.copy(component)
                return component
            }
        throw new Error('Failed to update render function')
    }
    #copy() {
        console.log('component copied')
        const component = new FakeComponent(this.name)
        component.renderFunction = this.renderFunction.map(
            it => it.copy(component)
        )
        component.state = [...this.state]
        return component
    }
    getDefaultState() {
        const state: State = {}
        for (const child of this.state)
            if (child.kind === StateChild.Kind.NUMBER)
                state[child.name] = 0
        return state
    }
}