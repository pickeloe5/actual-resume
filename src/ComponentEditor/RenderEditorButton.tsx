import React from 'react'

import FakeComponent from '@/FakeComponent'
import FakeButtonNode from '@/FakeComponent/FakeButtonNode'

const RenderEditorButton: React.FunctionComponent<{
    node: FakeButtonNode,
    index: number,
    component: FakeComponent,
    setComponent(component: FakeComponent): void,
    selectState(callback: (name: string) => void): void
}> = props => {
    return (
        <div className='card'>
            Button<br />
            <label>
                On click:
                <select onChange={event => {
                    const action = parseInt(event.target.value)
                    if (action === FakeButtonNode.Action.INCREMENT_STATE) {
                        props.selectState(name => {
                            props.setComponent(props.node.incrementState(name))
                        })
                    } else if (action === FakeButtonNode.Action.DO_NOTHING) {
                        props.setComponent(props.node.doNothing())
                    }
                }} defaultValue={props.node.action}>
                    <option value={String(FakeButtonNode.Action.DO_NOTHING)}>
                        Do nothing
                    </option>
                    <option value={String(FakeButtonNode.Action.INCREMENT_STATE)}>
                        Increment state
                    </option>
                </select>
            </label>
            {typeof props.node.incrementStateName === 'string' &&
                <><br />Name in state: '{props.node.incrementStateName}'</>
            }
        </div>
    )
}

export default RenderEditorButton