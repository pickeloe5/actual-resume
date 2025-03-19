import React from 'react'

import FakeComponent, {StateChild} from '@/FakeComponent'

export default class StateEditor extends React.Component<{
    component: FakeComponent,
    setComponent(component: FakeComponent): void,
    isSelecting: boolean,
    onSelected: (name: string) => void
}> {
    #onClickAddNumber = () => {
        const name = prompt('Please enter name of new variable in state.')
        if (typeof name !== 'string' || name.length <= 0)
            return;
        this.props.setComponent(
            this.props.component.addState(name, StateChild.Kind.NUMBER)
        )
    }
    render() {
        return (
            <div className={this.props.isSelecting ? 'selecting' : undefined}>
                <b>State</b><br />
                <button onClick={this.#onClickAddNumber}>
                    Add number
                </button> <br />
                {this.props.component.state.map(it => {
                    if (this.props.isSelecting) return (
                        <button key={it.name} onClick={() => {
                            this.props.onSelected(it.name)
                        }}>{it.name}</button>
                    )
                    return <div key={it.name}>{it.name}</div>
                })}
            </div>
        )
    }
}