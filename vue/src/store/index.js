import {createStore} from "vuex";
import axiosClient from "../axios";
const tmpServices=[
  {
     id:1,
     name:"Kitchen Items",
     description:"We sell the best kitchen items",
     categoryimage:
     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      created_at:"2021-12-20 18:00:00",
     created_by:"Collins",
     deleted_at:"2021-12-20 18:00:00",
     deleted_by:"Collins",
  },
  {
    id:2,
    name:"Beddings",
    description:"For the best bedding come to shebuShop",
    categoryimage:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
     created_at:"2021-12-20 18:00:00",
    created_by:"Collins",
    deleted_at:"2021-12-20 18:00:00",
    deleted_by:"Collins",
 },
 {
  id:3,
  name:"Seats",
  description:"We offer a wide range of seats",
  categoryimage:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   created_at:"2021-12-20 18:00:00",
  created_by:"Collins",
  deleted_at:"2021-12-20 18:00:00",
  deleted_by:"Collins",
},
{
  id:4,
  name:"Electic Equipments",
  description:"check out our electrocals",
  categoryimage:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   created_at:"2021-12-20 18:00:00",
  created_by:"Collins",
  deleted_at:"2021-12-20 18:00:00",
  deleted_by:"Collins",
}
] 
const store = createStore({
state:{
   user: {
     data:{ },
      token:sessionStorage.getItem('TOKEN'),
        },
   services: {tmpServices}  ,
   categorys: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null
  },
  usersindex2: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null
  },
  toast: {
    show: false,
    message: '',
    delay: 5000
  },
  users: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null
  }
    
      },
