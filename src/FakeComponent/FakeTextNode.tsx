import FakeNode from './FakeNode'
import {State, SetState} from './types'
import type FakeComponent from '.'

export default class FakeTextNode implements FakeNode {
    text: string = 'Text'
    boundStateName: string | null = null
    #component: FakeComponent
    constructor(component: FakeComponent) {
        this.#component = component
    }
    render(state: State, _setState: SetState, key: number) {
        let text: string = ''
        const {boundStateName} = this
        if (typeof boundStateName === 'string') {
            const stateText = state[boundStateName]
            if (typeof stateText === 'string')
                text = stateText
            else if (typeof stateText === 'number')
                text = String(stateText)
        } else text = this.text
        return <div key={key}>{text}</div>
    }
    copy(component = this.#component): FakeTextNode {
        const copy = new FakeTextNode(component)
        copy.text = this.text
        copy.boundStateName = this.boundStateName
        return copy
    }
    bindToState(name: string): FakeComponent {
        const copy = this.copy()
        copy.boundStateName = name
        return this.#component.updateChild(this, copy)
    }
    unbind(): FakeComponent {
        const copy = this.copy()
        copy.boundStateName = null
        return this.#component.updateChild(this, copy)
    }
    get isBound() {
        return typeof this.boundStateName === 'string'
    }
    remove(): FakeComponent {
        return this.#component.removeFromRender(this)
    }
}