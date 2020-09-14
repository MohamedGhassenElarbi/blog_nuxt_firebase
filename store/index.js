import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';
const createStore=()=>{
    return new Vuex.Store({
        state:{
            loadedPosts:[
                {id:"2",title:"title",previewText:"this is a preview",thumbnail:"https://picsum.photos/900/250/?image=3"},

            ],
            token:null
        },
        mutations:{
            setPosts(state,posts){
                state.loadedPosts=posts;
            },
            addPost(state,post){
                state.loadedPosts.push(post)
            },
            editedPost(state,editedPost){
                
                const postId= state.loadedPosts.findIndex(post => post.id===editedPost.id);
                
                state.loadedPosts[postId]=editedPost
                
            },
            deletedPost(state,idPost){
                const postId= state.loadedPosts.findIndex(post => post.id===idPost);
                state.loadedPosts.splice(postId,1);
            },
            setToken(state,token){
                state.token=token
            },
            clearToken(state){
                state.token=null;
            }
        },
        actions:{
            nuxtServerInit(VuexContext,context){
                return axios.get('https://appfirebase-77a25.firebaseio.com/posts.json')
                .then(res =>{
                    const resultArray=[]
                    for(const key in res.data ){
                        resultArray.push({...res.data[key],id:key})
                    }
                    VuexContext.commit('setPosts',resultArray)
                })
                .catch(e=>context.error(e))
            },
           setPosts(VuexContext,posts){
            VuexContext.commit('setPosts',posts);
           },

           addPost(VuexContext,post){
            return axios.post('https://appfirebase-77a25.firebaseio.com/posts.json?auth='+VuexContext.state.token,post)
            .then(result =>{
                VuexContext.commit('addPost',{...post,id:result.data.name})
                
                
            })
            .catch(e=>console.log(e))
           },



           editedPost(VuexContext,editedPost){
            return axios.put('https://appfirebase-77a25.firebaseio.com/posts/'+editedPost.id+'.json?auth='+VuexContext.state.token,editedPost)
            .then(result =>{
              
                VuexContext.commit('editedPost',editedPost)
              
            })
            .catch(e => console.log(e))
           },


           deletedPost(VuexContext,idPost){
            return axios.delete('https://appfirebase-77a25.firebaseio.com/posts/'+idPost+'.json?auth='+VuexContext.state.token)
            .then(result =>{
                      
                VuexContext.commit('deletedPost',idPost)
                      
            })
            .catch(e=>console.log(e))
           },
           authenticateUser(VuexContext,authData){
            let url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARryhJ8vm1xkFVevXeLWq1sb7gTt2f1PQ';
            if(authData.etat!="Login"){
                url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARryhJ8vm1xkFVevXeLWq1sb7gTt2f1PQ';  
            }
            return axios.post(url,
            {
                email:authData.email,
                password:authData.password,
                returnSecureToken:true
            }
            ).then(result =>{
                console.log(result)
                VuexContext.commit('setToken',result.data.idToken)
                localStorage.setItem('token',result.data.idToken)
                localStorage.setItem('tokenExpiration',new Date().getTime()+Number.parseInt(result.data.expiresIn)*1000);
                Cookie.set('cookie',result.data.idToken);
                Cookie.set('tokenExpiration',new Date().getTime()+Number.parseInt(result.data.expiresIn)*1000);
                
            })
            .catch(e=>console.log(e))
           },
           
           initAuth(VuexContext,req){
               let token;
               let tokenExpiration;
               if(req){
                if(!req.headers.cookie){return;}
                const mycookie=req.headers.cookie.split(';').find(c=>c.trim().startsWith('cookie='));
                if(!mycookie){return;}
                token=mycookie.split('=')[1];
                tokenExpiration=req.headers.cookie.split(';').find(c=>c.trim().startsWith('tokenExpiration=')).split('=')[1];
               }else{
                token=localStorage.getItem('token');
                tokenExpiration=localStorage.getItem('tokenExpiration');
                
               }
               if(new Date().getTime()>+tokenExpiration||!token){
                VuexContext.dispatch('logout');
                return;}
               
               
               VuexContext.commit('setToken',token)
           },
           logout(VuexContext){
               VuexContext.commit('clearToken');
               Cookie.remove('cookie');
               Cookie.remove('tokenExpiration');
               if(process.client){
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
               }
               
           }
        },
        getters:{
            loadedPosts(state){
                return state.loadedPosts;
            },
            isAuth(state){
                return state.token != null
            }
        }
    })
}
export default createStore;