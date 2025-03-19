import React from 'react'

import FakeComponent, {RenderFunctionChildButton} from '@/FakeComponent'

const RenderEditorButton: React.FunctionComponent<{
    node: RenderFunctionChildButton,
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
                    if (event.target.value === 'increment-state') {
                        props.selectState(name => {
                            props.setComponent(
                                props.component.incrementState(
                                    props.index,
                                    name
                                )
                            )
                        })
                    }
                }} defaultValue={
                    props.node.action === 1 ? 'increment-state' : 'do-nothing'
                }>
                    <option value='do-nothing'>Do nothing</option>
                    <option value='increment-state'>
                        Increment state
                    </option>
                </select>
            </label>
            {typeof props.node.state === 'string' && props.node.state.length > 0 &&
                <><br />Name in state: {props.node.state}</>
            }
        </div>
    )
}

export default RenderEditorButton