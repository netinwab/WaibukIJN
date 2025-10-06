import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import LoginPage from "@/pages/login";
import Signup from "@/pages/signup";
import SchoolSignup from "@/pages/school-signup";
import ViewerSignup from "@/pages/viewer-signup";
import DynamicYearbookViewer from "@/pages/dynamic-yearbook-viewer";
import YearbookPreview from "@/pages/yearbook-preview";
import ViewerDashboard from "@/pages/viewer-dashboard";
import SchoolDashboard from "@/pages/school-dashboard";
import YearbookFinder from "@/pages/yearbook-finder";
import Cart from "@/pages/cart";
import RequestAlumniStatus from "@/pages/request-alumni-status";
import YearbookViewer from "@/pages/yearbook-viewer";
import YearbookManage from "@/pages/yearbook-manage";
import PhotosMemoriesManage from "@/pages/photos-memories-manage";
import GuestUpload from "@/pages/guest-upload";
import SuperAdmin from "@/pages/super-admin";
import ViewerSettings from "@/pages/viewer-settings";
import SchoolSettings from "@/pages/school-settings";
import NotFound from "@/pages/not-found";
import VerifyEmail from "@/pages/verify-email";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/verify-email/:token" component={VerifyEmail} />
      <Route path="/signup" component={Signup} />
      <Route path="/school-signup" component={SchoolSignup} />
      <Route path="/viewer-signup" component={ViewerSignup} />
      <Route path="/viewer-dashboard" component={ViewerDashboard} />
      <Route path="/waibuk/:year" component={DynamicYearbookViewer} />
      <Route path="/preview/:year" component={YearbookPreview} />
      <Route path="/yearbook-finder" component={YearbookFinder} />
      <Route path="/cart" component={Cart} />
      <Route path="/school-dashboard" component={SchoolDashboard} />
      <Route path="/request-alumni-status" component={RequestAlumniStatus} />
      <Route path="/yearbook-viewer/:year" component={YearbookViewer} />
      <Route path="/yearbook-manage/:year" component={YearbookManage} />
      <Route path="/photos-memories-manage" component={PhotosMemoriesManage} />
      <Route path="/upload/:code" component={GuestUpload} />
      <Route path="/memory-upload" component={GuestUpload} />
      <Route path="/super-admin" component={SuperAdmin} />
      <Route path="/viewer-settings" component={ViewerSettings} />
      <Route path="/school-settings" component={SchoolSettings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <TooltipProvider>
          <div className="min-h-screen">
            <Router />
            <Toaster />
          </div>
        </TooltipProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;