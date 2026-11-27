import { renderRasterizationPage } from "./pages/rasterization.js";
import { renderRaytracingPage } from "./pages/raytracing.js";
import { createTabs } from "./ui/tabs.js";

createTabs(document.querySelector(".tabs"), {
    raytracing: renderRaytracingPage,
    rasterization: renderRasterizationPage
});
