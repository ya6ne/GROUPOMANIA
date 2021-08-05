import axios from 'axios';

function Deletepost({postId, delItem , updateDelitem}) {
    console.log(postId)
    let mytoken = localStorage.getItem('token');
    const post = () => {
        console.log(postId)
        axios.delete(process.env.REACT_APP_POSTS,{ data:{postId} ,headers: {'Authorization': `Bearer ${mytoken}` }})
        .then(data =>  {updateDelitem(delItem + 1)})
        .catch(e => {console.log(e)}) 
    }

    return (
        <div>
            <button className="btn btn-danger mt-3" onClick={() => post()}>Supprimer l'article</button>
        </div>
    )


}


    




export default Deletepost;
