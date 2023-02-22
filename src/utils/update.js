export function updateinfo(request,path) {
    request.get(path).then(r=> {
     if(r.code==200) {
         localStorage.setItem('info', JSON.stringify(r.user))
     }
    })
}
