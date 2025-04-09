
import { Navigate } from "react-router-dom";

// Redirect the index page to our HomePage component
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
