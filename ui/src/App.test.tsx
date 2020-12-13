import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders navbar', () => {
  const { container } = render(<App />)

  expect(container.firstChild?.firstChild?.tagName).toEqual('HEADER')

  const logoElement = screen.getByText('Maxxr')
  expect(logoElement).toBeInTheDocument()

  const signinElement = screen.getByText('Sign In')
  expect(signinElement).toBeInTheDocument()

  const signupElement = screen.getByText('Sign Up')
  expect(signupElement).toBeInTheDocument()
})