import axios from 'axios';

function Deletepost({postId}) {
    console.log(postId)
    let mytoken = localStorage.getItem('token');
    console.log(mytoken)
    const config = {
        headers: {'Authorization': `Bearer ${mytoken}` }
    };
    const post = () => {
        console.log(postId)
        axios.delete("http://localhost:3000/api/posts/",{ data:{postId} ,headers: {'Authorization': `Bearer ${mytoken}` }})
            .then(data =>  {window.location.reload()})
            .catch(e => { console.log(e)}) 
    }



    return (
        <div>
            <button className="btn btn-danger mt-3" onClick={() => post()}>Supprimer l'article</button>
        </div>
    )


}


    




export default Deletepost;
