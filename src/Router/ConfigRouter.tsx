import { Routes, Route } from "react-router-dom";
import UserList from "../pages/userList";
import { Inicio } from "../pages/HomePage";
import UserForm from "../pages/userForm";
export function Rutas() {
    return (
        <div className="container mx-auto p-4">
            {/* 2. Routes: Contiene todas las rutas de la aplicación. */}
            <Routes>
                {/* 3. Route: Define una ruta específica. */}
                <Route path="/" element={<Inicio />} />
                {/* Ruta principal para la lista de usuarios. */}
                <Route path="/Userlist" element={<UserList />} />

                <Route path="/users/new" element={<UserForm />} />

                <Route path="/users/edit/:id" element={<UserForm />} />
            </Routes>
        </div>
    );
}
