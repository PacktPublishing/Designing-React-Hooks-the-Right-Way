import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Nav from './Nav'

const items = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
]

const renderNav = props => {
  const utils = render(
    <Nav
      data-testid="test"
      {...props}
    />
  )
  const nav = utils.getByTestId('test')
  return { nav, utils }
}

describe('Nav Component', () => {

  it('should render empty', () => {
    const { utils } = renderNav({})
    expect(utils.queryByRole('listitem')).not.toBeTruthy()
  })

  it('should render items', async () => {
    const { utils } = renderNav({ items })
    const list = await utils.getAllByRole('listitem')
    expect(list).toHaveLength(items.length)
  })

  it('should allow select enabled item', async () => {
    const onSelect = jest.fn()
    const { utils } = renderNav({ items, onSelect })
    const selected = items[1]
    fireEvent.click(utils.getByText(selected.label))
    expect(onSelect).toHaveBeenCalledWith(selected.key)
  })

  it('should not select disabled item', async () => {
    const disabledItems = [...items, {
      key: 'disabled', label: 'Disabled', disabled: true
    }]
    const onSelect = jest.fn()
    const { utils } = renderNav({ items: disabledItems, onSelect })
    const selected = disabledItems[disabledItems.length - 1]
    fireEvent.click(utils.getByText(selected.label))
    expect(onSelect).not.toHaveBeenCalled()
  })
})
