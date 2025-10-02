import BannerDiscount from "@/components/banner-discount";
import BannerProduct from "@/components/banner-product";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeatureProducts from "@/components/feature-products";

export default function Home() {
  return (
    <main >
      <CarouselTextBanner />
      <FeatureProducts />
      <BannerDiscount />
      <ChooseCategory />
      <BannerProduct />
    </main>
  );
}
