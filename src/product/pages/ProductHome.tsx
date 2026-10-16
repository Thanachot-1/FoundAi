import OnboardingPage from "@/product/pages/OnboardingPage"
import OverviewPage from "@/product/pages/OverviewPage"
import { useProduct } from "@/product/state/ProductState"

export default function ProductHome() {
  const { store } = useProduct()
  return store.company ? <OverviewPage /> : <OnboardingPage />
}
