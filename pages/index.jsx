import React, { useState } from "react";

//Pages
import SobreMimPage from "../pages/sobre-mim";
import HomePage from "../pages/homepage";

//Components
import ServicesOffer from "@/components/ServicesOffer";
import FooterPage from "@/components/FooterPage";
import FloatNavigationBar from "@/components/FloatNavigationBar";

export default function Index() {
	return (
		<>
			<HomePage />
			<FloatNavigationBar />
			<ServicesOffer />
			<SobreMimPage />
			<FooterPage />
		</>
	);
}
