import { Tooltip } from './Tooltip'

export default {
  title: 'Tooltip',
  component: Tooltip,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const ToggleByFocusOrHover = args => (
  <Tooltip {...args}>
    <button type="button">Focus or hover over me</button>
  </Tooltip>
)
ToggleByFocusOrHover.args = {
  title: "I'm a tooltip triggered by default behavior (hover, or focus)!",
  placement: 'bottom',
}

export const ToggleManually = args => (
  <Tooltip {...args}>
    {({ visible, toggle }) => (
      <button type="button" onClick={() => toggle()}>
        {visible ? 'Hide tooltip' : 'Show tooltip'}
      </button>
    )}
  </Tooltip>
)
ToggleManually.args = {
  title: "I'm a tooltip that can be controlled manually!",
  placement: 'bottom',
  manual: true,
}
