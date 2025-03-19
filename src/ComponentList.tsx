import React from 'react'

import FakeComponent from '@/FakeComponent'

const ComponentList: React.FunctionComponent<{
    components: FakeComponent[],
    selectComponent(name: string): void
}> = (props) => {
    return (
        <div className='component-list'>
            {props.components.map(component => (
                <button key={component.name}
                    onClick={() => {props.selectComponent(component.name)}}
                >{component.name}</button>
            ))}
        </div>
    )
}

export default ComponentList