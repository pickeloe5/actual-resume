import React from 'react'

import FakeComponent from '@/FakeComponent'

const Result: React.FunctionComponent<{
    components: FakeComponent[]
}> = (props) => {
    let root = null
    for (const component of props.components)
        if (component.name === 'Root') {
            root = component
            break
        }
    return (
        <div className='result'>
            {root ? <root.FunctionComponent /> : <div>No root</div>}
        </div>
    )
}

export default Result