import Navbar from "../../components/partial/HomePage/Navbar/Navbar";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import TestResult from "../../components/partial/UserTesting/TestResult";
export default function TestResultPage() {
  return (
    <div>
      <div >
        <Navbar />
      </div>
      <div className="mt-5">
        <TestResult />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
