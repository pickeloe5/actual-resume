import React from 'react'
import FakeComponent from '@/FakeComponent'
import StateEditor from './StateEditor'
import RenderEditor from './RenderEditor'

export default class ComponentEditor extends React.Component<{
    component: FakeComponent,
    setComponent(component: FakeComponent): void
}, {onSelectedState: ((name: string) => void) | null}> {
    constructor(props: ComponentEditor['props']) {
        super(props)
        this.state = {onSelectedState: null}
    }
    render () {
        return (
            <div className='component-editor'>
                <StateEditor component={this.props.component}
                    setComponent={this.props.setComponent}
                    onSelectedState={this.state.onSelectedState}
                />
                <br />
                <RenderEditor component={this.props.component}
                    setComponent={this.props.setComponent}
                    selectState={callback => {
                        this.setState({onSelectedState: name => {
                            callback(name)
                            this.setState({onSelectedState: null})
                        }})
                    }}
                />
            </div>
        )
    }
}