import { PropTypes } from 'react'
import { FormControl, Checkbox, Input, RadioGroup } from 'rctui'

function DataSource (props, context) {
  const { type, sourceType, mult } = context.formData
  const { code } = props

  let cols = {}
  props.schemas.forEach(s => {
    if (s.code !== code) cols[s.code] = s.name
  })

  if (['enum'].indexOf(type) < 0) return <span />

  return (
    <div>
      <FormControl>
        <Checkbox name="mult">多选</Checkbox>
        {
          mult &&
          <label style={{margin: 0}}>
            <span style={{verticalAlign: 'middle'}}>分割符</span>&nbsp;<Input style={{width: 60}} type="text" name="sep" />
          </label>
        }
      </FormControl>

      <FormControl required defaultValue="1" type="radio-group" name="sourceType" data={[
        { id: 'json', text: '静态数据' },
        { id: 'ref', text: '关联表' }
        // { id: 'url', text: '远程' }
      ]} />

      {
        sourceType === 'json' &&
        <FormControl key="sourceJson" label="数据选项" required type="json" name="sourceJson" rows={5} />
      }

      {
        sourceType === 'ref' &&
        <FormControl key="sourceRef" grid={1 / 2} label="Collection" name="sourceRef" required data={cols} type="select" />
      }

      {
        sourceType === 'ref' &&
        <FormControl label="数据类型">
          <RadioGroup name="renderType" data={['json', 'graphql']} defaultValue="json" />
        </FormControl>
      }

      {
        sourceType === 'url' &&
        <FormControl key="sourceUrl" grid={1} required label="数据地址" type="text" name="sourceUrl" />
      }

      <FormControl label="ValueTpl" grid={1} type="text" name="valueTpl" />

      <FormControl label="OptionTpl" grid={1} type="text" name="optionTpl" />
    </div>
  )
}

DataSource.propTypes = {
  code: PropTypes.string,
  schemas: PropTypes.array
}

DataSource.contextTypes = {
  formData: PropTypes.object
}

export default DataSource