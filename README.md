# react-tooltip

This library provides a simple Tooltip component that can be used to provide contextual description for an element upon hover or keyboard focus or manually.

## Usage

The simplest way to use this Tooltip component is by wrapping it around a target component:

```jsx
import { Tooltip } from './Tooltip'

function TooltippedLink() {
  return (
    <Tooltip title="You have no unread notifications">
      <a href="/notifications">Notifications</a>
    </Tooltip>
  )
}
```

Tooltip is toggled by hovering over the target element or focusing with the keyboard

The tooltip is positioned at the `bottom` of the target element by default, but you may customize that using the [`placement`](#available-options) prop:

```diff
  return (
-    <Tooltip title="You have no unread notifications">
+    <Tooltip title="You have no unread notifications" placement="right">
      <a href="/notifications">Notifications</a>
```

There may be situations where full control over the tooltip is preferred, for example if you want to toggle tooltip visibility with a button rather than show it on hover and focus. In this case, you may supply a function as a `children` prop to receive an object as a parameter containing the visibility state and a function to toggle it on or off:

```jsx
import { Tooltip } from './Tooltip'

function HelpButton(props) {
  return (
    <Tooltip title={props.description} manual>
      {({ visible, toggle }) => (
        <button type="button" onClick={() => toggle()} aria-pressed={visible}>
          <span className="sr-only">Help</span>
          <svg>...</svg>
        </button>
      )}
    </Tooltip>
  )
}
```

The `toggle` function can be used to both _toggle_ tooltip visibility as well as show/hide it by calling it with a parameter `toggle(true/false)`.
 
If you take control of toggling tooltip visibility yourself, then be sure to also set the boolean prop `manual` to disable showing it on hover or focus.

## Available options

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | ❌ | ✅ | The text to show in the tooltip |
| `placement` | `string` | `bottom` | ❌ | Tooltip placement relative to the target element. Possible values: `left`, `top-left`, `top`, `top-right`, `right`, `bottom-left`, `bottom`, `bottom-right` |
| `manual` | `boolean` | `false` | ❌ | Whether to control the tooltip manually or show on hover/focus |
| `noDelay` | `boolean` | `false` | ❌ | Disable the delay of 200ms before showing the tooltip |
| `children` | `function` or `string` or `ReactNode` | ❌ | ✅ | The target element for the tooltip. If its a function, it acts as a render prop and receives the following object as a parameter: `{ visible: boolean, toggle: (value?: boolean) => void }` |

## Caveats

This component does not support automatic positioning so you'll have to make sure to set its `position` such that the tooltip is always shown within the viewport, otherwise the content may overflow and you'll see those ugly horizontal scroll bars.
