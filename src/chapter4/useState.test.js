import React, { useState } from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

const clicked = jest.fn(), rendered = jest.fn()

const Title = () => {
  const [count, setCount] = useState(0)
  const onClick = () => {
    setCount(count + 1)
    clicked(count)
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
  test('with three clicks', async () => {
    const _t = () => screen.getByRole('button')

    render(<Title />)
    await waitFor(() => expect(rendered).toHaveReturnedTimes(1))
    expect(rendered).toHaveBeenLastCalledWith(0)
    
    // first key stroke
    fireEvent.click(_t())
    await waitFor(() => expect(rendered).toHaveReturnedTimes(2))
    expect(rendered).toHaveBeenLastCalledWith(1)

    // second key stroke
    fireEvent.click(_t())
    await waitFor(() => expect(rendered).toHaveReturnedTimes(3))
    expect(rendered).toHaveBeenLastCalledWith(2)

    // third key stroke
    fireEvent.click(_t())
    await waitFor(() => expect(rendered).toHaveReturnedTimes(4))
    expect(rendered).toHaveBeenLastCalledWith(3)
  })
 
})
