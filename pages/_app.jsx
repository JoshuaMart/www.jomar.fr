import "../styles/font.css";
import Script from "next/script";
import GlobalStyle from "../styles/globalStyle";
import LayoutTemplate from "../components/LayoutTemplate";

import SettingsContext from "@/context/SettingsContext";

function MyApp({ Component, pageProps }) {
	return (
		<SettingsContext>
			<Script src="https://cdn.splitbee.io/sb.js" />
			<Script async defer src="https://analytics.umami.is/script.js" data-website-id="c635c708-e7d2-448f-933b-542975775c68" />
			<GlobalStyle />
			<LayoutTemplate>
				<Component {...pageProps} />
			</LayoutTemplate>
		</SettingsContext>
	);
}

export default MyApp;
