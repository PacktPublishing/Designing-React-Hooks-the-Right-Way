import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('API', () => {
  test('fetch with two renders', async () => {
    const fetched = jest.fn(), rendered = jest.fn()

    const Title = () => {
      let count = _getM(0)

      rendered()
      return <h1 data-testid="test">Hello World+{count}</h1>
    }

    const { rerender } = render(<Title />)

    let m = undefined
    function _getM(initialValue) {
      if (m === undefined) m = initialValue
      return m
    }
    function _setM(value) {
      m = value
      rerender(<Title />)
    }
    
    function api() {
      _setM(1)
      fetched(1)
    }

    api()
    expect(rendered).toHaveReturnedTimes(2)
    expect(fetched).toHaveReturnedTimes(1)
    expect(screen.getByTestId('test'))
      .toHaveTextContent("Hello World+1")
  })

  test('persist fetch within render', async () => {
    const fetched = jest.fn(), rendered = jest.fn()

    const Title = () => {
      let count = _getM(0)
      _setCb(api)

      rendered()
      return <h1 data-testid="test">Hello World+{count}</h1>
    }

    let m = undefined
    let cb = undefined

    const { rerender } = render(<Title />)

    function _getM(initialValue) {
      if (m === undefined) m = initialValue
      return m
    }
    function _setM(value) {
      m = value
      rerender(<Title />)
    }
    function _setCb(f) { cb = f }

    function api() {
      _setM(1)
      fetched(1)
    }

    // after first render
    if (cb) { cb() }
    expect(rendered).toHaveReturnedTimes(2)
    expect(fetched).toHaveReturnedTimes(1)
    expect(screen.getByTestId('test'))
      .toHaveTextContent("Hello World+1")

    // after second render
    if (cb) { cb() }
    expect(rendered).toHaveReturnedTimes(3)
    expect(fetched).toHaveReturnedTimes(2)

    // after third render
    if (cb) { cb() }
    expect(rendered).toHaveReturnedTimes(4)
    expect(fetched).toHaveReturnedTimes(3)
  })

  test('persist fetch only once', async () => {
    const fetched = jest.fn(), rendered = jest.fn()

    const Title = () => {
      let count = _getM(0)
      _setCb(count ? undefined : api)

      rendered()
      return <h1 data-testid="test">Hello World+{count}</h1>
    }

    let m = undefined
    let cb = undefined

    const { rerender } = render(<Title />)

    function _getM(initialValue) {
      if (m === undefined) m = initialValue
      return m
    }
    function _setM(value) {
      m = value
      rerender(<Title />)
    }
    function _setCb(f) { cb = f }

    function api() {
      _setM(1)
      fetched(1)
    }

    // after first render
    if (cb) { cb() }
    expect(rendered).toHaveReturnedTimes(2)
    expect(fetched).toHaveReturnedTimes(1)
    expect(screen.getByTestId('test'))
      .toHaveTextContent("Hello World+1")

    // no more renders
    if (cb) { cb() }
    expect(rendered).toHaveReturnedTimes(2)
    expect(fetched).toHaveReturnedTimes(1)
  })

})
