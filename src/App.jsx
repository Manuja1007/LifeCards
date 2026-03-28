import React from "react";
import { AnimatePresence } from "framer-motion";
import { useApp } from "./context/AppContext";
import LoginScreen from "./components/login/LoginScreen";
import Header from "./components/layout/Header";
import BottomNav from "./components/layout/BottomNav";
import Toast from "./components/layout/Toast";
import DailyCheckIn from "./components/layout/DailyCheckIn";
import HomePage from "./components/home/HomePage";
import StoryPage from "./components/story/StoryPage";
import GrowthPage from "./components/growth/GrowthPage";
import SchedulePage from "./components/schedule/SchedulePage";
import MePage from "./components/me/MePage";

const pages = {
  home: HomePage,
  story: StoryPage,
  growth: GrowthPage,
  schedule: SchedulePage,
  me: MePage,
};

export default function App() {
  const { name, page } = useApp();

  if (!name) return <LoginScreen />;

  const PageComponent = pages[page] || HomePage;

  return (
    <div className="min-h-screen bg-surface flex flex-col relative overflow-hidden">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <Header />
      <main className="relative z-10 flex-1 px-5 pb-24 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <PageComponent />
        </AnimatePresence>
      </main>
      <BottomNav />
      <Toast />
      <DailyCheckIn />
    </div>
  );
}
