import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
     const {userid} = useParams();
return (
    <div className="flex items-center justify-center p-4 bg-blue-100 rounded shadow">
        User: <span className="font-bold text-blue-600">{userid}</span>
    </div>
)
}

export default User