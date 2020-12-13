import React from 'react'
import ReactDOM from 'react-dom'
import { getByAltText, render, screen } from '@testing-library/react'
import App from './App'

test('renders navbar and content', () => {
  const { container } = render(<App />)

  expect(container.firstChild?.childNodes.length).toEqual(2)

  expect(container.firstChild?.firstChild?.tagName).toEqual('HEADER')

  const logoElement = screen.getByText('Maxxr')
  expect(logoElement).toBeInTheDocument()

  const signinElement = screen.getByText('Sign In')
  expect(signinElement).toBeInTheDocument()

  const signupElement = screen.getByText('Sign Up')
  expect(signupElement).toBeInTheDocument()
})