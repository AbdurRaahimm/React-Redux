import { Route, Routes } from "react-router-dom"
import UserList from "@/pages/UserList"
import Update from "@/pages/Update"
import Posts from "@/pages/Posts"
import ApiCall from "./pages/ApiCall"
import SinglePosts from "./pages/SinglePosts"
import SingleApiPosts from "./pages/SingleApiPosts"
import CreatePost from "./pages/CreatePost"
import PostUpdate from "./pages/PostUpdate"
import RTK from "./pages/RTK"

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/update/:id" element={<Update />} />



      <Route path="posts"  >
        <Route index element={<Posts />} />
        <Route path=":id" element={<SinglePosts />} />
      </Route>

      <Route path="/api" >
        <Route index element={<ApiCall />} />
        <Route path=":id" element={<SingleApiPosts />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="update/:id" element={<PostUpdate />} />
      </Route>
      <Route path="/rtk" element={<RTK />} />
    </Routes>
  )
}

export default App
