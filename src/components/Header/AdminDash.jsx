import './AdminDash.css'
import {
    BrowserRouter as Router,
    // Switch,
    // Route,
    Link,
    // useRouteMatch,
    // useParams
} from "react-router-dom";

function AdminHeader() {
    return (

        <div className="header">

            <ul>
                <li><Link to="/AdminSignIn">Admin</Link></li>
                <li><a href="/VendorSignIn">Vendor</a></li>

            </ul>
        </div>

    );
}

export default AdminHeader;