import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import DashboardHeader from "@components/dashboard/DashboardHeader";
import SubscriptionBanner from "@components/dashboard/SubscriptionBanner";
import StatsCards from "@components/dashboard/StatsCards";
import TabNavigation from "@components/dashboard/TabNavigation";
import MenuTab from "@components/dashboard/tabs/MenuTab";
import TimeSlotsTab from "@components/dashboard/tabs/TimeSlotsTab";
import QRCodeTab from "@components/dashboard/tabs/QRCodeTab";
import AnalyticsTab from "@components/dashboard/tabs/AnalyticsTab";
import SettingsTab from "@components/dashboard/tabs/SettingsTab";
import { Restaurant, Category, MenuItem } from "@/types/dashboard.types";
import { getRestaurantData, saveRestaurantData } from "@utils/dashboardStorage";
import PlanComparisonModal from "@components/dashboard/PlanComparisonModal";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [activeTab, setActiveTab] = useState("menu");
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [showPlanModal, setShowPlanModal] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail");

    if (!userRole || !userEmail) {
      navigate("/login");
      return;
    }

    // Load restaurant data
    const data = getRestaurantData();
    setRestaurant(data.restaurant);
    setCategories(data.categories);
    setItems(data.items);
  }, [navigate]);

  const toggleLang = () => setLang(lang === "en" ? "ta" : "en");

  const handleUpdateRestaurant = (updates: Partial<Restaurant>) => {
    if (!restaurant) return;
    const updated = { ...restaurant, ...updates };
    setRestaurant(updated);
    saveRestaurantData({ restaurant: updated, categories, items });
  };

  const handleUpdateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    if (restaurant) {
      saveRestaurantData({ restaurant, categories: newCategories, items });
    }
  };

  const handleUpdateItems = (newItems: MenuItem[]) => {
    setItems(newItems);
    if (restaurant) {
      saveRestaurantData({ restaurant, categories, items: newItems });
    }
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const canAccess = restaurant.subscriptionStatus !== "expired";

  return (
    <DashboardLayout>
      <DashboardHeader
        restaurant={restaurant}
        lang={lang}
        onToggleLang={toggleLang}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <SubscriptionBanner
          restaurant={restaurant}
          lang={lang}
          onShowPlanComparison={() => setShowPlanModal(true)}
        />

        <StatsCards
          restaurant={restaurant}
          categories={categories}
          items={items}
          lang={lang}
        />

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            lang={lang}
          />

          <div className="p-4 sm:p-6">
            {activeTab === "menu" && (
              <MenuTab
                restaurant={restaurant}
                categories={categories}
                items={items}
                onUpdateCategories={handleUpdateCategories}
                onUpdateItems={handleUpdateItems}
                canAccess={canAccess}
                lang={lang}
              />
            )}

            {activeTab === "timeSlots" && (
              <TimeSlotsTab
                restaurant={restaurant}
                onUpdate={handleUpdateRestaurant}
                canAccess={canAccess}
                lang={lang}
              />
            )}

            {activeTab === "qrCode" && (
              <QRCodeTab restaurant={restaurant} lang={lang} />
            )}

            {activeTab === "analytics" && (
              <AnalyticsTab items={items} lang={lang} />
            )}

            {activeTab === "settings" && (
              <SettingsTab
                restaurant={restaurant}
                onUpdate={handleUpdateRestaurant}
                canAccess={canAccess}
                lang={lang}
              />
            )}
          </div>
        </div>
      </div>

      <PlanComparisonModal
        currentPlan={restaurant.planType}
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        lang={lang}
      />
    </DashboardLayout>
  );
}
