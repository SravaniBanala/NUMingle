import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import AdminDashboard from "./pages/AdminDashboard";

function App() {


    return (
            <BrowserRouter>
                <Navigation />
                <div className="space-div"></div>
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}

                    <Route path="/dashboardAdmin" element={<AdminDashboard />} />
                    <Route path="/addEvent" element={<AdminAddEvent />} />

                </Routes>
            </BrowserRouter>
    );
}

export default App;
