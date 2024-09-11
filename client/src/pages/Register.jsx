import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export function Register() {
    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Registracija</h1>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
