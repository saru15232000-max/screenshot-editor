import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={EditorPage} />
      {/* Core editorial pages — hand-crafted deep content */}
      <Route path="/free-screenshot-editor-online" component={FreeScreenshotEditor} />
      <Route path="/annotate-screenshot-online" component={AnnotateScreenshot} />
      <Route path="/blur-screenshot-online" component={BlurScreenshot} />
      <Route path="/screenshot-editor-no-signup" component={NoSignupEditor} />
      <Route path="/ai-screenshot-editor" component={AiScreenshotEditor} />
      <Route path="/add-text-to-screenshot-online" component={AddTextToScreenshot} />
      {/* Comparison pages — dedicated with full comparison tables */}
      <Route path="/snagit-alternative" component={SnagitAlternative} />
      <Route path="/lightshot-alternative" component={LightshotAlternative} />
      <Route path="/greenshot-alternative" component={GreenshotAlternative} />
      <Route path="/markup-hero-alternative" component={MarkupHeroAlternative} />
      <Route path="/cleanshot-alternative" component={CleanshotAlternative} />
      {/* Dynamic catch-all for all remaining SEO pages */}
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
