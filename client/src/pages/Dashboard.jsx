
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export function Dashboard() {
    const isLoggedIn = false;

    return (
        <>
            <Header />
            {
                isLoggedIn &&
                <main>
                    <h1>Dashboard</h1>
                    <p>sita puslapi mato tik prisijunge vartotojai</p>
                </main>
            }
            {
                !isLoggedIn &&
                <main>
                    <h1>401</h1>
                    <p>sitas puslapis mato tik prisijungusiems vartotojams, eik i LOGIN psl</p>
                </main>
            }
            <Footer />
        </>
    );
}
