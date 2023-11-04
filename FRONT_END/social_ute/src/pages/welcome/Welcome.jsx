import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../app/slice/auth/auth.slice'

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const welcome = user ? `Welcome ${user}!` : `Welcome `

    return (
        <section >
            <h1>{welcome}</h1>
        </section>
    )
}

export default Welcome
