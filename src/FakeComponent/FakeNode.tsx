import {State, SetState} from './types'
import type FakeComponent from '.'

export default interface FakeNode {
    render(state: State, setState: SetState, key: number): React.ReactNode
    copy(component?: FakeComponent): FakeNode
    remove(): FakeComponent
}