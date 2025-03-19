import React from 'react'
import FakeComponent from '@/FakeComponent'
import StateEditor from './StateEditor'
import RenderEditor from './RenderEditor'

export default class ComponentEditor extends React.Component<{
    component: FakeComponent,
    setComponent(component: FakeComponent): void
}, {isSelectingState: boolean}> {
    #onSelectedStateCallback: ((name: string) => void) | null = null
    constructor(props: ComponentEditor['props']) {
        super(props)
        this.state = {isSelectingState: false}
    }
    #selectState = (callback: (name: string) => void) => {
        this.#onSelectedStateCallback = callback
        this.setState({isSelectingState: true})
    }
    #onSelectedState = (name: string) => {
        this.setState({isSelectingState: false})
        if (!this.#onSelectedStateCallback)
            throw new Error('Invalid state selection callback')
        this.#onSelectedStateCallback(name)
    }
    render () {
        return (
            <div className='component-editor'>
                <StateEditor component={this.props.component}
                    setComponent={this.props.setComponent}
                    isSelecting={this.state.isSelectingState}
                    onSelected={this.#onSelectedState}
                />
                <br />
                <RenderEditor component={this.props.component}
                    setComponent={this.props.setComponent}
                    selectState={this.#selectState}
                />
            </div>
        )
    }
}