import {createRouter, createWebHistory} from 'vue-router';
import UserDashboard from '../views/user/UserDashboard.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import Category from '../views/admin/category/Category.vue';
import CategoryModal from '../views/admin/category/CategoryModal.vue';
import CategoryTable from '../views/admin/category/CategoryTable.vue';
import User from '../views/admin/user/User.vue';
import UserModal from '../views/admin/user/UserModal.vue';
import About from '../views/user/About.vue';
import Services from '../views/user/Services.vue';
import ShopByCategory from '../views/user/ShopByCategory.vue';
import ProductOverview from '../views/user/ProductOverview.vue';
import Cart from '../views/user/Cart.vue';
import Contact from '../views/user/Contact.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Requestpassword from '../views/Requestpassword.vue';
import Resetpassword from '../views/Resetpassword.vue';
import UserLayout from '../components/UserLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';

import store from '../store';
import UserTable1 from '../views/admin/user/UserTable1.vue';

const routes=[
    {
        path:'/usertable1',
        name:'UserTable1',
        component:UserTable1,
    },
 
    {
        path:'/',
        redirect:'/',
        name:'UserDashboard',
        meta:{requiresAuth: true},
        component:UserLayout,
        children:[{path:'/',name:'UserDashboard',component:UserDashboard},
                  {path:'/shopbycategory',name:'ShopByCategory',component:ShopByCategory}, 
                  {path:'/productoverview',name:'ProductOverview',component:ProductOverview}, 
                  {path:'/shoppingcart',name:'Cart',component:Cart}, 
                  {path:'/contact',name:'Contact',component:Contact}, 
                  {path:'/about',name:'About',component:About} ,
                  {path:'/services',name:'Services',component:Services},                 
                  {path:'/admin-dashboard',name:'AdminDashboard',component:AdminDashboard,
                  children:[{path:'/user',name:'User',component:User},
                            {path:'/usermodal',name:'UserModal',component:UserModal},
                            {path:'/category',name:'Category',component:Category},
                            {path:'/categorymodal',name:'CategoryModal',component:CategoryModal},
                          
                            ]} ,
                  ]

    } ,
    {
        path:'/auth',
        redirect:'/login',
        name:'Auth',
        meta:{isGuest: true},
        component:AuthLayout,
        children:[{path:'/login',name:'Login',component:Login},
                  {path:'/register',name:'Register',component:Register}, 
                  {path:'/request-password',name:'Requestpassword',component:Requestpassword},             
                  {path:'/reset-password', name:'Resettpassword',component:Resetpassword }
                
                  ]

    }
    
];
const router=createRouter({
    history:createWebHistory(),
    routes

})

export default router;

