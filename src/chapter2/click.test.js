import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('Click', () => {
  test('handle event with event handler', async () => {
    const clicked = jest.fn(), rendered = jest.fn()

    const Title = () => {
      let count = 0
      const onClick = () => {
        count++
        clicked(count)
      }

      rendered()
      return (
        <>
          <button onClick={onClick}>Click</button>
          <h1 data-testid="test">Hello World+{count}</h1>
        </>
      )
    }
    
    render(<Title />)
    fireEvent.click(screen.getByText('Click'))
    await waitFor(() => screen.getByTestId('test'))
    expect(rendered).toHaveReturnedTimes(1)
    expect(clicked).toHaveBeenCalledWith(1)
    expect(screen.getByTestId('test'))
      .toHaveTextContent("Hello World+0")
  })

  test('handle event with persistent variable', async () => {
    const clicked = jest.fn(), rendered = jest.fn()

    const Title = () => {
      let count = _getM(0)

      rendered()
      return (
        <>
          <button onClick={onClick(count)}>Click</button>
          <h1 data-testid="test">Hello World+{count}</h1>
        </>
      )
    }

    let m = undefined
    const { rerender } = render(<Title />)

    function _getM(initialValue) {
      if (m === undefined) m = initialValue
      return m
    }
    function _setM(value) {
      m = value
      rerender(<Title />)
    }

    function onClick(count) {
      return () => {
        _setM(count+1)
        clicked(count+1)
      }
    }

    // first click
    fireEvent.click(screen.getByText('Click'))
    await waitFor(() => screen.getByTestId('test'))
    expect(clicked).toHaveBeenCalledWith(1)
    expect(rendered).toHaveReturnedTimes(2)
    expect(screen.getByTestId('test'))
      .toHaveTextContent("Hello World+1")

    // second click
    fireEvent.click(screen.getByText('Click'))
    await waitFor(() => screen.getByTestId('test'))
    expect(clicked).toHaveBeenCalledWith(2)
    expect(rendered).toHaveReturnedTimes(3)
    expect(screen.getByTestId('test'))
      .toHaveTextContent("Hello World+2")
  })

})
