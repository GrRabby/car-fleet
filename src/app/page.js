import AvailableCars from "@/components/AvailableCars";
import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import ScrollToTop from "@/components/ScrollToTop";
import WhyCarFleet from "@/components/WhyCarFleet";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between bg-white dark:bg-black ">
        <Banner/>
        <AvailableCars/>
        <WhyCarFleet/>
        <HowItWorks/>
        <ScrollToTop />
      </main>
    </div>
  );
}
