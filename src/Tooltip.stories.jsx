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
ToggleByFocusOrHover.parameters = {
  docs: {
    source: {
      code: `
<Tooltip title="I'm a tooltip triggered by default behavior (hover, or focus)!">
  <button type="button">Focus or hover over me</button>
</Tooltip>
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}

export const ToggleManually = args => (
  <Tooltip {...args}>
    {({ visible, toggle }) => (
      <button type="button" onClick={() => toggle()} aria-pressed={visible}>
        Toggle Tooltip
      </button>
    )}
  </Tooltip>
)
ToggleManually.args = {
  title: "I'm a tooltip that can be controlled manually!",
  placement: 'bottom',
  manual: true,
}
ToggleManually.parameters = {
  docs: {
    source: {
      code: `
<Tooltip title="I'm a tooltip that can be controlled manually!">
  {({ visible, toggle }) => (
    <button type="button" onClick={() => toggle()} aria-pressed={visible}>
      Toggle Tooltip
    </button>
  )}
</Tooltip>
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}