getters:{},
actions:{
  createCategory({commit}, category) {
    if (category.categoryimages && category.categoryimages.length) {
      const form = new FormData();
      form.append('name', category.name);
      category.categoryimages.forEach(im => form.append('categoryimages[]', im))
      form.append('description', category.description || '');
      category = form;
    }
    return fetch('http://localhost:80/api/categorys',{
      headers:{
          "Content-Type":"application/json",
           Accept:"application/json",
      },
      method:"POST",
      body:JSON.stringify(category),
  })
  .then((res)=>{
      alert(res)
    commit("showToast", 'Category was successfully created');
    return res
  });
  },
  updateCategory({commit}, category) {
    const id = category.id
    if (category.categoryimage && category.categoryimage.length) {
      const form = new FormData();
      form.append('id', category.id);
      form.append('name', category.name);
      category.images.forEach(im => form.append(`categoryimage[${im.id}]`, im))
      if (category.deleted_images) {
        category.deleted_images.forEach(id => form.append('deleted_images[]', id))
      }

      form.append('description', category.description || '');

      form.append('_method', 'PUT');
      category = form;
    } else {
      category._method = 'PUT'
    }
    return axiosClient.post(`/products/${id}`, product)
  },
  getCategorys({ commit},categorys){
    return fetch('http://localhost:80/api/index1',{
        headers:{
            "Content-Type":"application/json",
             Accept:"application/json",
        },
        method:"POST",
        body:JSON.stringify(categorys),
    })
    .then((res)=>{
      
      commit("setCategorys");
      return res
    });
    },
    deleteUser({commit}, id) {
      alert("delete")
      return axiosClient.delete(`/deleteuser/${id}`)
    },
    getUser({commit}, id) {
      alert("show")
      return axiosClient.get(`/showuser/${id}`)
    },
    createUser({commit}, user) {
      return axiosClient.post('/stores', user)
    },
    updateUser({commit}, user) {
      const id = user.id
      if (user.userimage && user.userimage.length) {
        const form = new FormData();
        form.append('id', user.id);
        form.append('name', user.name);
        user.userimage.forEach(im => form.append(`images[${im.id}]`, im))
        if (user.deleted_images) {
          user.deleted_images.forEach(id => form.append('deleted_images[]', id))
        }
        for (let id in user.image_positions) {
          form.append(`image_positions[${id}]`, user.image_positions[id])
        }
        form.append('email', user.email );
        form.append('phone', user.phone );
        form.append('address', user.address);
        form.append('password', user.password);
        form.append('_method', 'PUT');
        user = form;
      } else {
        user._method = 'PUT'
      }
      return axiosClient.post(`/showuser/${id}`, user)
    },
    getUsers2({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
      commit('setUsers2', [true])
      url = url || '/index'
      const params = {
        per_page: state.users.limit,
      }
      return axiosClient.get(url, {
        params: {
          ...params,
          search, per_page, sort_field, sort_direction
        }
      })
      .then((response) => {
        alert("in")
        commit('setUsers2', [false, response])
      })
      .catch(() => {
        commit('setUsers2', [false])
      })

    },  

  logout({ commit},user){
    return fetch('http://localhost:80/api/logout',{
        headers:{
            "Content-Type":"application/json",
             Accept:"application/json",
        },
        method:"POST",
        body:JSON.stringify(user),
    })
    .then((res)=>{
      commit("logout");
      return res
    });
    },
    login({commit}, data) {
      return axiosClient.post('/login', data)
        .then(({data}) => {
          alert(data)
          commit('setUser', data.user);
          commit('setToken', data.token)
          return data;
        })
    },
  login1({ commit},user){
    return fetch('http://localhost:80/api/login',{
        headers:{
            "Content-Type":"application/json",
             Accept:"application/json",
        },
        method:"POST",
        body:JSON.stringify(user),
    })
   .then((res)=> res.text())
    .then((res)=>{
          commit("setUser",res);
          alert(res.user+"login")
      return res
    });
    }, 
    register1({commit}, user) {
      return axiosClient.post('/users', user)
          .then((res) => {
          alert(JSON.stringify(res))
          commit("setUser",res);
          return res;
        })
    },
    register({ commit},user){
       return fetch('http://127.0.0.1/api/stores',{
           headers:{
               "Content-Type":"application/json",
                "Accept":"application/json",
           },
           method:"POST",
           body:JSON.stringify(user),
       })
      .then((res)=> res.json())
       .then((res)=>{
        alert(JSON.stringify(res.data))
             commit("setUser",res);
            
         return res
       });
       },
  

},
mutations:{
  logout:state=>{
    state.user.data={};
    state.user.token='null'
             },
    login:state=>{
        state.user.data={};
        state.user.token='null'
                  },
    showToast(state, message) {
      state.toast.show = true;
      state.toast.message = message;
            },
  setUser(state, user) {
              state.user.data = user;
            },
  setToken(state, token) {
        state.user.token = token;
        if (token) {
        sessionStorage.setItem('TOKEN', token);
        } else {
          sessionStorage.removeItem('TOKEN')
        }
            },
    setCategorys(state, [loading, data = null]) {

            if (data) {
              state.categorys = {
                ...state.categorys,
                data: data.data,
                links: data.meta?.links,
                page: data.meta.current_page,
                limit: data.meta.per_page,
                from: data.meta.from,
                to: data.meta.to,
                total: data.meta.total,
              }
            }
            state.categorys.loading = loading;
          } ,
          setUsers2:(state,[loading, userData= null] )=>{
            if(userData){
              state.usersindex2=userData.data;
              state.usersindex2.links= userData.data.meta?.links;
              state.usersindex2.page= userData.data.meta.current_page;
              state.usersindex2.limit= userData.data.meta.per_page;
              state.usersindex2.from= userData.data.meta.from;
              state.usersindex2.to= userData.data.meta.to;
              state.usersindex2.total= userData.data.meta.total;            
              
            }
          },
          setUsers(state, [loading, data = null]) {

            if (data) {
              state.users = {
                ...state.users,
                data: data.data,
                links: data.meta?.links,
                page: data.meta.current_page,
                limit: data.meta.per_page,
                from: data.meta.from,
                to: data.meta.to,
                total: data.meta.total,
              }
            }
            state.users.loading = loading;
          }           
      

},
modules:{}
})
export default store;
