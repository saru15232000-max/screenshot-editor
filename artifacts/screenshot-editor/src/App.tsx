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
import DynamicSEOPage from "@/pages/seo/DynamicSEOPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={EditorPage} />
      {/* Hand-crafted priority pages */}
      <Route path="/free-screenshot-editor-online" component={FreeScreenshotEditor} />
      <Route path="/annotate-screenshot-online" component={AnnotateScreenshot} />
      <Route path="/blur-screenshot-online" component={BlurScreenshot} />
      <Route path="/screenshot-editor-no-signup" component={NoSignupEditor} />
      <Route path="/ai-screenshot-editor" component={AiScreenshotEditor} />
      <Route path="/add-text-to-screenshot-online" component={AddTextToScreenshot} />
      {/* Dynamic catch-all for all other SEO pages */}
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
