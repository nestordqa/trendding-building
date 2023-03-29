export const getServe = async() =>{
    const res = await fetch('http://localhost:3000/api/admin')
    const data = await res.json()
  
    return {
      props:{
        data,
      },
    }    
};