import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { auth } from "../../../auth";


export default async function SellerPortalPage() {
  const session = await auth()
  return (
    <>
      <Header isLoggedIn={!!session} />
      <Container>
        <p>TEST Seller Portal</p>
      </Container>
      <Footer />
    </>
  );
}
