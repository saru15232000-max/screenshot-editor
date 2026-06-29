import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import EditorPage from "@/pages/editor-page";
import FreeScreenshotEditor from "@/pages/seo/FreeScreenshotEditor";
import AnnotateScreenshot from "@/pages/seo/AnnotateScreenshot";
import BlurScreenshot from "@/pages/seo/BlurScreenshot";
import NoSignupEditor from "@/pages/seo/NoSignupEditor";
import AiScreenshotEditor from "@/pages/seo/AiScreenshotEditor";
import AddTextToScreenshot from "@/pages/seo/AddTextToScreenshot";
import SnagitAlternative from "@/pages/seo/SnagitAlternative";
import LightshotAlternative from "@/pages/seo/LightshotAlternative";
import GreenshotAlternative from "@/pages/seo/GreenshotAlternative";
import MarkupHeroAlternative from "@/pages/seo/MarkupHeroAlternative";
import CleanshotAlternative from "@/pages/seo/CleanshotAlternative";
import DynamicSEOPage from "@/pages/seo/DynamicSEOPage";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import TermsOfService from "@/pages/legal/TermsOfService";
import Disclaimer from "@/pages/legal/Disclaimer";
import CookiePolicy from "@/pages/legal/CookiePolicy";
import ContactPage from "@/pages/legal/ContactPage";
import AboutPage from "@/pages/legal/AboutPage";
import FaqPage from "@/pages/FaqPage";
import FeaturesPage from "@/pages/FeaturesPage";
import GuidesIndex from "@/pages/guides/GuidesIndex";
import HowToEditScreenshots from "@/pages/guides/HowToEditScreenshots";
import HowToAnnotateScreenshots from "@/pages/guides/HowToAnnotateScreenshots";
import HowToBlurSensitiveInfo from "@/pages/guides/HowToBlurSensitiveInfo";
import HowToRedactPersonalData from "@/pages/guides/HowToRedactPersonalData";
import HowToCreateBugReports from "@/pages/guides/HowToCreateBugReports";
import HowToTakeProfessionalScreenshots from "@/pages/guides/HowToTakeProfessionalScreenshots";
import HowToShareScreenshotsSafely from "@/pages/guides/HowToShareScreenshotsSafely";
import BestScreenshotTools from "@/pages/guides/BestScreenshotTools";
import ScreenshotDocumentationGuide from "@/pages/guides/ScreenshotDocumentationGuide";
import SocialMediaScreenshotGuide from "@/pages/guides/SocialMediaScreenshotGuide";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={EditorPage} />
      {/* ── Standalone pages ── */}
      <Route path="/faq" component={FaqPage} />
      <Route path="/features" component={FeaturesPage} />
      {/* ── Legal & informational pages ── */}
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/terms-and-conditions" component={TermsOfService} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/disclaimer" component={Disclaimer} />
      {/* ── Learning Center — guide articles ── */}
      <Route path="/guides" component={GuidesIndex} />
      <Route path="/guides/how-to-edit-screenshots" component={HowToEditScreenshots} />
      <Route path="/guides/how-to-annotate-screenshots" component={HowToAnnotateScreenshots} />
      <Route path="/guides/how-to-blur-sensitive-information" component={HowToBlurSensitiveInfo} />
      <Route path="/guides/how-to-redact-personal-data" component={HowToRedactPersonalData} />
      <Route path="/guides/how-to-create-bug-report-screenshots" component={HowToCreateBugReports} />
      <Route path="/guides/how-to-take-professional-screenshots" component={HowToTakeProfessionalScreenshots} />
      <Route path="/guides/how-to-share-screenshots-safely" component={HowToShareScreenshotsSafely} />
      <Route path="/guides/best-screenshot-tools" component={BestScreenshotTools} />
      <Route path="/guides/screenshot-documentation-guide" component={ScreenshotDocumentationGuide} />
      <Route path="/guides/social-media-screenshot-guide" component={SocialMediaScreenshotGuide} />
      {/* ── Core editorial pages — hand-crafted deep content ── */}
      <Route path="/free-screenshot-editor-online" component={FreeScreenshotEditor} />
      <Route path="/annotate-screenshot-online" component={AnnotateScreenshot} />
      <Route path="/blur-screenshot-online" component={BlurScreenshot} />
      <Route path="/screenshot-editor-no-signup" component={NoSignupEditor} />
      <Route path="/ai-screenshot-editor" component={AiScreenshotEditor} />
      <Route path="/add-text-to-screenshot-online" component={AddTextToScreenshot} />
      {/* ── Comparison pages — dedicated with full comparison tables ── */}
      <Route path="/snagit-alternative" component={SnagitAlternative} />
      <Route path="/lightshot-alternative" component={LightshotAlternative} />
      <Route path="/greenshot-alternative" component={GreenshotAlternative} />
      <Route path="/markup-hero-alternative" component={MarkupHeroAlternative} />
      <Route path="/cleanshot-alternative" component={CleanshotAlternative} />
      {/* ── Dynamic catch-all for all remaining SEO pages ── */}
      <Route path="/:slug" component={DynamicSEOPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
