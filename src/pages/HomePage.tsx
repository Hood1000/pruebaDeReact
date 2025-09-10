import { Link } from "react-router-dom";
export function Inicio() {
    return (

        <nav className="p-4" >
            <ul className="text-center">
                <li>
                    <Link to="/Userlist" className="text-5xl  text-blue-600 hover:text-blue-800 hover:underline">
                        Listas de usuarios
                    </Link>
                </li>
            </ul>
        </nav>

    )
}