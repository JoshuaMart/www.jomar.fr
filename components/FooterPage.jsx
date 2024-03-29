import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Link from "next/link";

//Contexto
import { SettingsContext } from "@/context/SettingsContext";

//Custom components
import SocialNetworkRowStack from "@/components/SocialNetworkRowStack";

//Ícones
import { KeyboardArrowUp } from "@styled-icons/material-outlined/KeyboardArrowUp";

const FooterContainer = styled.footer`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	margin-top: 60px;

	#grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 20px;
		grid-row-gap: 0px;
		transition: all 0.3s ease;
		width: 60%;
		text-align: center;

		@media (max-width: 1200px) {
			width: 80%;
		}

		@media (max-width: 1000px) {
			grid-template-columns: repeat(4, 1fr);
		}

		@media (max-width: 800px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (max-width: 601px) {
			width: 100%;
			grid-template-columns: repeat(1, 1fr);
		}
	}
`;

const TextBuildProject = styled.h4`
	font-weight: 800;
	color: ${(props) => props.theme.colors.branding};
	font-size: 14px;

	span {
		font-weight: 400;
	}
`;

const ContainerBuildCopyright = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;
	transition: all 0.3s ease;
	width: 60%;
	margin-top: 20px;
	margin-bottom: 20px;

	.build-and-button-top {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 1200px) {
		width: 80%;
	}

	@media (max-width: 601px) {
		flex-direction: column;
		margin-bottom: 110px;
	}

	@media (max-width: 425px) {
		width: 100%;
	}
`;

const ButtonUpToTop = styled.div`
	/* position: fixed; */
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	width: 32px;
	height: 32px;
	bottom: 20px;
	right: 20px;
	z-index: 1;
	background-color: ${(props) => props.theme.colors.backgroundSecondary};
	transition: all 0.3s ease;
	margin-left: 15px;

	&:hover {
		cursor: pointer;
		//transform: translateY(-7px);
	}

	svg {
		color: ${(props) => props.theme.colors.branding};
		width: 24px;
		height: 24px;
	}
`;

const FooterText = styled.span`
	position: relative;
	font-weight: 400;
	font-size: 14px;
	color: ${(props) => props.theme.colors.subtitle};
	transition: all 0.3s ease;
	margin-top: 3px;
	margin-bottom: 3px;
	text-transform: capitalize;

	&:hover {
		cursor: pointer;
	}

	&::before,
	&::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		height: 2px;
		background-color: ${(props) => props.theme.colors.branding};
		transform: scaleX(0);
		transition: transform 0.5s ease;
	}

	&::before {
		top: 0;
		transform-origin: center right;
	}

	&:hover::before {
		transform-origin: center left;
		transform: scaleX(1);
	}

	&::after {
		bottom: 0;
		transform-origin: center left;
	}

	&:hover::after {
		transform-origin: center right;
		transform: scaleX(1);
	}
`;

export default function FooterPage(props) {
	const { language } = useContext(SettingsContext);
	const [commit, setCommit] = useState("");

	useEffect(() => {
		getLastCommit();
	}, []);

	async function getLastCommit() {
		const response = await fetch("https://api.github.com/repos/JoshuaMart/www.jomar.fr/commits");
		const json = await response.json();

		setCommit(json[0].sha.slice(0, 6));
	}

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<FooterContainer>
			<ContainerBuildCopyright>
				<SocialNetworkRowStack /><Link href="#" passHref><FooterText>{language.navbarMenu.labelBlog}</FooterText></Link>
				<div className="build-and-button-top">
					<TextBuildProject>
						{language.footer.labelBuildVersion}: {commit || ""}
					</TextBuildProject>
					<ButtonUpToTop onClick={goToTop}>
						<KeyboardArrowUp />
					</ButtonUpToTop>
				</div>
			</ContainerBuildCopyright>
		</FooterContainer>
	);
}
