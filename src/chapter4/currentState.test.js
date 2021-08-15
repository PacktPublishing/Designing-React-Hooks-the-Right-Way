import React, { useState } from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'

let clicked, rendered, memoized

// wrong version
const Title = () => {
  const [count, setCount] = useState(0)
  const onClick = () => {
    setTimeout(() => {
      setCount(count + 1)
      clicked(count)
    }, 3000)
  }

  rendered(count)
  return (
    <>
      <button onClick={onClick}>+</button>
      <h1>Hello World+{count}</h1>
    </>
  )
}

// correct version
const Title_ = () => {
  const [count, setCount] = useState(0)
  const onClick = () => {
    setTimeout(() => {
      setCount(state => {
        clicked(count)
        memoized(state)
        return state + 1
      })
    }, 3000)
  }

  rendered(count)
  return (
    <>
      <button onClick={onClick}>+</button>
      <h1>Hello World+{count}</h1>
    </>
  )
}

describe('Use State', () => {
  beforeEach(() => {
    clicked = jest.fn()
    rendered = jest.fn()
    memoized = jest.fn()
  })

  test('wrong with setTimeout', async () => {
    jest.useFakeTimers('legacy')
    const _t = () => screen.getByRole('button')

    render(<Title />)
    await waitFor(_t)
    expect(rendered).toHaveReturnedTimes(1)

    // first click
    fireEvent.click(_t())
    expect(rendered).toHaveReturnedTimes(1)
    expect(rendered).toHaveBeenLastCalledWith(0)

    // second click
    fireEvent.click(_t())
    expect(rendered).toHaveReturnedTimes(1)
    expect(rendered).toHaveBeenLastCalledWith(0)

    // third click
    fireEvent.click(_t())
    expect(rendered).toHaveReturnedTimes(1)
    expect(rendered).toHaveBeenLastCalledWith(0)

    // wait for the end
    waitFor(() => { jest.runAllTimers() })
    expect(clicked).toHaveReturnedTimes(3)
    expect(clicked).toHaveBeenLastCalledWith(0)
    expect(rendered).toHaveReturnedTimes(3)
    expect(rendered).toHaveBeenLastCalledWith(1)
  })

  test('correct with setTimeout', async () => {
    jest.useFakeTimers('legacy')
    const _t = () => screen.getByRole('button')

    render(<Title_ />)
    await waitFor(_t)
    expect(rendered).toHaveReturnedTimes(1)

    // first click
    fireEvent.click(_t())
    expect(rendered).toHaveReturnedTimes(1)
    expect(rendered).toHaveBeenLastCalledWith(0)

    // second click
    fireEvent.click(_t())
    expect(rendered).toHaveReturnedTimes(1)
    expect(rendered).toHaveBeenLastCalledWith(0)

    // third click
    fireEvent.click(_t())
    expect(rendered).toHaveReturnedTimes(1)
    expect(rendered).toHaveBeenLastCalledWith(0)

    // wait for the end
    waitFor(() => { jest.runAllTimers() })
    expect(clicked).toHaveReturnedTimes(3)
    expect(clicked).toHaveBeenLastCalledWith(0)
    expect(memoized).toHaveReturnedTimes(3)
    expect(memoized).toHaveBeenLastCalledWith(2)
    expect(rendered).toHaveReturnedTimes(4)
    expect(rendered).toHaveBeenLastCalledWith(3)
  })
})
