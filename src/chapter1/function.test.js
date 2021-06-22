import React from 'react'
import { render } from '@testing-library/react'

const Title = ({ text }) => (
  <h1 data-testid="test">{text}</h1>
)

const renderComponent = (Component) => {
  const u = render(Component)
  const el = u.getByTestId('test')
  return { el, body: el.textContent }
}
 
describe('Functional Component', () => {
  test('print Hello World', () => {
    const Comp = () => <div data-testid="test">Hello World</div>
    const { body } = renderComponent(<Comp />)
    expect(body).toBe("Hello World")
  })

  test('render with prop', () => {
    const { body } = renderComponent(<Title text="Chapter 1" />)
    expect(body).toBe("Chapter 1")
  })

  test('render with object prop', () => {
    const App = ({ obj }) => <div data-testid="test">{obj.title}</div>
    const { body } = renderComponent(<App obj={{ title: "Hello World"}} />)
    expect(body).toBe("Hello World")
  })

  test('render with function prop', () => {
    const App = ({ debug }) => (<div>{debug()}</div>)
    const fn = jest.fn()
    render(<App debug={fn} />)
    expect(fn).toBeCalled()
  })

  test('render with constant', () => {
    const defaultTitle = "Hello World"
    const App = () => {
      return <Title text={defaultTitle} />
    }    
    const { body } = renderComponent(<App />)
    expect(body).toBe("Hello World")
  })

  test('pass prop to grand child', () => {
    const UserProfile = ({ name }) => {
      return <Title text={name} />
    }
    const App = () => {
      return <UserProfile name="Fang" />
    }
    const { body } = renderComponent(<App />)
    expect(body).toBe("Fang")
  })


})
