import { Link } from "react-router-dom";
export function Inicio() {
    return (

        <nav className="  p-4 w-100 mx-auto " >
            <ul className="text-center">
                <li>
                    <Link to="/Userlist" className="text-3xl p-2 min-h-screen text-blue-500 hover:text-blue-700 hover:underline">
                        Listas de usuarios
                    </Link>
                </li>
            </ul>
        </nav>

    )
}