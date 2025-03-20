'use client'

import React from 'react'

import FakeComponent from '@/FakeComponent'
import ComponentEditor from '@/ComponentEditor'
import ComponentList from '@/ComponentList'
import Result from '@/Result'

export default class Home extends React.Component<{}, {
  components: FakeComponent[],
  selectedComponentName: string
}> {
  constructor(props: {}) {
    super(props)
    this.state = {
      components: [new FakeComponent('Root')],
      selectedComponentName: 'Root'
    }
  }
  #getSelectedComponent(): FakeComponent {
    for (const component of this.state.components)
      if (component.name === this.state.selectedComponentName)
        return component
    throw new Error('Could not find selected component')
  }
  #setSelectedComponent = (component: FakeComponent): void => {
    const components = [...this.state.components]
    for (let i = 0; i < components.length; i++)
      if (components[i].name === this.state.selectedComponentName) {
        components[i] = component
        this.setState({components})
        return
      }
  }
  #selectComponent = (name: string): void => {
    this.setState({selectedComponentName: name})
  }
  render() {
    return (
      <div className='page'>
        <ComponentList
          components={this.state.components}
          selectComponent={this.#selectComponent}
        />
        <ComponentEditor
          component={this.#getSelectedComponent()}
          setComponent={this.#setSelectedComponent}
        />
        <Result components={this.state.components} />
      </div>
    )
  }
}