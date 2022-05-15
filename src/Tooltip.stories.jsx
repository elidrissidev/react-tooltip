import { Tooltip } from './Tooltip'

export default {
  title: 'Tooltip',
  component: Tooltip,
}

const Template = args => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
    <Tooltip {...args}>
      <button type="button">Focus or hover over me</button>
    </Tooltip>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  title: "I'm a tooltip triggered by default behavior (hover, or focus)!",
}
