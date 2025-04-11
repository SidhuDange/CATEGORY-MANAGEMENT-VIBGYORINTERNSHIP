import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditProduct from './component/EditCategory';
import AddCategory from './component/AddCategory';
import CategoryList from './component/CategoryList';
import AppLayout from './component/AppLayout';


function App() {
const router =createBrowserRouter([
  {
      path:'/',
      element:<AppLayout/>,
      children:[
        {
          path:'/',
          element:<CategoryList/>
        }
        ,
        {
          path:'/edit-category/:id',
          element:<EditProduct/>
        },
        {
          path:'/add-category',
          element:<AddCategory/>
        }
      ]
  }
])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
