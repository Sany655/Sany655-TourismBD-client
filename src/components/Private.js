import React from 'react'
import { useParams } from 'react-router'

const Private = () => {
    const params = useParams()
    return (
        <div>
            {params.id}
        </div>
    )
}

export default Private
