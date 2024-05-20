import { Link } from 'react-router-dom'

export default function Home() {

    // const navigate = useNavigate();


    return (

        <div>

            <h3>Bienvenido al sistema de administración del RDBot.</h3>
            <h3>Seleccione la opción deseada:</h3>
            <hr></hr>
            <h3> Patologías con sus síntomas:  <Link
                to='/pathologies/'
                style={{
                    //textDecoration: 'none', 
                    color: 'white'
                }}
            >
                Listar </Link>
                /
                <Link
                    to='/pathologies/new/'
                    style={{
                        // textDecoration: 'none', 
                        color: 'white'
                    }}
                >
                    Agregar </Link>
                /
                <Link
                    to='/pathologies/search/'
                    style={{
                        // textDecoration: 'none', 
                        color: 'white'
                    }}
                >
                    Buscar por palabra </Link>
            </h3>
            <hr></hr>
            <h3>  Síntomas con sus categorías: <Link
                to='/symptoms/'
                style={{
                    //textDecoration: 'none', 
                    color: 'white'
                }}
            >Listar </Link>
                /
                <Link
                    to='/symptoms/new/'
                    style={{
                        // textDecoration: 'none', 
                        color: 'white'
                    }}
                >
                    Agregar  </Link>
                /
                <Link
                    to='/symptoms/search/'
                    style={{
                        // textDecoration: 'none', 
                        color: 'white'
                    }}
                >
                    Buscar por palabra o código HPO
                </Link>
            </h3>
            <hr></hr>
            <h3>  Categorías y subcategorías:   <Link
                to='/categories/'
                style={{
                    //textDecoration: 'none', 
                    color: 'white'
                }}
            >
                Listar   </Link>
                /
                <Link
                    to='/categories/new/'
                    style={{
                        // textDecoration: 'none', 
                        color: 'white'
                    }}
                >
                    Agregar  </Link>

                /
                <Link
                    to='/categories/search/'
                    style={{
                        // textDecoration: 'none', 
                        color: 'white'
                    }}
                >
                    Buscar por palabra </Link>
            </h3>

            <hr></hr>
            <h3>   
                <Link
                    to='/simulation_cases/'
                    style={{
                        // textDecoration: 'none', 
                        color: 'white'
                    }}
                >Consultas/Simulaciones de casos clínicos
                </Link>
                </h3>
            <hr></hr>
            <h3>  Historial de consultas de casos clínicos</h3>
            <hr></hr>
            <h3>  Usuario y permisos</h3>

        </div>

    )
}