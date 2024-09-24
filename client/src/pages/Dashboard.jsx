
import { useContext } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export function Dashboard() {
    const { isLoggedIn } = useContext(GlobalContext);

    return (
        <>
            <Header />
            {
                isLoggedIn &&
                <main>
                    <section className="container">
                        <div className="row">
                            <div className="col-12">
                                <div>
                                    <h1>Dashboard</h1>
                                    <Link to='/locations/new' className="btn btn-primary">+ Nauja lokacija</Link>
                                </div>
                                <p>sita puslapi mato tik prisijunge vartotojai</p>
                            </div>
                        </div>
                    </section>
                </main>
            }
            {
                !isLoggedIn &&
                <main>
                    <section className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1>401</h1>
                                <p>sitas puslapis mato tik prisijungusiems vartotojams, eik i LOGIN psl</p>
                            </div>
                        </div>
                    </section>
                </main>
            }
            <Footer />
        </>
    );
}
