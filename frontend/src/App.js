import { AppRoutes } from "./routes/routes";
import { AuthenticationProvider } from "./store/auth";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter} from "react-router-dom";

import { AuthFetch } from "utils/authAxios";



const App = () => {
  return ( 
    <BrowserRouter>
      <HelmetProvider>
        
          <AuthenticationProvider>
            <AuthFetch>
            
            <AppRoutes />
             
             </AuthFetch>  
          </AuthenticationProvider>
        
      </HelmetProvider>
    </BrowserRouter>
   );
}
 
export default App;