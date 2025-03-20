import FakeNode from './FakeNode'
import {State, SetState} from './types'
import type FakeComponent from '.'

export default class FakeButtonNode implements FakeNode {
    static Action = {DO_NOTHING: 0, INCREMENT_STATE: 1}
    action: number = 0
    incrementStateName: string | null = null
    #component: FakeComponent
    constructor(component: FakeComponent) {
        this.#component = component
    }
    render(state: State, setState: SetState, key: number) {
        let onClick: (() => void) | undefined
        if (
            this.action === FakeButtonNode.Action.INCREMENT_STATE
        ) onClick = () => {
            const {incrementStateName: stateName} = this
            if (typeof stateName !== 'string')
                throw new Error('Failed to increment state')
            const previousValue = state[stateName]
            if (typeof previousValue !== 'number')
                throw new Error('Cannot increment non-number')
            setState({...state, [stateName]: previousValue + 1})
        }
        return <div key={key}><button onClick={onClick}>
            Button
        </button></div>
    }
    copy(component = this.#component): FakeButtonNode {
        const copy = new FakeButtonNode(component)
        copy.action = this.action
        copy.incrementStateName = this.incrementStateName
        return copy
    }
    incrementState(name: string): FakeComponent {
        const copy = this.copy()
        copy.action = FakeButtonNode.Action.INCREMENT_STATE
        copy.incrementStateName = name
        return this.#component.updateChild(this, copy)
    }
    doNothing(): FakeComponent {
        const copy = this.copy()
        copy.action = FakeButtonNode.Action.DO_NOTHING
        copy.incrementStateName = null
        return this.#component.updateChild(this, copy)
    }
    remove(): FakeComponent {
        return this.#component.removeFromRender(this)
    }
}