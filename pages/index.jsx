import React, { useState } from "react";

//Pages
import SobreMimPage from "../pages/sobre-mim";
//Components
import ServicesOffer from "@/components/ServicesOffer";
import FooterPage from "@/components/FooterPage";
import FloatNavigationBar from "@/components/FloatNavigationBar";

export default function Index() {
	return (
		<>
			<FloatNavigationBar />
			<ServicesOffer />
			<SobreMimPage />
			<FooterPage />
		</>
	);
}
