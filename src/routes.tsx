import { createBrowserRouter } from "react-router"
import CompanyWebsite from "@/pages/CompanyWebsite"
import NotFoundPage from "@/pages/NotFoundPage"
import ProductLayout from "@/product/ProductLayout"
import ProductHome from "@/product/pages/ProductHome"
import TeamPage from "@/product/pages/TeamPage"
import PlaybookPage from "@/product/pages/PlaybookPage"
import ProjectsPage from "@/product/pages/ProjectsPage"
import ProjectWorkspacePage from "@/product/pages/ProjectWorkspacePage"
import SettingsPage from "@/product/pages/SettingsPage"
import { ProductProvider } from "@/product/state/ProductState"

function ProductRoot() {
  return (
    <ProductProvider>
      <ProductLayout />
    </ProductProvider>
  )
}

export const router = createBrowserRouter(
  [
    { path: "/", Component: CompanyWebsite },
    {
      path: "/app",
      Component: ProductRoot,
      children: [
        { index: true, Component: ProductHome },
        { path: "team", Component: TeamPage },
        { path: "playbook", Component: PlaybookPage },
        { path: "projects", Component: ProjectsPage },
        { path: "projects/:projectId", Component: ProjectWorkspacePage },
        { path: "settings", Component: SettingsPage },
      ],
    },
    { path: "*", Component: NotFoundPage },
  ],
  { basename: import.meta.env.BASE_URL },
)
