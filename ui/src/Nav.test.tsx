import React from 'react'
import {
    createMemorySource,
    createHistory,
    LocationProvider
} from '@reach/router'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Nav, { ProfileMenu } from './Nav'
import { UserData } from './types'

const renderWithRouter = (
    ui: React.ReactElement,
    { route = '/', history = createHistory(createMemorySource(route)) } = {}
) => {
    return {
        ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
        history,
    }
}

test(`renders logo and action buttons by default`, () => {
    const { queryByText } = renderWithRouter(<Nav user={null} />)

    expect(queryByText('Maxxr')).toBeInTheDocument()
    expect(queryByText('Sign In')).toBeInTheDocument()
    expect(queryByText('Sign Up')).toBeInTheDocument()

})

test(`signin button redirects to /auth/signin`, async () => {
    const { history } = renderWithRouter(<Nav user={null} />)

    fireEvent.click(screen.getByText('Sign In'))

    expect(history.location.pathname).toEqual('/auth/signin')

})
test(`signup button redirects to /auth/signup`, async () => {
    const { history } = renderWithRouter(<Nav user={null} />)

    fireEvent.click(screen.getByText('Sign Up'))

    expect(history.location.pathname).toEqual('/auth/signup')

})

test(`doesn't render action buttons on auth route`, async () => {
    const { queryByText, history } = renderWithRouter(<Nav user={null} />)

    await history.navigate('/auth/signup')

    expect(queryByText('Sign In')).toBeNull()
    expect(queryByText('Sign Up')).toBeNull()


    await history.navigate('/auth/signin')

    expect(queryByText('Sign In')).toBeNull()
    expect(queryByText('Sign Up')).toBeNull()

})

// profile button should be shown when user is logged in
// profile button show have a drop down that shows signout button or edit profile option
test(`renders a profile button when user is logged in`, async () => {
    const user: UserData = {
        id: 1,
        username: 'jeru@me.com',
        token: 'OfQ24lDL6PQm+aRIw5AgiA=='
    }
    const { getByText, container } = renderWithRouter(<Nav user={user} />)

    expect(getByText('Profile')).toBeInTheDocument()
})

test(`profile button renders sign out and edit buttons`, () => {
    render(ProfileMenu)

    expect(screen.getByText('Sign Out')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
})

test(`profile dropdown sign out button redirects to /auth/signout`, async () => {
    const { history } = renderWithRouter(ProfileMenu)

    fireEvent.click(screen.getByText('Sign Out'))

    expect(history.location.pathname).toEqual('/auth/signout')
})

// test for edit