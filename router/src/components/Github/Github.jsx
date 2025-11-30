import React, { useEffect , useState} from 'react'
import { useLoaderData  } from 'react-router-dom';

function Github() {
    // This hook will receive the data returned by the githubInfoLoader function
    const data = useLoaderData();
    // const [data, setData] = React.useState({});
    // useEffect(() => {
    //     fetch('https://api.github.com/users/gaurav-dengale')
    //         .then(response => response.json())
    //         .then(data =>{
    //             console.log(data)
    //             setData(data)
    //         })
    //     }, []);

    return (
        // <div className='flex flex-col items-center justify-center p-5 bg-gray-600 text-white text-2xl'>
        //     Github Followers: {data.followers}
        //     <img className='mt-4 rounded-full' src={data.avatar_url} alt="github profile" width={300} />
        // </div>
        <div className='flex flex-col items-center justify-center '>
            <h1>Github Followers :{data.followers}</h1>
            <img src={data.avatar_url} alt="github profile" width={300} />
        </div>
    );
}

export default Github;

// ADD THIS FUNCTION 👇
// // This loader function is called by the router before the component renders.
// export const githubInfoLoader = async () => {
//     const response = await fetch('https://api.github.com/users/gaurav-dengale');
//     if (!response.ok) {
//         throw new Error('Could not fetch GitHub data');
//     }
//     return response.json();
// };
export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/gaurav-dengale');
     if (!response.ok){
        throw new Error("could not fetch Github data");

     }
     return response.json();
    };