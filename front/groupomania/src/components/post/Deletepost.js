import axios from 'axios';

function Deletepost({postId}) {
    let mytoken = localStorage.getItem('token');
    const post = () => {
        axios.delete("http://localhost:3000/api/posts/" ,{
            data:{
                postId
            }
        },
         {
            headers:{
                'Authorization': `Bearer ${mytoken}`
            }}
            )
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
