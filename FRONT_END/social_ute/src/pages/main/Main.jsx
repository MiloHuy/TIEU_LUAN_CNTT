import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentToken } from '../../app/slice/auth/auth.slice'

const Public = () => {

    const token = useSelector(selectCurrentToken)

    return (
        <div>
            <header>
                <h1>Welcome to HCMUTE</h1>
            </header>
            <main>
                <p>Nguyen Dinh Quang Huy</p>
                <p>&nbsp</p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur itaque a aut odio, animi vel incidunt obcaecati culpa corporis dicta aspernatur placeat quos esse ullam ut perspiciatis maxime nihil repellendus!
                </p>
            </main>
            <footer>
                {token ? <Link to='./welcome'>welcome</Link> : <Link to='./login'>Login</Link>}
            </footer>
        </div>
    )
}

export default Public