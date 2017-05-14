import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormControl, Checkbox, Select } from 'rctui'
import lengthLimit from './lengthLimit'
import DataSource from './DataSource'

const dataType = [
  'bool',
  'date',
  'datetime',
  'enum',
  'integer',
  'number',
  'text',
]

class Field extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.field.type,
    }

    this.handleTypeChange = this.handleTypeChange.bind(this)
  }

  handleTypeChange(type) {
    this.setState({ type })
  }

  render() {
    const { code, index, exist, field, onSubmit, schemas } = this.props
    const { type } = this.state

    return (
      <Form labelWidth="7rem" data={field} onSubmit={onSubmit}>
        <FormControl
          name="name" required type="alphanum" max={20} label="字段名"
          validator={
            (value) => {
              const reg = /^[a-z0-9_]+$/i
              if (!reg.test(value)) {
                return new Error('name 只能由英文字符、数字、下划线组成')
              } else if (value.length > 20) {
                return new Error('name 不能超过20个字符')
              }
              return exist(index, value) ? new Error(`${value} 已经存在`) : true
            }
          }
        />

        <FormControl name="label" type="text" max={20} label="别名/标签" />

        <FormControl>
          <Checkbox name="required">必填</Checkbox>
          {' '}
          <Checkbox name="unique">唯一</Checkbox>
        </FormControl>

        <FormControl label="类型">
          <Select name="type" required onChange={this.handleTypeChange} grid={1 / 2} data={[...dataType]} />
        </FormControl>

        {lengthLimit(type)}

        <DataSource code={code} schemas={schemas} />

        {/*
        <FormControl name="defaultValue" label="默认值" type="textarea" rows={3} />
        */}
      </Form>
    )
  }
}

Field.propTypes = {
  code: PropTypes.string,
  exist: PropTypes.func,
  field: PropTypes.object,
  index: PropTypes.number,
  onSubmit: PropTypes.func,
  schemas: PropTypes.array,
}

Field.defaultProps = {
  field: {},
}

export default Field
