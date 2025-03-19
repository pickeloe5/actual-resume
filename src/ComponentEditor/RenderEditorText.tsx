import React from 'react'

import FakeComponent, {RenderFunctionChildText, RenderFunctionChildButton} from '@/FakeComponent'

const RenderEditorText: React.FunctionComponent<{
    node: RenderFunctionChildText,
    index: number,
    component: FakeComponent,
    setComponent(component: FakeComponent): void,
    selectState(callback: (name: string) => void): void
}> = props => {
    return (
        <div className='card'>
            Text<br />
            {typeof props.node.state === 'string' && <>
                Bound to state: '{props.node.state}'
                <br />
            </>}
            <button onClick={() => {
                props.setComponent(props.component.removeFromRender(props.index))
            }}>Remove</button> <br />
            {typeof props.node.state === 'string'
                ? <button onClick={() => {
                    props.setComponent(props.component.unbind(props.index))
                }}>
                    Unbind from state
                </button>
                : <button onClick={() => {
                    props.selectState(name => {
                        props.setComponent(props.component.bindToState(props.index, name))
                    })
                }}>
                    Bind to state
                </button>
            }
        </div>
    )
}

export default RenderEditorText