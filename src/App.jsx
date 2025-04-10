import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./layout/AppLayout"
import WorksPage from "./pages/WorksPage"
import SingleWork from "./pages/SingleWork"

function App() {
  
return (
    <>
     <BrowserRouter>
     <Routes>
      <Route element={<AppLayout />}>
      <Route path="/" element={<WorksPage />} />
      <Route path="/works/:id" element={<SingleWork />} />
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
