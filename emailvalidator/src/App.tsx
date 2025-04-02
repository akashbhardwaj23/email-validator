import { useNavigate } from "@tanstack/react-router"
import { Button } from "./components/ui/button"

function App() {

  const navigate = useNavigate()

  return (  
    <div className="flex flex-col justify-center items-center relative top-20 gap-4">
      <span className="text-lg">SignIn To Access</span>

        <Button onClick={() => navigate({to : "/signin"})}>SignIn</Button>
    </div>
  )
}

export default App
