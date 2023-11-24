import React, { useContext } from "react";

//Third's librarys
import styled from "styled-components";
import { useTheme } from "styled-components";

//Custom components
import Head from "@/components/Head";

//Contexto
import { SettingsContext } from "@/context/SettingsContext";

export default function HomePage() {
	const theme = useTheme();
	const { language } = useContext(SettingsContext);

	return (
		<Head
			title="Portfolio de Joshua MARTINELLE"
			metaDescription="Portfolio de Joshua MARTINELLE - Jomar"
			keywords="Joshua MARTINELLE, Jomar"
		/>
	);
}