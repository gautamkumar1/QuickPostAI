import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LazyLoad from "react-lazyload";
import LandingPage from "./mainComponents/landing-page/LandingPage";
import useAuthStore from "./zustand/authStore";
import { UserDashboard } from "./pages/user-dashboard/UserDashboard";
import ConvertBlogSkeleton from "./skeletons/ConvertBlogSkeleton";
import TestPage from "./pages/test-page/TestPage";
import ScheduledTweetsSkeleton from "./skeletons/ScheduledTweetsSkeleton";
// Lazy load components
const ConvertBlog = lazy(() => import("./pages/convert-blog/ConvertBlog"));
const AutoSchedule = lazy(() => import("./pages/auto-schedule/AutoSchedule"));
const CreatePost = lazy(() => import("./pages/create-post/CreatePost"));
const TweetReplyGenerator = lazy(() => import("./pages/reply-tweet/reply-tweet"));
const UnauthorizedPage = lazy(() => import("./pages/unauthorized/Unauthorized"));
const ScheduledTweetsPage = lazy(() => import("./pages/scheduled-tweets/ScheduledTweets"));


function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={isAuthenticated ? <TestPage /> : <UnauthorizedPage />} />
        {/* --> Dashboard Routes --> */}
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <UserDashboard /> : <UnauthorizedPage />}
        >
          <Route
            index
            element={
              <LazyLoad height={200} offset={100} once>
                <Suspense fallback={<ConvertBlogSkeleton />}>
                  <ConvertBlog />
                </Suspense>
              </LazyLoad>
            }
          />
          <Route
            path="convert-blog"
            element={
              <LazyLoad height={200} offset={100} once>
                <Suspense fallback={<ConvertBlogSkeleton />}>
                  <ConvertBlog />
                </Suspense>
              </LazyLoad>
            }
          />
          <Route
            path="auto-schedule"
            element={
              <LazyLoad height={200} offset={100} once>
                <Suspense fallback={null}>
                  <AutoSchedule />
                </Suspense>
              </LazyLoad>
            }
          />
          <Route
            path="view-scheduled-tweets"
            element={
              <LazyLoad height={200} offset={100} once>
                <Suspense fallback={<ScheduledTweetsSkeleton />}>
                  <ScheduledTweetsPage />
                </Suspense>
              </LazyLoad>
            }
          />
          <Route
            path="create-post"
            element={
              <LazyLoad height={200} offset={100} once>
                <Suspense fallback={null}>
                  <CreatePost />
                </Suspense>
              </LazyLoad>
            }
          />
          <Route
            path="reply-tweet"
            element={
              <LazyLoad height={200} offset={100} once>
                <Suspense fallback={null}>
                  <TweetReplyGenerator />
                </Suspense>
              </LazyLoad>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
