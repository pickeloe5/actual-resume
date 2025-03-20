import React from 'react'

import FakeComponent from '@/FakeComponent'

const Result: React.FunctionComponent<{
    components: FakeComponent[]
}> = (props) => {
    let Root = null
    for (const Component of props.components)
        if (Component.name === 'Root') {
            Root = Component
            break
        }
    return (
        <div className='result'>
            {Root ? <Root.FunctionComponent /> : 'No root'}
        </div>
    )
}

export default Result