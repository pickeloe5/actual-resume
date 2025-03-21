import React from 'react'

import FakeComponent from '@/FakeComponent'
import FakeTextNode from '@/FakeComponent/FakeTextNode'
import FakeButtonNode from '@/FakeComponent/FakeButtonNode'
import RenderEditorText from './RenderEditorText'
import RenderEditorButton from './RenderEditorButton'

export default class RenderEditor extends React.Component<{
    component: FakeComponent,
    setComponent(component: FakeComponent): void,
    selectState(callback: (name: string) => void): void
}> {
    #onClickAddText = () => {
        this.props.setComponent(this.props.component.addText())
    }
    #onClickAddButton = () => {
        this.props.setComponent(this.props.component.addButton())
    }
    render() {
        return <>
            <b>Render Function</b><br />
            <button onClick={this.#onClickAddText}>Add text</button><br />
            <button onClick={this.#onClickAddButton}>Add button</button><br />
            {this.props.component.renderFunction.map((it, index) => {
                if (
                    it instanceof FakeTextNode
                ) return <RenderEditorText key={index} index={index} node={it}
                    component={this.props.component}
                    setComponent={this.props.setComponent}
                    selectState={this.props.selectState}
                />
                if (
                    it instanceof FakeButtonNode
                ) return <RenderEditorButton key={index} index={index} node={it}
                    component={this.props.component}
                    setComponent={this.props.setComponent}
                    selectState={this.props.selectState}
                />
            })}
        </>
    }
}