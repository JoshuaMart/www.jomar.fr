import React, { useState } from "react";

//Pages
import SobreMimPage from "../pages/sobre-mim";
//Components
import ServicesOffer from "@/components/ServicesOffer";
import FooterPage from "@/components/FooterPage";

export default function Index() {
	return (
		<>
			<ServicesOffer />
			<SobreMimPage />
			<FooterPage />
		</>
	);
}
