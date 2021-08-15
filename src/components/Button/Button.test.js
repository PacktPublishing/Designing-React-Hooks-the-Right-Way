import React from 'react'
import { render } from '@testing-library/react'
import Button from './index'

const renderButton = props => {
  const utils = render(
    <Button
      data-testid="test"
      {...props}
    />
  )
  const button = utils.getByTestId('test')
  return { button, utils }
}

describe('Button Component', () => {

  it('should render the button text', () => {
    const { button } = renderButton({ children: 'abc' })
    expect(button.textContent).toEqual('abc')
  })

  it('should call button event upon click', () => {
    const onClick = jest.fn()
    const { button } = renderButton({ onClick })
    button.click()
    expect(onClick).toHaveBeenCalled()
  })

  it('should disable button event', () => {
    const onClick = jest.fn()
    const { button } = renderButton({ onClick, disabled: true })
    button.click()
    expect(onClick).not.toHaveBeenCalled()
  })

})
