import React, { useState } from 'react'
import { render, screen, fireEvent, waitFor} from '@testing-library/react'

const CurrentComponent = { hooks: {} }

function getHook(id) {
  const c = CurrentComponent
  if (c.hooks[id] === undefined)
    c.hooks[id] = {}
  return c.hooks[id]
}

function useM(initialValue) {
  const c = CurrentComponent
  const h = getHook(c.hookId++)          
  if (h.value === undefined) {           
    h.value = initialValue
  }
  return h.value
}

const log = jest.fn()

// Wrong version
const Title = ({ flag }) => {
  const a = flag ? useM('a') : ' '
  const b = useM("b")
  log(a, b)
  return <h1 data-testid="test">{a}{b}</h1>
}

// Fixed version
const Title_ = ({ flag }) => {
  const _a = useM('a')
  const b = useM('b')
  const a = flag ? _a : ' '
  log(a, b)
  return <h1 data-testid="test">{a}{b}</h1>
}

describe('Conditional Hooks', () => {
  beforeEach(() => {
    CurrentComponent.hooks = {}
  })

  test('wrong for flag T/F', async () => {
    // first render
    CurrentComponent.hookId = 0
    const { rerender } = render(<Title flag={true} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(log).toHaveBeenLastCalledWith("a", "b")

    // second render
    CurrentComponent.hookId = 0
    rerender(<Title flag={false} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(log).toHaveBeenLastCalledWith(" ", "a")
  })
 
  test('wrong for flag F/T', async () => {
    // first render
    CurrentComponent.hookId = 0
    const { rerender } = render(<Title flag={false} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(log).toHaveBeenLastCalledWith(" ", "b")

    // second render
    CurrentComponent.hookId = 0
    rerender(<Title flag={true} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(log).toHaveBeenLastCalledWith("b", "b")
  })

  test('fixed for flag T/F', async () => {
    // first render
    CurrentComponent.hookId = 0
    const { rerender } = render(<Title_ flag={true} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(log).toHaveBeenLastCalledWith("a", "b")

    // second render
    CurrentComponent.hookId = 0
    rerender(<Title_ flag={false} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(log).toHaveBeenLastCalledWith(" ", "b")
  })

  test('fixed for flag F/T', async () => {
    // first render
    CurrentComponent.hookId = 0
    const { rerender } = render(<Title_ flag={false} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(log).toHaveBeenLastCalledWith(" ", "b")

    // second render
    CurrentComponent.hookId = 0
    rerender(<Title_ flag={true} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(log).toHaveBeenLastCalledWith("a", "b")
  })
})
