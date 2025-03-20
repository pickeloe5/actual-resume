import React from 'react'

import FakeComponent from '@/FakeComponent'
import FakeTextNode from '@/FakeComponent/FakeTextNode'

const RenderEditorText: React.FunctionComponent<{
    node: FakeTextNode,
    index: number,
    component: FakeComponent,
    setComponent(component: FakeComponent): void,
    selectState(callback: (name: string) => void): void
}> = props => {
    return (
        <div className='card'>
            Text<br />
            {props.node.isBound && <>
                Bound to state: '{props.node.boundStateName}'
                <br />
            </>}
            <button onClick={() => {
                props.setComponent(props.node.remove())
            }}>Remove</button> <br />
            {props.node.isBound
                ? <button onClick={() => {
                    props.setComponent(props.node.unbind())
                }}>
                    Unbind from state
                </button>
                : <button onClick={() => {
                    props.selectState(name => {
                        props.setComponent(props.node.bindToState(name))
                    })
                }}>
                    Bind to state
                </button>
            }
        </div>
    )
}

export default RenderEditorText