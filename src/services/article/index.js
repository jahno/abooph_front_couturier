import {API_ROUTE} from '../../api/routes'
import store from '../../redux/store'

export function getCategoriesArticles(){
  const token = store.getState().auth.token
  const url = `${API_ROUTE}/categoriearticle/all`;
  return (
      fetch(url,{
          method:"GET",
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          },
      })
  );
}

export function getConfectionTimes(){
  const token = store.getState().auth.token
  const url = `${API_ROUTE}/temps-confection-artilce/all`;
  return (
      fetch(url,{
          method:"GET",
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          },
      })
  );
}

export function getArticles(page){
  const token = store.getState().auth.token
  let url = `${API_ROUTE}/couturier/article`;

  if(page) url = `${API_ROUTE}/couturier/article?page=${page}`;

  return (
      fetch(url,{
          method:"GET",
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          },
      })
  );
}

export function getArticle(id){
  const token = store.getState().auth.token
  const url = `${API_ROUTE}/couturier/article/${id}`;

  return (
      fetch(url,{
          method:"GET",
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          },
      })
  );
}

export function addArticle(data){
  const url = `${API_ROUTE}/couturier/article`;
  const token = store.getState().auth.token
  
  return (
    fetch(url,{
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
  );
}

export function updateArticle({id, data}){
  const url = `${API_ROUTE}/couturier/article/${id}`;
  const token = store.getState().auth.token
  
  return (
    fetch(url,{
      method:"PUT",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
  );
}


export function deleteArticle(id){
  const url = `${API_ROUTE}/couturier/article/${id}`;
  const token = store.getState().auth.token
  
  return (
    fetch(url,{
      method:"DELETE",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
  );
}

export function changeState({id, state}){
  const url = `${API_ROUTE}/couturier/article/${id}/publish`;
  const token = store.getState().auth.token
  
  return (
    fetch(url,{
      method:"PUT",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify({state})
    })
  );
}
