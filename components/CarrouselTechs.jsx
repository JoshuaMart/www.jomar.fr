import React from "react";
import Marquee from "react-fast-marquee";
import styled from "styled-components";
import { useTheme } from "styled-components";

import { Kalilinux } from "@styled-icons/simple-icons/Kalilinux";
import { Docker } from "@styled-icons/boxicons-logos/Docker";
import { Firebase } from "@styled-icons/boxicons-logos/Firebase";
import { Mongodb } from "@styled-icons/simple-icons/Mongodb";
import { Postgresql } from "@styled-icons/simple-icons/Postgresql";
import { Sqlite } from "@styled-icons/simple-icons/Sqlite";
import { Javascript } from "@styled-icons/boxicons-logos/Javascript";
import { Python } from "@styled-icons/boxicons-logos/Python";
import { Html5 } from "@styled-icons/boxicons-logos/Html5";
import { Git } from "@styled-icons/boxicons-logos/Git";
import { GithubOutline } from "@styled-icons/evaicons-outline/GithubOutline";
import { Api } from "@styled-icons/material-rounded/Api";
import { Bootstrap } from "@styled-icons/boxicons-logos/Bootstrap";
import { TailwindCss } from "@styled-icons/boxicons-logos/TailwindCss";
import { Mysql } from "@styled-icons/simple-icons/Mysql";
import { Linux } from "@styled-icons/fa-brands/Linux";
import { Windows } from "@styled-icons/boxicons-logos/Windows";
import { Ruby } from "@styled-icons/simple-icons/Ruby";

const Carrousel = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	width: 100%;
	margin-top: 5px;
	margin-bottom: 5px;

	.slide {
		margin: 10px;
	}

	.slide svg {
		width: 78px;
		height: 78px;
		color: ${(props) => (props.colorIcon == "brand" ? props.theme.colors.branding : props.theme.colors.backgroundSecondary)};
		transition: all 0.3s ease;
	}

	.slide svg:hover {
		color: ${(props) => props.theme.colors.branding};
	}

	@media (max-width: 1200px) {
		.slide svg {
			width: 58px;
			height: 58px;
		}
	}

	@media (max-width: 600px) {
		.slide svg {
			width: 38px;
			height: 38px;
		}
	}
`;

export default function CarrouselTechs(props) {
	const theme = useTheme();

	const { direction, colorIcon } = props;

	return (
		<Marquee autoFill gradient loop={0} gradientColor={theme.colors.backgroundPageRgb} direction={direction}>
			<Carrousel colorIcon={colorIcon}>
				<div className="slide">
					<Kalilinux />
				</div>
				<div className="slide">
					<Docker />
				</div>
				<div className="slide">
					<Postgresql />
				</div>
				<div className="slide">
					<Sqlite />
				</div>
				<div className="slide">
					<Javascript />
				</div>
				<div className="slide">
					<Python />
				</div>
				<div className="slide">
					<Html5 />
				</div>
				<div className="slide">
					<Git />
				</div>
				<div className="slide">
					<GithubOutline />
				</div>
				<div className="slide">
					<Api />
				</div>
				<div className="slide">
					<Bootstrap />
				</div>
				<div className="slide">
					<TailwindCss />
				</div>
				<div className="slide">
					<Mysql />
				</div>
				<div className="slide">
					<Linux />
				</div>
				<div className="slide">
					<Windows />
				</div>
				<div className="slide">
					<Ruby />
				</div>
			</Carrousel>
		</Marquee>
	);
}
