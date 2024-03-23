import { render } from "@testing-library/react";
import AboutMe from "./AboutMe";

describe('AboutMe Tests', () => {

    test('Renders aboutMe text', () => {
        const aboutMe = 'About me...';
        const { getByText } = render(<AboutMe aboutMe={aboutMe}/>);

        const aboutMeText = getByText(aboutMe);

        expect(aboutMeText).toBeInTheDocument();
    })
})
