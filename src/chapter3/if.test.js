import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

const CurrentComponent = { hooks: {} }

function getHook(id) {
  const c = CurrentComponent
  if (c.hooks[id] === undefined) 
    c.hooks[id] = {}
  return c.hooks[id]
}

function _hook(initialValue) {
  const c = CurrentComponent
  const h = getHook(c.hookId++)          // 1
  if (h.value === undefined) {           // 2
    h.value = initialValue
  }
  return h.value     										 // 3
}

describe('Hook Basics - if', () => {
  beforeEach(() => {
    CurrentComponent.hooks = {}
  })
  test('wrong for showIcon T/F', async () => {
    const Title = ({ showIcon, log, r }) => {
      let text = "*"
      if (showIcon) {
        text = _hook("A")
      }
      const text2 = _hook("B")

      r()
      log(text, text2)
      return <h1 data-testid="test">{text}{text2}</h1>
    }    
    
    const log = jest.fn(), r = jest.fn()
  
    // first render
    CurrentComponent.hookId = 0
    const {rerender} = render(<Title showIcon={true} log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(1)
    expect(log).toHaveBeenLastCalledWith("A", "B")

    // second render
    CurrentComponent.hookId = 0
    rerender(<Title showIcon={false} log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(2)
    expect(log).toHaveBeenLastCalledWith("*", "A")
  })
 
  test('wrong for showIcon F/T', async () => {
    const Title = ({ showIcon, log, r }) => {
      let text = "*"
      if (showIcon) {
        text = _hook("A")
      }
      const text2 = _hook("B")

      r()
      log(text, text2)
      return <h1 data-testid="test">{text}{text2}</h1>
    }    
    
    const log = jest.fn(), r = jest.fn()
  
    // first render
    CurrentComponent.hookId = 0
    const {rerender} = render(<Title showIcon={false} log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(1)
    expect(log).toHaveBeenLastCalledWith("*", "B")

    // second render
    CurrentComponent.hookId = 0
    rerender(<Title showIcon={true} log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(2)
    expect(log).toHaveBeenLastCalledWith("B", "B")
  })

  test('correct for showIcon T/F', async () => {
    const Title = ({ showIcon, log, r }) => {
      let text = "*"
      const t = _hook("A")
      const text2 = _hook("B")
    
      if (showIcon) {
        text = t
      }
      r()
      log(text, text2)
      return <h1 data-testid="test">{text}{text2}</h1>
    }    
    
    const log = jest.fn(), r = jest.fn()
  
    // first render
    CurrentComponent.hookId = 0
    const {rerender} = render(<Title showIcon={true} log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(1)
    expect(log).toHaveBeenLastCalledWith("A", "B")

    // second render
    CurrentComponent.hookId = 0
    rerender(<Title showIcon={false} log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(2)
    expect(log).toHaveBeenLastCalledWith("*", "B")
  })

  test('correct for showIcon F/T', async () => {
    const Title = ({ showIcon, log, r }) => {
      let text = "*"
      const t = _hook("A")
      const text2 = _hook("B")
    
      if (showIcon) {
        text = t
      }
      r()
      log(text, text2)
      return <h1 data-testid="test">{text}{text2}</h1>
    }    
    
    const log = jest.fn(), r = jest.fn()
  
    // first render
    CurrentComponent.hookId = 0
    const {rerender} = render(<Title showIcon={false} log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(1)
    expect(log).toHaveBeenLastCalledWith("*", "B")

    // second render
    CurrentComponent.hookId = 0
    rerender(<Title showIcon={true} log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(2)
    expect(log).toHaveBeenLastCalledWith("A", "B")
  })
})
