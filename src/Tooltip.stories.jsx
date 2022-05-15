import { Tooltip } from './Tooltip'

export default {
  title: 'Tooltip',
  component: Tooltip,
}

const Template = args => (
  <Tooltip {...args}>
    <button type="button">Focus or hover over me</button>
  </Tooltip>
)

export const Default = Template.bind({})
Default.args = {
  title: "I'm a tooltip triggered by default behavior (hover, or focus)!",
}
