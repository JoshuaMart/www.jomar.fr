import styled from "styled-components";

import { Substack } from "@styled-icons/simple-icons/Substack";
import { Twitter } from "@styled-icons/entypo-social/Twitter";
import { MailSend } from "@styled-icons/boxicons-regular/MailSend";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";
import { Github } from "@styled-icons/bootstrap/Github";

const SocialMediaContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;

	@media (max-width: 600px) {
		width: 100%;
		//justify-content: space-between;
		margin-bottom: 20px;
	}
`;

const ButtonSocialMediaIcon = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 5px;
	width: 32px;
	height: 32px;
	transition: all 0.3s ease;
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.backgroundSecondary};

	&:hover {
		cursor: pointer;
	}

	&:active {
		opacity: 0.5;
	}

	svg {
		color: ${(props) => props.theme.colors.branding};
		width: 24px;
		height: 24px;
		transition: all 0.3s ease;

		&:hover {
			color: ${(props) => props.theme.colors.branding};
		}
	}

	@media (max-width: 600px) {
		margin-left: 3px;
		margin-right: 3px;
	}

	:hover {
		transform: scale(1.1);
	}
`;

export default function SocialNetworkRowStack() {
	return (
		<SocialMediaContainer>
			<ButtonSocialMediaIcon href="https://j0mar.substack.com/" target="_blank">
				<Substack />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon href="https://x.com/J0_mart/" target="_blank">
				<Twitter />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon href="https://github.com/JoshuaMart" target="_blank">
				<Github />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon href="mailto:contact@jomar.fr" target="_blank">
				<MailSend />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon href="https://www.linkedin.com/in/joshua-martinelle-a34911133" target="_blank" data-splitbee-event="linkedin-access">
				<LinkedinSquare />
			</ButtonSocialMediaIcon>
		</SocialMediaContainer>
	);
}
